import React, { useCallback, useEffect, useRef, useState } from 'react';
import { reactAlert } from '@nara.platform/accent';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import {
  getLectureMedia,
  onLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import { patronInfo } from '@nara.platform/dock';
import WatchLog from 'lecture/detail/model/Watchlog';
import {
  setLectureConfirmProgress,
  getLectureConfirmProgress,
} from 'lecture/detail/store/LectureConfirmProgressStore';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import LectureParams from '../../../viewModel/LectureParams';
import { Icon } from 'semantic-ui-react';
import {
  videoClose,
  videoStart,
} from '../../../service/useActionLog/cubeStudyEvent';
import { MyTrainingService } from 'myTraining/stores';
import {
  getActiveCourseStructureItem,
  getActiveStructureItem,
} from '../../../utility/lectureStructureHelper';
import { requestCardLectureStructure } from '../../../service/useLectureStructure/utility/requestCardLectureStructure';
import { useNextContent } from '../../../service/useNextContent';
import { LectureStructureCubeItem } from '../../../viewModel/LectureStructure';
import {
  retMultiVideoOverlap,
  setWatchLog,
} from '../../../service/useLectureMedia/useLectureWatchLog';
import { confirmProgress } from '../../../service/useLectureMedia/utility/confirmProgress';
import { findAllQuiz } from '../../../../../quiz/api/QuizApi';
import QuizTableList from '../../../../../quiz/model/QuizTableList';
import { useLectureMedia } from '../../../service/useLectureMedia/useLectureMedia';
import VideoQuizContainer from '../../../../../quiz/ui/logic/VideoQuizContainer';

const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

interface LectureVideoViewProps {
  checkStudent: (params: LectureParams) => void;
  getStickyPosition: any;
  scroll: number;
  videoPosition: number;
  enabled: boolean;
}

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({
  checkStudent,
  getStickyPosition,
  scroll,
  videoPosition,
  enabled, // 링크드인 판별 state
}) {
  const params = useParams<LectureParams>();
  const { cardId } = params;

  const [isStateUpated, setIsStateUpated] = useState<boolean>(false);
  const [liveLectureCardId, setLiveLectureCardId] = useState<string>('');
  const [cubeName, setCubeName] = useState<any>('');

  const { pathname } = useLocation();
  const playIntervalRef = useRef<any>(0);
  const checkIntervalRef = useRef<any>(0);
  const transcriptIntervalRef = useRef<any>(0);
  const multiVideoIntervalRef = useRef<any>(0);
  const myTrainingService = MyTrainingService.instance;
  const document: any = window.document;

  useEffect(() => {
    // all cleare interval
    return () => {
      clearInterval(playIntervalRef.current);
      clearInterval(checkIntervalRef.current);
      clearInterval(transcriptIntervalRef.current);
      clearInterval(multiVideoIntervalRef.current);
      setPanoptoState(0);
    };
  }, [pathname]);

  const [watchlogState, setWatchlogState] = useState<WatchLog>();
  const [panoptoState, setPanoptoState] = useState<number>(0);
  const [transciptHighlight, setTransciptHighlight] = useState<string>();
  const nextContent = useNextContent();
  const [pauseVideoSticky, setPauseVideoSticky] = useState<boolean>(false);

  useEffect(() => {
    const watchlog: WatchLog = {
      patronKeyString: patronInfo.getDenizenId() || '',
      start: 0,
      end: 0,
      lectureUsid: params.cubeId || '',
    };
    setWatchlogState(watchlog);
  }, [params]);

  const [isActive, setIsActive] = useState(false);

  const [startTime, setStartTime] = useState(0);

  const [embedApi, setEmbedApi] = useState<any | undefined>({
    pauseVideo: () => {},
    playVideo: () => {},
    seekTo: (index: number) => {},
    getCurrentTime: () => {},
    getDuration: () => {},
    currentPosition: () => {},
    getPlaybackRate: () => {},
  });

  const [displayTranscript, setDisplayTranscript] = useState<boolean>(false);

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
  };

  const onPanoptoLoginShown = () => {
    //로그인 페이지가 안 떠 있는 경우 바로 Clear 시켜서 반복 호출을 막아야 합니다.
    // cleanUpPanoptoIframe();
  };

  const history = useHistory();
  function handleMultiVideo(viewState: string, usid: string, show: boolean) {
    // 멀티시청 제한 param = patronKeyString, state, lectureId
    // state = start:시작, 중간 end:종료
    // lectureId = 시청중인 ID
    // return = false:중복시청, true:시청가능
    // alert(`retMultiVideoOverlap before: ${usid}`);
    if (show) {
      retMultiVideoOverlap(viewState, usid).then(res => {
        // alert(`retMultiVideoOverlap after: ${res}`);
        setLiveLectureCardId(res);
        if (viewState !== 'end') {
          if (!res || res === 'false') {
            // embedApi.pauseVideo(); // alert 만 띄우는 것으로... 급하게
            reactAlert({
              title: '알림',
              message:
                '현재 다른 과정을 학습하고 있습니다.<br>기존 학습을 완료한 후 학습해 주시기 바랍니다.',
              // onClose: () => history.goBack(),
            });
          }
        }
      });
    }
  }

  const nextContents = useCallback((path: string) => {
    setLectureConfirmProgress();
    history.push(path);
  }, []);

  const onPanoptoStateUpdate = useCallback(
    async (state: number) => {
      setPanoptoState(state);
      setIsActive(false);
      if (state == 1) {
        setIsActive(true);
        if (!isStateUpated) {
          setIsStateUpated(true);
          sessionStorage.removeItem('inProgressTableViews');
          sessionStorage.removeItem('InProgressLearningList');
        }
        videoStart();
      } else if (state == 2) {
        videoClose();
        // setNextContentsView(true);
      }
    },
    [params, isStateUpated]
  );

  const registCheckStudent = useCallback(
    async (params: LectureParams | undefined) => {
      if (params) {
        await checkStudent(params);
      }
    },
    [params]
  );

  const mediaCheckEvent = useCallback(
    async (params: LectureParams | undefined) => {
      if (params) {
        await confirmProgress();
        requestCardLectureStructure(cardId);
      }
    },
    [cardId]
  );

  const endMultiVideo = () => {
    // alert(`동영상종료 세션에서 가져온 liveLectureId: ${liveLectureId}`);
    const liveLectureId = JSON.parse(
      sessionStorage.getItem('liveLectureCardId')!
    );
    if (liveLectureId) {
      //중복 동영상 체크 종료 signal
      handleMultiVideo('end', liveLectureId, true);
      sessionStorage.removeItem('liveLectureCardId');
    }
  };

  // sesstionStorage 에 학습중, 완료 건 update
  const fetchAllModelsForStorage = async () => {
    const inProgressTableViews = await myTrainingService!.findAllInProgressTableViewsForStorage();
    if (inProgressTableViews && inProgressTableViews.length) {
      sessionStorage.setItem(
        'inProgressTableViews',
        JSON.stringify(inProgressTableViews)
      );
    }

    const completedTableViews = await myTrainingService!.findAllCompletedTableViewsForStorage();
    if (completedTableViews && completedTableViews.length) {
      sessionStorage.setItem(
        'completedTableViews',
        JSON.stringify(completedTableViews)
      );
    }
  };

  useEffect(() => {
    // params 가 바뀌었을때 화면은 유지되면서 loading 만 한다.
    return () => {
      endMultiVideo();
    };
  }, [params.cubeId]);

  const lectureParams = useParams<LectureParams>();

  const goToPath = (path?: string) => {
    if (path !== undefined) {
      //const currentHistory = getCurrentHistory();
      //if (currentHistory === undefined) {
      //  return;
      //}
      //currentHistory.push(path);
      history.push(path);
    }
  };

  useEffect(() => {
    //동영상 종료
    if (panoptoState == 0 || panoptoState == 2) {
      // alert(`동영상종료 panoptoState: ${panoptoState}`);
      mediaCheckEvent(params);
      if (
        Math.floor((embedApi.getCurrentTime() as unknown) as number) ==
        Math.floor((embedApi.getDuration() as unknown) as number)
      ) {
        const course = getActiveCourseStructureItem();
        if (
          course?.state === 'Completed' &&
          course.survey !== undefined &&
          course.survey.state !== 'Completed'
        ) {
          reactAlert({
            title: '안내',
            message: 'Survey 설문 참여를 해주세요.',
            onClose: () => goToPath(course?.survey?.path),
          });
        }
      }
      // alert(`동영상종료 liveLectureCardId: ${liveLectureCardId}`);
      videoClose();
      //중복 동영상 체크 종료 signal
      handleMultiVideo('end', liveLectureCardId, true);
      sessionStorage.removeItem('liveLectureCardId');
    }
    //동영상 시작시 student 정보 확인 및 등록
    if (panoptoState == 1) {
      registCheckStudent(params);
      mediaCheckEvent(params);
      // alert(`동영상시작 liveLectureCardId: ${liveLectureCardId}`);
      videoStart();
      //중복 동영상 체크 시작 signal
      handleMultiVideo('start', params.cubeId || 'start', true);
      sessionStorage.setItem(
        'liveLectureCardId',
        JSON.stringify(params.cubeId)
      );
    }
  }, [panoptoState]);

  useEffect(() => {
    let interval: any = null;
    const currentTime = (embedApi.getCurrentTime() as unknown) as number;
    const duration = (embedApi.getDuration() as unknown) as number;

    if (!startTime) {
      setStartTime(currentTime);
    }
    if (isActive && params && watchlogState) {
      clearInterval(interval);
      interval = setInterval(() => {
        const playbackRate = (embedApi.getPlaybackRate() as unknown) as number;

        // end 가 start보다 작은 경우 or start 보다 end가 20 이상 큰 경우(2배속 10초의 경우 20 이라 21 기준으로 변경함)
        const end = (embedApi.getCurrentTime() as unknown) as number;
        const start =
          startTime > end || end - startTime > 25
            ? end - 10 * playbackRate
            : startTime;

        setWatchlogState({
          ...watchlogState,
          start: start < 0 ? 0 : start,
          end,
        });

        //TODO : WatchLog 호출시 불필요한 Cube 호출 제거 예정
        setWatchLog(watchlogState);
        setStartTime((embedApi.getCurrentTime() as unknown) as number);
        if (
          duration - ((embedApi.getCurrentTime() as unknown) as number) <
          20
        ) {
          // sessionStorage update
          fetchAllModelsForStorage();
        }
      }, 10000);
      // playIntervalRef.current = interval;
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
    let multiVideoInterval: any = null;
    const duration = (embedApi.getDuration() as unknown) as number;
    let confirmProgressTime = (duration / 20) * 1000;

    if (!confirmProgressTime || confirmProgressTime < 30000) {
      confirmProgressTime = 30000;
    }

    if (isActive && params) {
      // setCheckInterval(setInterval(() => {
      checkInterval = setInterval(() => {
        mediaCheckEvent(params);
        // }, 20000));
      }, confirmProgressTime);
      checkIntervalRef.current = checkInterval;

      //중복 동영상 체크 중간 signal
      multiVideoInterval = setInterval(() => {
        handleMultiVideo('start', params.cubeId || 'start', false);
      }, 60000);
      multiVideoIntervalRef.current = multiVideoInterval;
    } else if (!isActive) {
      clearInterval(checkInterval);
      clearInterval(multiVideoInterval);
    }
    return () => {
      clearInterval(checkInterval);
      clearInterval(multiVideoInterval);
    };
  }, [params, isActive]);

  useEffect(() => {
    // 화면 나갈때 event
    return () => {
      endMultiVideo();
      // video cube 클릭 후 video 이외의 탭으로 넘어가면 아래 이벤트 때문에 학습완료하지 않고 Test 나 Survay 등 가능함.
      // 막으면 진도율에 영향이 있는지 확인필요.
      // mediaCheckEvent(params);
      setPanoptoState(10);
      setIsActive(false);
      setEmbedApi('');
      setLectureConfirmProgress();
    };
  }, []);

  const cleanUpPanoptoIframe = () => {
    const playerEl = document.getElementById('panopto-embed-player');
    if (playerEl) playerEl.innerHTML = '';
  };

  const seekByIndex = (index: number) => {
    if (embedApi && index >= 0) {
      //TODO current state 를 찾아서 Play 이
      embedApi.seekTo(index);
    }
  };

  const highlight = (id: string) => {
    if (transciptHighlight === id) {
      return 'l-current';
    } else {
      return '';
    }
  };

  // 2020.12.10 IE iframe Fix
  const Iframe = document.querySelector('iframe');

  const setFullscreenIframe = () => {
    Iframe?.setAttribute('allowfullscreen', '');
  };

  useEffect(() => {
    if (Iframe) {
      setFullscreenIframe();
    }
  }, [Iframe]);

  const [currentTime, setCurrnetTime] = useState<number>(0);
  const [durationTime, setDurationTime] = useState<number>(0);

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
        const embedApi = new window.EmbedApi('panopto-embed-player', {
          width: '100%',
          height: '700',
          //This is the URL of your Panopto site
          //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
          // serverName: 'sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?ReturnUrl=',
          serverName: 'sku.ap.panopto.com',
          sessionId: currentPaonoptoSessionId,
          // sessionId : "6421c40f-46b6-498a-b715-ac28004cf29e",   //테스트 용 sessionId
          videoParams: {
            // Optional parameters
            //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
            // "interactivity": "Caption Language",
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

  // 영상 스티키 시작 시간표시
  const getTimeStringSeconds = useCallback((seconds: number) => {
    if (seconds >= 3600) {
      let min: number | string = 0;
      let sec: number | string = 0;
      let hour: number | string = 0;

      hour = Math.round(seconds / 3600);
      min = Math.round((seconds % 3600) / 60);
      sec = Math.round(seconds % 60);

      if (hour.toString().length == 1) hour = '0' + hour;
      if (min.toString().length == 1) min = '0' + min;
      if (sec.toString().length == 1) sec = '0' + sec;

      return hour + ':' + min + ':' + sec;
    }

    let min: number | string = 0;
    let sec: number | string = 0;

    min = Math.round((seconds % 3600) / 60);
    sec = Math.round(seconds % 60);

    if (min.toString().length == 1) min = '0' + min;
    if (sec.toString().length == 1) sec = '0' + sec;
    return min + ':' + sec;
  }, []);

  // isActive 따라 인터벌 사용
  let intervalFunc: any;
  useEffect(() => {
    if (isActive) {
      intervalFunc = setInterval(() => {
        setCurrnetTime((embedApi.getCurrentTime() as unknown) as number);
        setDurationTime((embedApi.getDuration() as unknown) as number);
      }, 1000);
    } else {
      return () => clearInterval(intervalFunc);
    }

    return () => clearInterval(intervalFunc);
  }, [isActive]);

  // sticky시 비디오명 표시 (cube)
  useEffect(() => {
    const currentItem = getActiveStructureItem();
    if (currentItem?.type === 'CUBE') {
      setCubeName((currentItem as LectureStructureCubeItem).name);
    }
  }, [params.cubeId]);

  const [quizPop, setQuizPop] = useState<boolean>(false);
  const [quizShowTime, setQuizShowTime] = useState<number[]>();
  const [quizCurrentIndex, setQuizCurrentIndex] = useState<number>(0);

  const [_, lectureMedia] = useLectureMedia();

  const videoControll = {
    play: () => embedApi.playVideo(),
    stop: () => embedApi.pauseVideo(),
  };

  useEffect(() => {
    const matchesQuizTime: number = Math.floor(currentTime);
    const learningState = getLectureConfirmProgress()?.learningState;
    const pathnameChangeCheck = sessionStorage.getItem('lectureVideoView');

    if (pathnameChangeCheck && panoptoState === 1) {
      setTimeout(() => {
        sessionStorage.removeItem('lectureVideoView');
      }, 1000);
    }

    if (
      learningState !== 'Passed' && // 학습이수 체크
      matchesQuizTime !== undefined && // quizShowTime 배열에서 체크할 currentTime
      quizShowTime && // 퀴즈 등장 시간
      matchesQuizTime === quizShowTime[quizCurrentIndex] && // 퀴즈 등장 시간
      lectureMedia?.mediaContents.internalMedias[0].quizIds && // quizIds 체크
      pathnameChangeCheck !== 'true'
    ) {
      if (
        scroll > videoPosition &&
        quizShowTime.indexOf(matchesQuizTime) !== -1
      ) {
        setPauseVideoSticky(true);
        setQuizPop(false);
        videoControll.stop();
        reactAlert({
          title: '영상이 중지됐습니다.',
          message: '퀴즈 답안을 제출하고 이어보기를 할 수 있습니다.',
          onClose: () => onScrollTop(),
        });
      } else {
        setPauseVideoSticky(false);
        closeFullScreen();
        setQuizPop(true);
        videoControll.stop();
      }
    }
  }, [currentTime, scroll, quizShowTime, panoptoState]);

  useEffect(() => {
    setQuizPop(false);
    if (lectureMedia?.mediaContents.internalMedias[0].quizIds) {
      const quizIds = lectureMedia?.mediaContents.internalMedias[0].quizIds;
      const quizId = quizIds?.join(',');
      const getQuizTable = async () => {
        await findAllQuiz(quizId).then(res => {
          setQuizShowTime(
            res
              .sort(
                (a: QuizTableList, b: QuizTableList) => a.showTime - b.showTime
              )
              .map((quiz: QuizTableList) => quiz.showTime)
          );
        });
      };
      getQuizTable();
    }
  }, [lectureMedia]);

  useEffect(() => {
    sessionStorage.setItem('lectureVideoView', JSON.stringify(true));
  }, [pathname]);

  const onCompletedQuiz = useCallback(() => {
    if (quizPop) {
      setQuizPop(false);
      videoControll.play();
    }
    if (quizShowTime && quizShowTime?.length - 1 >= quizCurrentIndex) {
      setQuizCurrentIndex(quizCurrentIndex);
      return;
    }
    setQuizCurrentIndex(quizCurrentIndex + 1);
  }, [quizPop, quizCurrentIndex]);

  const onScrollTop = () => {
    window.scrollTo(0, 124);
  };

  const closeFullScreen = () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      className={
        scroll > videoPosition &&
        !enabled &&
        getLectureMedia()?.mediaType === 'InternalMedia'
          ? 'video-fixed-holder lms-video-fixed'
          : 'video-fixed-holder'
      }
      style={{ height: '700px' }}
      ref={getStickyPosition}
    >
      <div className="lms-video-sticky">
        <div className="video-container">
          <div id="panopto-embed-player" />
          <VideoQuizContainer
            quizPop={quizPop}
            quizCurrentIndex={quizCurrentIndex}
            onCompletedQuiz={onCompletedQuiz}
          />
          {pauseVideoSticky && (
            <div className="video-overlay-small art">
              <button onClick={onScrollTop} type="button">
                <span className="copy">퀴즈풀고 이어보기</span>
              </button>
            </div>
          )}
          {/* video-overlay 에 "none"클래스 추가 시 영역 안보이기 */}
          {nextContent?.path !== undefined &&
            getLectureConfirmProgress()?.learningState == 'Passed' && (
              <>
                <div
                  id="video-overlay"
                  className="video-overlay"
                  onClick={() => nextContents(nextContent?.path)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="video-overlay-btn">
                    <button>
                      <img src={playerBtn} />
                    </button>
                  </div>
                  <div className="video-overlay-text">
                    <p>다음 학습 이어하기</p>
                    <h3>
                      {nextContent &&
                        (nextContent as LectureStructureCubeItem).name}
                    </h3>
                  </div>
                </div>
                <div
                  className="video-overlay-small"
                  onClick={() => nextContents(nextContent?.path)}
                  style={{ cursor: 'pointer' }}
                >
                  <button>
                    <img src={playerBtn} />
                  </button>
                  <span className="copy">다음 학습 이어하기</span>
                </div>
              </>
            )}
        </div>
        <div className="sticky-video-content">
          <div className="header">{cubeName}</div>
          <div className="time-check">
            <strong>{getTimeStringSeconds(currentTime)}</strong> /
            {getTimeStringSeconds(durationTime)}
          </div>
          <div className="contents-header-side">
            <div className="header-right-link">
              <a href="">
                <span>
                  <Icon className="listAdd" />
                  관심목록 추가
                </span>
              </a>
              <a href="">
                <span>
                  <Icon className="linkCopy" />
                  링크 복사
                </span>
              </a>
            </div>
          </div>
        </div>
        {getLectureTranscripts() &&
          getLectureMedia() &&
          (getLectureMedia()?.mediaType == 'InternalMedia' ||
            getLectureMedia()?.mediaType == 'InternalMediaUpload') &&
          (getLectureTranscripts()?.length || 0) > 0 &&
          displayTranscript &&
          false && (
            <>
              <button
                className="ui icon button right btn-blue"
                onClick={() => setDisplayTranscript(false)}
              >
                Close Transcript
                <i aria-hidden="true" className="icon icon morelink" />
              </button>
              <div className="course-video-tanscript" id="tanscript-scroll">
                <div className="course-video-scroll">
                  {getLectureTranscripts()?.map(lectureTranscript => {
                    return (
                      <>
                        <strong
                          id={lectureTranscript.idx + ''}
                          style={{ cursor: 'pointer' }}
                          className={highlight(lectureTranscript.idx + '')}
                          onClick={() => {
                            // seekByIndex(lectureTranscript.idx);
                            seekByIndex(
                              parseInt(
                                lectureTranscript.startTime.substr(0, 2),
                                10
                              ) *
                                60 *
                                60 +
                                parseInt(
                                  lectureTranscript.startTime.substr(2, 2),
                                  10
                                ) *
                                  60 +
                                parseInt(
                                  lectureTranscript.startTime.substr(4, 2),
                                  10
                                )
                            );
                          }}
                        >
                          {lectureTranscript.startTime
                            .substr(0, 2)
                            .concat(':')
                            .concat(lectureTranscript.startTime.substr(2, 2))
                            .concat(':')
                            .concat(lectureTranscript.startTime.substr(4, 2))}
                        </strong>
                        <p>{lectureTranscript.text}</p>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        {getLectureTranscripts()?.length !== 0 && !displayTranscript && false && (
          <button
            className="ui icon button right btn-blue"
            onClick={() => setDisplayTranscript(true)}
          >
            View Transcript
            <i aria-hidden="true" className="icon icon morelink" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LectureVideoView;
