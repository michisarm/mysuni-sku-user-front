import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getCookie } from '@nara.platform/accent';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import WatchLog from 'lecture/detail/model/Watchlog';
import { patronInfo } from '@nara.platform/dock';
import LectureParams from '../../viewModel/LectureParams';
import { useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import { useHistory } from 'react-router-dom';
import { useNextContent } from '../../service/useNextContent';
import {
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
} from '../../viewModel/LectureStructure';
import { confirmProgress } from '../../service/useLectureMedia/utility/confirmProgress';
import { setWatchLog } from '../../service/useLectureMedia/useLectureWatchLog';
import { debounceActionTrack } from 'tracker/present/logic/ActionTrackService';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model/ActionType';
import LectureState from '../../viewModel/LectureState';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface LectureAudioViewProps {
  lectureState: LectureState;
  checkStudent: (params: LectureParams, path: string) => void;
}

const LectureAudioView: React.FC<LectureAudioViewProps> = function LectureAudioView({
  lectureState,
  checkStudent,
}) {
  const { pathname } = useLocation();
  const params = useParams<LectureParams>();
  const [isStateUpated, setIsStateUpated] = useState<boolean>(false);
  const [isFirstAction, setIsFirstAction] = useState<boolean>(false);
  const nextContent = useNextContent();

  const [watchlogState, setWatchlogState] = useState<WatchLog>();
  const [panoptoState, setPanoptoState] = useState<number>();
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);
  const [startTime, setStartTime] = useState(0);
  const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;
  const myInput: any = useRef();

  const updateDimesions = () => {
    if (document.getElementsByTagName('iframe')[0] === undefined) {
      return;
    }
    document.getElementsByTagName('iframe')[0].width =
      myInput.current.clientWidth + 'px';
  };

  useEffect(() => {
    updateDimesions();
    window.addEventListener('resize', updateDimesions);
  }, []);

  useEffect(() => {
    const watchlog: WatchLog = {
      patronKeyString: patronInfo.getDenizenId() || '',
      start: 0,
      end: 0,
      lectureUsid: params?.cubeId || '',
    };
    setWatchlogState(watchlog);
  }, [params]);

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
    setPanoptoState(10);
    history.push(path);
  }, [history]);

  const onPanoptoStateUpdate = useCallback(
    async (state: number) => {
      setPanoptoState(state);
      setIsActive(false);
      if (state == 2) {
        setNextContentsView(false);
      } else if (state == 1) {
        setIsActive(true);
        setNextContentsView(false);
        if (!isStateUpated) {
          setIsStateUpated(true);
          sessionStorage.removeItem('inProgressTableViews');
          sessionStorage.removeItem('InProgressLearningList');
        }
        if (!isFirstAction) {
          setIsFirstAction(true);
        }
      } else if (state == 0) {
        setNextContentsView(true);
      }
    },
    [isFirstAction, isStateUpated]
  );

  // study action event : 방문당 한번 적재
  useEffect(() => {
    if (isFirstAction) {
      // study action track
      debounceActionTrack({
        email:
          (window.sessionStorage.getItem('email') as string) ||
          (window.localStorage.getItem('nara.email') as string) ||
          getCookie('tryingLoginId'),
        path: window.location.pathname,
        search: window.location.search,
        area: Area.CUBE_PLAY,
        actionType: ActionType.STUDY,
        action: Action.CLICK,
        actionName: '학습버튼 클릭',
      } as ActionTrackParam);
    }
  }, [isFirstAction]);

  useEffect(() => {
    if (params.cubeId) {
      setIsFirstAction(false);
    }
  }, [params.cubeId]);

  const registCheckStudent = useCallback(
    async (params: LectureParams | undefined) => {
      if (params) {
        await checkStudent(params, pathname);
      }
    },
    [checkStudent, pathname]
  );

  const mediaCheckEvent = useCallback(async () => {
    await confirmProgress();
  }, []);

  useEffect(() => {
    if (params) {
      setNextContentsView(false);
    }
  }, [params]);

  useEffect(() => {
    setNextContentsView(false);
    //동영상 종료
    if (panoptoState == 0 || panoptoState == 2) {
      mediaCheckEvent();
      if (
        Math.floor((embedApi.getCurrentTime() as unknown) as number) ==
        Math.floor((embedApi.getDuration() as unknown) as number)
      ) {
        setNextContentsView(true);
      }
    }
    //동영상 시작시 student 정보 확인 및 등록
    if (panoptoState == 1) {
      registCheckStudent(params);
      mediaCheckEvent();
    }
  }, [embedApi, mediaCheckEvent, panoptoState, params, registCheckStudent]);

  useEffect(() => {
    let interval: any = null;
    const currentTime = (embedApi.getCurrentTime() as unknown) as number;
    const duration = (embedApi.getDuration() as unknown) as number;

    if (!startTime) {
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
        const start =
          startTime > end || end - startTime > 21
            ? end - 10 * playbackRate
            : startTime;
        /* eslint-disable */
        setWatchlogState({
          ...watchlogState,
          start: start < 0 ? 0 : start,
          end: end,
        });
        /* eslint-enable */

        //TODO : WatchLog 호출시 불필요한 Cube 호출 제거 예정
        setWatchLog(watchlogState);
        setStartTime((embedApi.getCurrentTime() as unknown) as number);
        // }, 10000));
        if (
          duration - ((embedApi.getCurrentTime() as unknown) as number) <
          20
        ) {
          setNextContentsView(true);
        }
      }, 10000);
    } else if (!isActive) {
      // sendWatchLog();
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, params, embedApi, startTime, watchlogState]);

  useEffect(() => {
    // clearTimeout(progressInterval);
    let checkInterval: any = null;
    const duration = (embedApi.getDuration() as unknown) as number;
    let confirmProgressTime = (duration / 20) * 1000;

    if (!confirmProgressTime || confirmProgressTime < 30000) {
      confirmProgressTime = 30000;
    }

    if (isActive && params) {
      // setCheckInterval(setInterval(() => {
      checkInterval = setInterval(() => {
        mediaCheckEvent();
        // }, 20000));
      }, confirmProgressTime);
      // checkIntervalRef.current = checkInterval;
    } else if (!isActive) {
      clearInterval(checkInterval);
    }
    return () => {
      clearInterval(checkInterval);
    };
  }, [params, isActive, embedApi, mediaCheckEvent]);

  // useEffect(() => {
  //   return () => {
  //     clearInterval(watchInterval);
  //     clearInterval(checkInterval);
  //   };
  // }, [checkInterval, watchInterval]);

  useEffect(() => {
    setNextContentsView(false);
    return () => {
      // video cube 클릭 후 video 이외의 탭으로 넘어가면 아래 이벤트 때문에 학습완료하지 않고 Test 나 Survay 등 가능함.
      // 막으면 진도율에 영향이 있는지 확인필요.
      // mediaCheckEvent(params);
      setPanoptoState(10);
      setIsActive(false);
      setNextContentsView(false);
    };
  }, []);

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
    const playerEl = document.getElementById('panopto-embed-audio-player'); //audio player 라는 것이 따로 없습니다.
  };

  const onPanoptoLoginShown = () => {};

  useEffect(() => {
    onLectureMedia(lectureMedia => {
      cleanUpPanoptoIframe(); //기존에 어떤 상태이건 초기화
      if (
        lectureMedia &&
        (lectureMedia.mediaType == 'InternalMedia' ||
          lectureMedia.mediaType == 'InternalMediaUpload')
      ) {
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
            interactivity: 'search',
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
  }, [onPanoptoStateUpdate]);

  const cleanUpPanoptoIframe = () => {
    const playerEl = document.getElementById('panopto-embed-audio-player');
    if (playerEl) playerEl.innerHTML = '';
  };

  return (
    <div className="audio-container" ref={myInput}>
      {nextContentsView &&
        nextContent &&
        lectureState.student?.learningState == 'Passed' && (
          <div className="video-overlay">
            <div className="video-overlay-btn">
              <button onClick={() => nextContents(nextContent.path)}>
                <img src={playerBtn} />
              </button>
            </div>
            <div className="video-overlay-text">
              <p>
                <PolyglotText defaultString="다음 학습 이어하기" id="Collage-Audio-이어하기" />
              </p>
              <h3>
                {
                  (nextContent as
                    | LectureStructureCubeItem
                    | LectureStructureDiscussionItem).name
                }
              </h3>
            </div>
          </div>
        )}
      <div id="panopto-embed-audio-player" className="l-audio" />
    </div>
  );
};

export default LectureAudioView;
