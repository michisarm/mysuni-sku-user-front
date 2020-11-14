/*eslint-disable*/

import React, { useCallback, useEffect, useState } from 'react';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import {
  getLectureMedia,
  onLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import SkuVideoPlayer from 'lecture/detail/service/useLectureMedia/components/SkuPlayer/SkuVideoPlayer';
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

const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

//샘플 페이지 : http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2jy/lecture-card/LECTURE-CARD-274
//             http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2ka/lecture-card/LECTURE-CARD-27z
//             http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2kh/lecture-card/LECTURE-CARD-283

interface LectureVideoViewProps {
  params: LectureRouterParams | undefined;
  hookAction: () => void;
}

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({
  params,
  hookAction,
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
  const [currentParams, setCurrentParams] = useState<
    LectureRouterParams | undefined
  >(params);
  const [panoptoState, setPanoptoState] = useState<number>();

  // params, watchlog
  // hookAction
  useEffect(() => {
    console.log('useEffect - hookAction : ', hookAction);
    setAction(hookAction);
  }, [hookAction]);

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
  const [action, setAction] = useState<() => void | undefined>();

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
  const captionInfos = {
    infos: [
      { lang: 'ko', url: 'test.srt', isDefault: false },
      { lang: 'en', url: 'test_en.srt', isDefault: true },
    ],
  };

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
    (state: number) => {
      // console.log('getLectureConfirmProgress',getLectureConfirmProgress()?.learningState);
      console.log('state', state);
      setPanoptoState(state);
      console.log('params', params);
      console.log('currentParams', currentParams);

      if (state == 2) {
        setIsActive(false);
        setNextContentsView(false);
      } else if (state == 1) {
        // console.log(action && action());
        action && action();
        setIsActive(true);
        setNextContentsView(false);
      } else if (state == 0 && params) {
        console.log('state', state);
        confirmProgress(params);
        setIsActive(false);
        setNextContentsView(true);
      }
    },
    [action, isActive, params]
  );

  const lectureParams = useParams<LectureParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('isActive', isActive);
    console.log('params', params);
    console.log('watchlogState', watchlogState);
    console.log('panoptoState', panoptoState);

    let interval: any = null;
    let progressInterval: any = null;

    const currentTime = (embedApi.getCurrentTime() as unknown) as number;
    const duration = (embedApi.getDuration() as unknown) as number;
    console.log('currentTime', currentTime);
    console.log('duration', duration);

    let confirmProgressTime = (duration / 10) * 1000;

    console.log('confirmProgressTime', confirmProgressTime);
    //confirmProgressTime
    if (!confirmProgressTime || confirmProgressTime > 60000) {
      confirmProgressTime = 60000;
    }
    console.log('confirmProgressTime', confirmProgressTime);

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
      console.log('params change confirmProgress');
      confirmProgress(params);
      setCurrentParams(params);
    }
  }, [params]);

  useEffect(() => {
    if (getLectureStructure() && getLectureStructure()?.cubes) {
      const cubeIndex =
        getLectureStructure()?.cubes.findIndex(
          cube => cube.cubeId == params?.contentId
        ) || 0;
      const cubesLength = getLectureStructure()?.cubes.length;

      const cubeNextIndex = cubeIndex + 1;

      if (
        getLectureConfirmProgress()?.learningState == 'Passed' &&
        cubeNextIndex &&
        cubesLength &&
        cubeNextIndex < cubesLength
      ) {
        setNextContentsPath(getLectureStructure()?.cubes[cubeIndex + 1].path);
        setNextContentsName(getLectureStructure()?.cubes[cubeIndex + 1].name);
      }
    }
  }, [getLectureStructure(), getLectureConfirmProgress()]);

  const cleanUpPanoptoIframe = () => {
    let playerEl = document.getElementById('panopto-embed-player');
    if (playerEl) playerEl.innerHTML = '';
  };

  const seekByIndex = (index: number) => {
    console.log('transcript index: ' + index);
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
                          seekByIndex(lectureTranscript.idx);
                        }}
                      >
                        {toHHMM(lectureTranscript.idx)}
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
