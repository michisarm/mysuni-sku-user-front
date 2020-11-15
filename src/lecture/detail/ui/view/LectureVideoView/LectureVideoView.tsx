/*eslint-disable*/

import React, { useCallback, useEffect, useState } from 'react';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import {
  getLectureMedia,
  onLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import { patronInfo } from '@nara.platform/dock';
import { TIMEOUT } from 'dns';
import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import WatchLog from 'lecture/detail/model/Watchlog';
import { getLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import { getLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';
import {
  setLectureConfirmProgress,
  getLectureConfirmProgress,
} from 'lecture/detail/store/LectureConfirmProgressStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import moment from 'moment';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import LectureParams from '../../../viewModel/LectureParams';
import { requestLectureStructure } from '../../logic/LectureStructureContainer';
import { setLectureState, getLectureState } from 'lecture/detail/store/LectureStateStore';
import { LectureStructureCourseItem, LectureStructureCubeItem, LectureStructureDiscussionItem } from 'lecture/detail/viewModel/LectureStructure';



const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

//샘플 페이지 : http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2jy/lecture-card/LECTURE-CARD-274
//             http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2ka/lecture-card/LECTURE-CARD-27z
//             http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2kh/lecture-card/LECTURE-CARD-283
// http://ma.mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00001/course-plan/COURSE-PLAN-f6/Course/C-LECTURE-8j/cube/CUBE-2ni/LECTURE-CARD-9zu
interface LectureVideoViewProps {
  params: LectureRouterParams | undefined;
  checkStudent:(params: LectureRouterParams) => void;
}

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({
  params,
  checkStudent
}) {
  const [
    watchLogValue,
    getCubeWatchLogItem,
    setWatchLog,
    getWatchLogSumViewCount,
    confirmProgress,
  ] = useLectureWatchLog();

  // const params = useLectureRouterParams();

  // const [params, setParams] = useState<LectureRouterParams | undefined>(useLectureRouterParams());
  const [watchlogState, setWatchlogState] = useState<WatchLog>();
  const [nextContentsPath, setNextContentsPath] = useState<string>();
  const [nextContentsName, setNextContentsName] = useState<string>();
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);
  const [panoptoState, setPanoptoState] = useState<number>();

  useEffect(() => {
    const watchlog: WatchLog = {
      patronKeyString: patronInfo.getDenizenId() || '',
      start: 0,
      end: 0,
      lectureUsid: params?.lectureId || '',
    };
    setWatchlogState(watchlog);
  }, [params]);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [embedApi, setEmbedApi] = useState({
    pauseVideo: () => {},
    seekTo: (index: number) => {},
    getCurrentTime: () => {},
    getDuration: () => {},
  });

  const toHHMM = useCallback((idx: number) => {
    const time = idx;
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time - hours * 60);

    let sHours = '';
    let sMinutes = '';
    sHours = String(hours.toString()).padStart(2, '0');
    sMinutes = String(minutes.toString()).padStart(2, '0');

    return sHours + ':' + sMinutes;
  }, []);

  const [displayTranscript, setDisplayTranscript] = useState<boolean>(true);

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    console.log('panopto iframe loaded...');
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
  };

  const onPanoptoLoginShown = () => {
    console.log('------로그인이 안 되어 있어요....!!!!!!!!!');
    //로그인 페이지가 안 떠 있는 경우 바로 Clear 시켜서 반복 호출을 막아야 합니다.
    // cleanUpPanoptoIframe();
  };

  const history = useHistory();

  const nextContents = useCallback((path: string) => {
    setLectureConfirmProgress();
    setPanoptoState(10);
    history.push(path);
  }, []);

  const onPanoptoStateUpdate = useCallback(
    async (state: number) => {
      setPanoptoState(state);
      if (state == 2) {
        setIsActive(false);
        setNextContentsView(false);
      } else if (state == 1) {
        setIsActive(true);
        setNextContentsView(false);
      } else if (state == 0) {
        setIsActive(false);
        setNextContentsView(true);
      }
    },
    [isActive, params]
  );

  const registCheckStudent = useCallback(
    async (params : LectureRouterParams | undefined) => {
      if(params){
        await checkStudent(params);
        // useLectureState();
      }    
    },
    [params]
  );

  const mediaEndEvent = useCallback(
    async (params : LectureRouterParams | undefined) => {
      if(params){
        await confirmProgress(params);
        requestLectureStructure(lectureParams, pathname);
      }    
    },
    [params]
  );

  const lectureParams = useParams<LectureParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('isActive', isActive);
    console.log('params', params);
    console.log('watchlogState', watchlogState);
    console.log('panoptoState', panoptoState);

    //동영상 종료
    if(panoptoState == 0 || panoptoState == 2){
      mediaEndEvent(params);
    }
    //동영상 시작시 student 정보 확인 및 등록
    if(panoptoState == 1){
      registCheckStudent(params);
    }
    

    let interval: any = null;
    let progressInterval: any = null;

    const currentTime = (embedApi.getCurrentTime() as unknown) as number;
    const duration = (embedApi.getDuration() as unknown) as number;
    console.log('currentTime', currentTime);
    console.log('duration', duration);

    let confirmProgressTime = (duration / 10) * 1000;

    //confirmProgressTime
    if (!confirmProgressTime || confirmProgressTime > 60000) {
      confirmProgressTime = 60000;
    }

    if (isActive && params && watchlogState) {
      interval = setInterval(() => {
        //const currentTime = embedApi.getCurrentTime() as unknown as number;
        setWatchlogState({
          ...watchlogState,
          start: currentTime,
          end: currentTime + 10,
        });
        console.log('watchlogState', watchlogState);
        setSeconds(seconds => seconds + 10);
        setWatchLog(params, watchlogState);
        // confirmProgress(params);
      }, 10000);
      //TODO : total runtime / 10 or 1분간격으로 진행률 체크 하도록 변경 필요함 - 현재는 1분간격 적용
      progressInterval = setInterval(async () => {
        await confirmProgress(params);
        requestLectureStructure(lectureParams, pathname);
      }, confirmProgressTime);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      clearInterval(progressInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isActive, seconds, lectureParams, pathname]);

  useEffect(() => {
    if (params) {
      confirmProgress(params);
    }
  }, [params]);

  useEffect(() => {
    console.log('getLectureStructure()', getLectureStructure());
    console.log('getLectureStructure() 처리 ---- params' , params);
    // | 'PROGRAM'
    // | 'CUBE'
    // | 'COURSE'

    const lectureStructure =  getLectureStructure();
    if(lectureStructure){
      if(lectureStructure.course?.type=="COURSE") {
        //일반 코스 로직
        console.log('course start');
  
        lectureStructure.items.map(item => {
          if (item.type === 'CUBE') {
            if (lectureStructure.cubes) {
              const currentCube =
              lectureStructure.cubes.find(
                  cube => cube.cubeId == params?.contentId
                );

              if(currentCube){
                const nextCubeOrder = currentCube.order +1; 
                
                const nextCube = lectureStructure.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                console.log('nextCube.path', nextCube && nextCube.path);
                console.log('nextCube.name', nextCube && nextCube.name);
                if (getLectureConfirmProgress()?.learningState == 'Passed' && nextCube
                ) {
                  console.log('nextCube.path', nextCube.path);
                  console.log('nextCube.name', nextCube.name);
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
                console.log('nextCube.path', nextDiscussion && nextDiscussion.path);
                console.log('nextCube.name', nextDiscussion && nextDiscussion.name);
                if (getLectureConfirmProgress()?.learningState == 'Passed' && nextDiscussion
                ) {
                  
                  console.log('nextDiscussion.path', nextDiscussion.path);
                  console.log('nextDiscussion.name', nextDiscussion.name);
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
            console.log('cube -- ');
          }
          return null;
        })
        console.log('course end');
      }
      else if (lectureStructure.course?.type=="PROGRAM") {

        console.log('PROGRAM start');

        lectureStructure.items.map(item => {
          if (item.type === 'COURSE') {
            const course = item as LectureStructureCourseItem;
            console.log('course -- ' , course);
            if (course.cubes) {
              const currentCube =
                course.cubes.find(
                  cube => cube.cubeId == params?.contentId
                );

              if(currentCube){
                console.log('currentCube' ,currentCube);
                const nextCubeOrder = currentCube.order +1; 
                
                const nextCube = course.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                console.log('nextCube.path', nextCube && nextCube.path);
                console.log('nextCube.name', nextCube && nextCube.name);
                if (getLectureConfirmProgress()?.learningState == 'Passed' && nextCube
                ) {

                  console.log('nextCube.path', nextCube.path);
                  console.log('nextCube.name', nextCube.name);
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = course.discussions?.find(
                  discussion => discussion.order == nextCubeOrder
                );

                console.log('nextDiscussion.path', nextDiscussion && nextDiscussion.path);
                console.log('nextDiscussion.name', nextDiscussion && nextDiscussion.name);

                if (getLectureConfirmProgress()?.learningState == 'Passed' && nextDiscussion
                ) {
                  
                  console.log('nextDiscussion.path', nextDiscussion.path);
                  console.log('nextDiscussion.name', nextDiscussion.name);
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          if (item.type === 'CUBE') {
            if (lectureStructure.cubes) {
              const currentCube =
              lectureStructure.cubes.find(
                  cube => cube.cubeId == params?.contentId
                );

              if(currentCube){
                const nextCubeOrder = currentCube.order +1; 
                
                const nextCube = lectureStructure.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                console.log('nextCube.path', nextCube && nextCube.path);
                console.log('nextCube.name', nextCube && nextCube.name);
                if (getLectureConfirmProgress()?.learningState == 'Passed' && nextCube
                ) {

                  console.log('nextCube.path', nextCube.path);
                  console.log('nextCube.name', nextCube.name);
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
                console.log('nextDiscussion.path', nextDiscussion && nextDiscussion.path);
                console.log('nextDiscussion.name', nextDiscussion && nextDiscussion.name);
                if (getLectureConfirmProgress()?.learningState == 'Passed' && nextDiscussion
                ) {
                  
                  console.log('nextDiscussion.path', nextDiscussion.path);
                  console.log('nextDiscussion.name', nextDiscussion.name);
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
            console.log('cube -- ');
          }
          return null;
        })
        console.log('PROGRAM end');
      }
    }
  }, [getLectureStructure(), getLectureConfirmProgress()]);

  const cleanUpPanoptoIframe = () => {
    let playerEl = document.getElementById('panopto-embed-player');
    if (playerEl) playerEl.innerHTML = '';
  };

  const seekByIndex = (index: number) => {
    if (embedApi && index >= 0) {
      //TODO current state 를 찾아서 Play 이
      embedApi.seekTo(index);
    }
  };

  useEffect(() => {
    onLectureMedia(lectureMedia => {
      cleanUpPanoptoIframe(); //기존에 어떤 상태이건 초기화
      if (typeof lectureMedia === 'undefined') {
      } else {
        let currentPaonoptoSessionId =
          lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '';
        let embedApi = new window.EmbedApi('panopto-embed-player', {
          width: '100%',
          height: '700',
          //This is the URL of your Panopto site
          //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
          serverName: 'sku.ap.panopto.com',
          sessionId: currentPaonoptoSessionId,
          // sessionId : "6421c40f-46b6-498a-b715-ac28004cf29e",   //테스트 용 sessionId
          videoParams: {
            // Optional parameters
            //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
            // "interactivity": "Caption Language",
            interactivity: 'none',
            showtitle: 'false',
            showBrand: 'true',
            offerviewer: 'false',
          },
          events: {
            onIframeReady: onPanoptoIframeReady,
            onLoginShown: onPanoptoLoginShown,
            //"onReady": onPanoptoVideoReady,
            onStateChange: onPanoptoStateUpdate,
            // "onPlaybackRateChange" : console.log('onPlaybackRateChange')
          },
        });
        setEmbedApi(embedApi);
      }
    }, 'LectureVideoView');

    return () => {
      cleanUpPanoptoIframe();
    };
  }, []);

  return (
    <div className="course-video">
      <div className="video-container">
        <div id="panopto-embed-player"></div>
        {/* video-overlay 에 "none"클래스 추가 시 영역 안보이기 */}
        {panoptoState == 0 &&
          !isActive &&
          nextContentsPath &&
          getLectureConfirmProgress()?.learningState == 'Passed' && (
            <div className="video-overlay">
              <div className="video-overlay-btn">
                <button onClick={() => nextContents(nextContentsPath)}>
                  <img src={playerBtn} />
                </button>
              </div>
              {/* <Link to={nextContentsPath||''} onClick={() => clearState()}> */}
              {/* <Link to={nextContentsPath||''}> */}
              <div className="video-overlay-text">
                <p>다음 학습 이어하기</p>
                <h3>{nextContentsName}</h3>
              </div>
              {/* </Link> */}
            </div>
          )}
      </div>
      {getLectureTranscripts() &&
        getLectureMedia() &&
        (getLectureMedia()?.mediaType == 'InternalMedia' ||
          getLectureMedia()?.mediaType == 'InternalMediaUpload') &&
        (getLectureTranscripts()?.length || 0) > 0 &&
        displayTranscript && (
          <>
            <button
              className="ui icon button right btn-blue"
              onClick={() => setDisplayTranscript(false)}
            >
              Close Transcript
              <i aria-hidden="true" className="icon icon morelink" />
            </button>

            <div className="course-video-tanscript">
              <div className="course-video-scroll">
                {getLectureTranscripts()?.map(lectureTranscript => {
                  return (
                    <>
                      <strong
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          // seekByIndex(lectureTranscript.idx);
                          seekByIndex(parseInt(lectureTranscript.startTime.substr(0,2),10) * 60 * 60 + 
                          parseInt(lectureTranscript.startTime.substr(0,2),10) * 60 +
                          parseInt(lectureTranscript.startTime.substr(4,2),10));
                        }}
                      >
                        {lectureTranscript.startTime.substr(0,2).concat(":").
                        concat(lectureTranscript.startTime.substr(2,2)).concat(":").
                        concat(lectureTranscript.startTime.substr(4,2))}
                      </strong>
                      <p>{lectureTranscript.text}</p>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      {getLectureTranscripts() && !displayTranscript && (
        <button
          className="ui icon button right btn-blue"
          onClick={() => setDisplayTranscript(true)}
        >
          View Transcript
          <i aria-hidden="true" className="icon icon morelink" />
        </button>
      )}
    </div>
  );
};

export default LectureVideoView;
