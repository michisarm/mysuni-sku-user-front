import React, { useEffect, useState, useRef, useCallback } from 'react';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import WatchLog from 'lecture/detail/model/Watchlog';
import { patronInfo } from '@nara.platform/dock';
import LectureParams from '../../viewModel/LectureParams';
import { useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import {
  getLectureConfirmProgress,
  setLectureConfirmProgress,
} from 'lecture/detail/store/LectureConfirmProgressStore';
import { useHistory } from 'react-router-dom';
import {
  audioClose,
  audioStart,
} from '../../service/useActionLog/cubeStudyEvent';
import { requestCardLectureStructure } from '../../service/useLectureStructure/utility/requestCardLectureStructure';
import { useNextContent } from '../../service/useNextContent';
import {
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
} from '../../viewModel/LectureStructure';
import { confirmProgress } from '../../service/useLectureMedia/utility/confirmProgress';
import { setWatchLog } from '../../service/useLectureMedia/useLectureWatchLog';

interface LectureAudioViewProps {
  checkStudent: (params: LectureParams, path: string) => void;
}

const LectureAudioView: React.FC<LectureAudioViewProps> = function LectureAudioView({
  checkStudent,
}) {
  const { pathname } = useLocation();
  const params = useParams<LectureParams>();
  const [isStateUpated, setIsStateUpated] = useState<boolean>(false);
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
    setLectureConfirmProgress();
    setPanoptoState(10);
    history.push(path);
  }, []);

  const onPanoptoStateUpdate = useCallback(
    async (state: number) => {
      setPanoptoState(state);
      setIsActive(false);
      if (state == 2) {
        setNextContentsView(false);
        audioClose();
      } else if (state == 1) {
        setIsActive(true);
        setNextContentsView(false);
        if (!isStateUpated) {
          setIsStateUpated(true);
          sessionStorage.removeItem('inProgressTableViews');
          sessionStorage.removeItem('InProgressLearningList');
        }
        audioStart();
      } else if (state == 0) {
        setNextContentsView(true);
      }
    },
    [params]
  );

  const registCheckStudent = useCallback(
    async (params: LectureParams | undefined) => {
      if (params) {
        await checkStudent(params, pathname);
      }
    },
    [params, pathname]
  );

  const mediaCheckEvent = useCallback(async () => {
    await confirmProgress();
    requestCardLectureStructure(params.cardId);
  }, [params.cardId]);

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
  }, [panoptoState, params]);

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
  }, [
    isActive,
    // lectureParams,
    // pathname,
    params,
    embedApi,
    startTime,
    // watchlogState,
  ]);

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
  }, [params, isActive]);

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
      setLectureConfirmProgress();
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
        nextContent &&
        getLectureConfirmProgress()?.learningState == 'Passed' && (
          <div className="video-overlay">
            <div className="video-overlay-btn">
              <button onClick={() => nextContents(nextContent.path)}>
                <img src={playerBtn} />
              </button>
            </div>
            <div className="video-overlay-text">
              <p>다음 학습 이어하기</p>
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
