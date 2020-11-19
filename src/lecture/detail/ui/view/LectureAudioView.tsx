import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  getLectureMedia,
  onLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import WatchLog from 'lecture/detail/model/Watchlog';
import { patronInfo } from '@nara.platform/dock';
import { useLectureState } from 'lecture/detail/service/useLectureState/useLectureState';
import ClassroomModalView from 'lecture/category/ui/view/ClassroomModalView';
import { useLectureClassroom } from 'lecture/detail/service/useLectureClassroom/useLectureClassroom';
import { requestLectureStructure } from '../logic/LectureStructureContainer';
import LectureParams from '../../viewModel/LectureParams';
import { useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import {
  getLectureConfirmProgress,
  setLectureConfirmProgress,
} from 'lecture/detail/store/LectureConfirmProgressStore';
import { useHistory } from 'react-router-dom';
import { LectureStructureCourseItem } from 'lecture/detail/viewModel/LectureStructure';

interface LectureAudioViewProps {
  params: LectureRouterParams | undefined;
  checkStudent: (params: LectureRouterParams) => void;
}

// http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001v/cube/CUBE-2ld/lecture-card/LECTURE-CARD-28y
const LectureAudioView: React.FC<LectureAudioViewProps> = function LectureAudioView({
  params,
  checkStudent,
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
  const [nextContentsName, setNextContentsName] = useState<string>();
  const [nextContentsPath, setNextContentsPath] = useState<string>();
  const [panoptoState, setPanoptoState] = useState<number>();
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);
  const [progressInterval, setProgressInterval] = useState<any>();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;
  const myInput: any = useRef();
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  const updateDimesions = () => {
    if(document.getElementsByTagName('iframe')[0] === undefined) {
      return
    }
    document.getElementsByTagName('iframe')[0].width = myInput.current.clientWidth+'px'
  };

  useEffect(() => {
    updateDimesions();
    window.addEventListener("resize", updateDimesions);
  }, []);

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
    currentPosition: () => {},
    getPlaybackRate: () => {},
  });

  const history = useHistory();

  const nextContents = useCallback((path: string) => {
    setLectureConfirmProgress();
    setPanoptoState(10);
    history.push(path);
  }, []);

  const onPanoptoStateUpdate = useCallback(
    async (state: number) => {
      console.log('PanoptoState : ', state);
      setPanoptoState(state);
      setIsActive(false);
      if (state == 2) {
        setNextContentsView(false);
      } else if (state == 1) {
        setIsActive(true);
        setNextContentsView(false);
      } else if (state == 0) {
        setNextContentsView(true);
      }
    },
    [params]
  );

  const registCheckStudent = useCallback(
    async (params: LectureRouterParams | undefined) => {
      if (params) {
        await checkStudent(params);
        // useLectureState();
      }
    },
    [params]
  );

  const mediaCheckEvent = useCallback(
    async (params: LectureRouterParams | undefined) => {
      if (params) {
        await confirmProgress(params);
        requestLectureStructure(lectureParams, pathname);
      }
    },
    [params]
  );

  useEffect(() => {
    if(params){
      setNextContentsView(false);
    }
  }, [params]);

  const lectureParams = useParams<LectureParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    setNextContentsView(false);
    //동영상 종료
    if(panoptoState == 0 || panoptoState == 2){
      mediaCheckEvent(params);
      if(Math.floor((embedApi.getCurrentTime() as unknown) as number) == Math.floor((embedApi.getDuration() as unknown) as number)){
        setNextContentsView(true);
      }
    }
    //동영상 시작시 student 정보 확인 및 등록
    if(panoptoState == 1){
      registCheckStudent(params);
      mediaCheckEvent(params);
    }

  }, [panoptoState]);

  useEffect(() => {
    setCurrentTime((embedApi.getCurrentTime() as unknown) as number);
    setDuration((embedApi.getDuration() as unknown) as number);
  }, [isActive, seconds, lectureParams, pathname, params]);

  useEffect(() => {
    let interval: any = null;
    const currentTime = (embedApi.getCurrentTime() as unknown) as number;
    const duration = (embedApi.getDuration() as unknown) as number;

    if(!startTime){
      setStartTime(currentTime);
    }
    if (isActive && params && watchlogState) {
      // clearInterval(interval);
      interval = setInterval(() => {
      // setWatchInterval(setInterval(() => {        
        //const currentTime = embedApi.getCurrentTime() as unknown as number;
        const playbackRate = (embedApi.getPlaybackRate() as unknown) as number;

        // end 가 start보다 작은 경우 or start 보다 end가 20 이상 큰 경우(2배속 10초의 경우 20 이라 21 기준으로 변경함)
        const end = (embedApi.getCurrentTime() as unknown) as number;
        const start = startTime > end || (end - startTime) > 21? end - (10 * playbackRate) : startTime;
        /* eslint-disable */
        setWatchlogState({
          ...watchlogState,
          start: start < 0? 0 : start,
          end: end,
        });
        /* eslint-enable */

        //TODO : WatchLog 호출시 불필요한 Cube 호출 제거 예정
        setWatchLog(params, watchlogState);
        setStartTime((embedApi.getCurrentTime() as unknown) as number);
      // }, 10000));
      if((duration - ((embedApi.getCurrentTime() as unknown) as number)) < 20){
        setNextContentsView(true);
      }      
    }, 10000);
    } else if (!isActive) {
      // sendWatchLog();
      clearInterval(interval);
    }
    return () => {
      console.log('clearInterval return run');
      clearInterval(interval);
    };
  }, [isActive, lectureParams, pathname, params, embedApi, startTime, watchlogState]);


  useEffect(() => {
    let checkInterval: any = null;
    const duration = (embedApi.getDuration() as unknown) as number;
    let confirmProgressTime = (duration / 10) * 1000;
    
    if (!confirmProgressTime || confirmProgressTime > 60000) {
      confirmProgressTime = 60000;
    }

    if (isActive && params) {
      // setCheckInterval(setInterval(() => {
        checkInterval = setInterval(() => {
          mediaCheckEvent(params);
          // }, 20000));
        }, 20000);

    } else if (!isActive) {
      clearInterval(checkInterval);
    }
    return () => {
      console.log('clearCheckInterval return run');
      clearInterval(checkInterval);
      
    };
  }, [isActive]);


  // useEffect(() => {
  //   return () => {
  //     console.log('page out clear Interval ');
  //     clearInterval(watchInterval);
  //     clearInterval(checkInterval);
  //   };
  // }, [checkInterval, watchInterval]);

  useEffect(() => {
    setNextContentsView(false);
    return () => {
      mediaCheckEvent(params);
      setPanoptoState(10);
      setNextContentsPath('');
      setNextContentsName('');
      setIsActive(false);
      setNextContentsView(false);
      setProgressInterval('');
      setLectureConfirmProgress();
    };
  }, []);

  useEffect(() => {
    // TODO : getNextorderContent API 개발 후 다음 컨텐츠만 조회 해오도록 변경 필요함
    const lectureStructure =  getLectureStructure();
    setNextContentsPath('');
    if(lectureStructure){
      if(lectureStructure.course?.type=="COURSE") {
        //일반 코스 로직
    
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
               
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
              
                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          return null;
        })
      }
      else if (lectureStructure.course?.type=="PROGRAM") {
 

        lectureStructure.items.map(item => {
          if (item.type === 'COURSE') {
            const course = item as LectureStructureCourseItem;
            if (course.cubes) {
              const currentCube =
                course.cubes.find(
                  cube => cube.cubeId == params?.contentId
                );

              if(currentCube){
                const nextCubeOrder = currentCube.order +1; 
                
                const nextCube = course.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = course.discussions?.find(
                  discussion => discussion.order == nextCubeOrder
                );
 
                if (nextDiscussion) {
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
               
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          return null;
        })
        
      }
    }
  }, [getLectureStructure(), getLectureConfirmProgress(), params]);

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
    const playerEl = document.getElementById('panopto-embed-audio-player'); //audio player 라는 것이 따로 없습니다.
    if (playerEl) {
      console.log(
        (playerEl.getElementsByTagName('iframe')[0].height = '100px')
      );
    }
  };

  const onPanoptoLoginShown = () => {};

  useEffect(() => {
    onLectureMedia(lectureMedia => {
      cleanUpPanoptoIframe(); //기존에 어떤 상태이건 초기화
      if (typeof lectureMedia === 'undefined') {
        //do nothing!
      } else {
        const currentPaonoptoSessionId =
          lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '';
        const embedApi = new window.EmbedApi('panopto-embed-audio-player', {
          width: myInput.current.clientWidth,
          height: '100',
          //This is the URL of your Panopto site
          //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
          serverName: 'sku.ap.panopto.com',
          sessionId: currentPaonoptoSessionId,
          videoParams: {
            // Optional parameters
            //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
            interactivity: 'none',
            showtitle: 'false',
            showBrand: 'false',
            offerviewer: 'false',
          },
          events: {
            onIframeReady: onPanoptoIframeReady,
            onLoginShown: onPanoptoLoginShown,
            //"onReady": onPanoptoVideoReady,
            onStateChange: onPanoptoStateUpdate,
          },
        });
        setEmbedApi(embedApi);
      }
    }, 'LectureVideoView');

    return () => {
      cleanUpPanoptoIframe();
    };
  }, []);

  const cleanUpPanoptoIframe = () => {
    const playerEl = document.getElementById('panopto-embed-audio-player');
    if (playerEl) playerEl.innerHTML = '';
  };

  return (
    <div className="audio-container" ref={myInput}>
      {nextContentsView &&
        // !isActive &&
        nextContentsPath &&
        getLectureConfirmProgress()?.learningState == 'Passed' && (
          <div className="video-overlay">
            <div className="video-overlay-btn">
              <button onClick={() => nextContents(nextContentsPath)}>
                <img src={playerBtn} />
              </button>
            </div>
            <div className="video-overlay-text">
              <p>다음 학습 이어하기</p>
              <h3>{nextContentsName}</h3>
            </div>
          </div>
        )}
      <div id="panopto-embed-audio-player" className="l-audio" />
    </div>
  );
};

export default LectureAudioView;
