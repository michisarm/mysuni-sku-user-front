import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import { reactAlert } from '@nara.platform/accent';
import { useLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import LectureParams from '../../../viewModel/LectureParams';
import { Button, Icon, Image } from 'semantic-ui-react';
import { useNextContent } from '../../../service/useNextContent';
import { LectureStructureCubeItem } from '../../../viewModel/LectureStructure';
import { findAllQuiz } from '../../../../../quiz/api/QuizApi';
import QuizTableList from '../../../../../quiz/model/QuizTableList';
import VideoQuizContainer from '../../../../../quiz/ui/logic/VideoQuizContainer';
import { getLectureParams } from '../../../store/LectureParamsStore';
import {
  clearPanoptoEmbedPlayer,
  initializePanoptoEmbedPlayer,
  pauseVideo,
  PlayerState,
  playVideo,
  parseCaptionTracks,
  disableCaptions,
  enableCaptions,
} from '../../../service/PanoptoEmbedPlayer';
import LectureState from '../../../viewModel/LectureState';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { toggleCardBookmark } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun } from 'mobx';
import InMyLectureService from '../../../../../myTraining/present/logic/InMyLectureService';
import { isMobile } from 'react-device-detect';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { usePanoptoEmbedPlayerState } from 'lecture/detail/store/PanoptoEmbedPlayerStore';

const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

interface LectureVideoViewProps {
  lectureState: LectureState;
  getStickyPosition: any;
  scroll: number;
  videoPosition: number;
  enabled: boolean;
  nextContentsView: boolean;
  currentTime: number;
  duration: number;
  playerState: PlayerState;
}

interface NameValue {
  name: string;
  value: number;
}

let hoverMouseMovedTimeout = 0;

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
const LectureVideoView: React.FC<LectureVideoViewProps> =
  function LectureVideoView({
    getStickyPosition,
    scroll,
    videoPosition,
    enabled, // 링크드인 판별 state
    nextContentsView,
    lectureState,
    currentTime,
    duration,
    playerState,
  }) {
    const params = useParams<LectureParams>();
    const lectureMedia = useLectureMedia();
    useEffect(() => {
      if (params.cubeId !== undefined) {
        findCubeDetailCache(params.cubeId).then((cubeDetail) => {
          if (cubeDetail !== undefined) {
            const {
              cubeMaterial: { media },
            } = cubeDetail;
            if (
              media !== null &&
              media.mediaContents.internalMedias[0] !== undefined
            ) {
              let serverName: string | undefined;
              let search = window.location.search;
              if (search.includes('serverName')) {
                search = search.substring(1);
                search.split('&').forEach((keyValue) => {
                  const [key, value] = keyValue.split('=');
                  if (key === 'serverName') {
                    serverName = value;
                  }
                });
              }

              const panoptoSessionId =
                media.mediaContents.internalMedias[0].panoptoSessionId;
              const directConnectionName =
                media.mediaContents.internalMedias[0].directConnectionName;
              const targetSamlInstanceName =
                media.mediaContents.internalMedias[0].targetSamlInstanceName;
              initializePanoptoEmbedPlayer(
                panoptoSessionId,
                directConnectionName,
                targetSamlInstanceName,
                serverName
              );
            }
          }
        });
      }

      return clearPanoptoEmbedPlayer;
    }, [params.cubeId]);

    const history = useHistory();
    const nextContents = useCallback((path: string) => {
      history.push(path);
    }, []);

    const [cubeName, setCubeName] = useState<any>('');

    const { pathname } = useLocation();
    const document: any = window.document;

    const nextContent = useNextContent();
    const [pauseVideoSticky, setPauseVideoSticky] = useState<boolean>(false);

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

    // sticky시 비디오명 표시 (cube)
    useEffect(() => {
      const params = getLectureParams();
      if (params === undefined) {
        return;
      }
      const currentItem = getActiveStructureItem(params.pathname);
      if (currentItem?.type === 'CUBE') {
        setCubeName((currentItem as LectureStructureCubeItem).name);
      }
    }, [params.cubeId]);

    const [quizPop, setQuizPop] = useState<boolean>(false);
    const [quizShowTime, setQuizShowTime] = useState<number[]>();
    const [quizCurrentIndex, setQuizCurrentIndex] = useState<number>(0);
    const [quizCurrentTime, setQuizquizCurrentTime] = useState<number>(0);

    useEffect(() => {
      const matchesQuizTime: number = Math.floor(currentTime);

      if (matchesQuizTime !== quizCurrentTime) {
        setQuizquizCurrentTime(matchesQuizTime);
      }

      const learningState = lectureState.student?.learningState;
      const pathnameChangeCheck = sessionStorage.getItem('lectureVideoView');

      if (pathnameChangeCheck && playerState === PlayerState.Playing) {
        setTimeout(() => {
          sessionStorage.removeItem('lectureVideoView');
        }, 1000);
      }
      if (
        // learningState !== 'Passed' && // 학습이수 체크
        matchesQuizTime !== undefined && // quizShowTime 배열에서 체크할 currentTime
        quizShowTime && // 퀴즈 등장 시간
        // matchesQuizTime === quizShowTime[quizCurrentIndex] && // 퀴즈 등장 시간
        quizShowTime.filter((f) => f === matchesQuizTime).length > 0 && // 퀴즈 등장 시간
        lectureMedia?.mediaContents.internalMedias[0].quizIds // quizIds 체크
        // pathnameChangeCheck !== 'true'
      ) {
        setQuizCurrentIndex(
          quizShowTime.findIndex((f) => f === matchesQuizTime)
        );
        if (
          scroll > videoPosition &&
          quizShowTime.indexOf(matchesQuizTime) !== -1
        ) {
          setQuizquizCurrentTime(0);
          setPauseVideoSticky(true);
          setQuizPop(false);
          pauseVideo();
          reactAlert({
            title: getPolyglotText(
              '영상이 중지됐습니다.',
              'Collage-Video-영상중지'
            ),
            message: getPolyglotText(
              '퀴즈 답안을 제출하고 이어보기를 할 수 있습니다.',
              'Collage-Video-답안제출'
            ),
            onClose: () => onScrollTop(),
          });
        } else if (quizCurrentTime !== matchesQuizTime) {
          setPauseVideoSticky(false);
          closeFullScreen();
          setQuizPop(true);
          pauseVideo();
        }
      }
    }, [currentTime, scroll, quizShowTime]);

    useEffect(() => {
      setQuizPop(false);
      if (lectureMedia?.mediaContents.internalMedias[0].quizIds) {
        const quizIds = lectureMedia?.mediaContents.internalMedias[0].quizIds;
        const quizId = quizIds?.join(',');
        const getQuizTable = async () => {
          await findAllQuiz(quizId).then((res) => {
            setQuizShowTime(
              res
                .sort(
                  (a: QuizTableList, b: QuizTableList) =>
                    a.showTime - b.showTime
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

    const [inMyLectureMap, setInMyLectureMap] =
      useState<Map<string, InMyLectureModel>>();
    const [inMyLectureModel, setInMyLectureModel] =
      useState<InMyLectureModel>();

    useEffect(() => {
      return autorun(() => {
        setInMyLectureMap(InMyLectureService.instance.inMyLectureMap);
      });
    }, []);

    useEffect(() => {
      if (params?.cardId === undefined) {
        return;
      }
      setInMyLectureModel(inMyLectureMap?.get(params?.cardId));
    }, [inMyLectureMap, params?.cardId]);

    const onCompletedQuiz = useCallback(() => {
      if (quizPop) {
        setQuizPop(false);
        playVideo();
      }
      // setQuizCurrentIndex(quizCurrentIndex + 1);
    }, [quizPop, quizCurrentIndex]);

    const panoptoEmbedPlayerState = usePanoptoEmbedPlayerState();

    const [playerHovered, setPlayerHovered] = useState<boolean>(false);
    const [captionSelectorVisible, setCaptionSelectorVisible] =
      useState<boolean>(false);

    const hoverControllerVisible = useMemo<boolean>(() => {
      if (panoptoEmbedPlayerState?.isVideoReadied === true) {
        if (
          panoptoEmbedPlayerState.playerState === 2 ||
          panoptoEmbedPlayerState.playerState === 0
        ) {
          return true;
        }
        if (panoptoEmbedPlayerState.playerState === 1 && playerHovered) {
          return true;
        }
      }
      return false;
    }, [panoptoEmbedPlayerState, playerHovered]);

    const videoControllerMouseOver = useCallback(() => {
      setPlayerHovered(true);
      clearTimeout(hoverMouseMovedTimeout);
      hoverMouseMovedTimeout = setTimeout(() => {
        setPlayerHovered(false);
        setCaptionSelectorVisible(false);
      }, 5000) as any;
    }, []);

    const captions = useMemo<NameValue[]>(() => {
      const r: NameValue[] = [];
      const parsedCaptionTracks = parseCaptionTracks(
        panoptoEmbedPlayerState?.captionTracks
      );
      if (parsedCaptionTracks.includes('Korean')) {
        r.push({
          name: '한국어',
          value: parsedCaptionTracks.findIndex((c) => c === 'Korean'),
        });
      }
      if (parsedCaptionTracks.includes('TraditionalChinese')) {
        r.push({
          name: '中文(繁体)',
          value: parsedCaptionTracks.findIndex(
            (c) => c === 'TraditionalChinese'
          ),
        });
      }
      if (parsedCaptionTracks.includes('SimplifiedChinese')) {
        r.push({
          name: '中文(简体)',
          value: parsedCaptionTracks.findIndex(
            (c) => c === 'SimplifiedChinese'
          ),
        });
      }
      if (parsedCaptionTracks.includes('English')) {
        r.push({
          name: 'English',
          value: parsedCaptionTracks.findIndex((c) => c === 'English'),
        });
      }
      return r;
    }, [panoptoEmbedPlayerState?.captionTracks]);

    const onScrollTop = () => {
      window.scrollTo(0, 124);
      setPauseVideoSticky(false);
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

    function copyUrl() {
      const textarea = document.createElement('textarea');
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999);
      document.execCommand('copy');
      document.body.removeChild(textarea);
      reactAlert({
        title: getPolyglotText('알림', 'cicl-학상본문-알림'),
        message: getPolyglotText(
          'URL이 복사되었습니다.',
          'mypage-유저모달-url'
        ),
      });
    }

    const clickNewTab = () => {
      const noteTab = document.getElementById('handleNoteTab') as HTMLElement;

      if (noteTab !== null) {
        noteTab.click();
      }
      setTimeout(() => {
        const noteBtn = document.getElementById('handlePopup') as HTMLElement;
        if (noteBtn !== null) {
          noteBtn.click();
        }
      }, 500);
    };

    const isSticked = scroll > videoPosition && !enabled;

    return (
      <div
        className={
          isSticked && lectureMedia?.mediaType === 'InternalMedia'
            ? 'video-fixed-holder lms-video-fixed'
            : 'video-fixed-holder'
        }
        style={{ height: '700px' }}
        ref={getStickyPosition}
      >
        <div className="lms-video-sticky">
          <div
            className="video-container"
            onMouseOver={videoControllerMouseOver}
            onMouseOut={(e) => {
              if (
                e.relatedTarget ===
                window.document.getElementById(
                  'panopto-embed-player-hover-container'
                )
              ) {
                return;
              }
              if (
                e.relatedTarget ===
                window.document.getElementById(
                  'panopto-embed-player-hover-caption-container'
                )
              ) {
                return;
              }
              if (
                e.relatedTarget ===
                window.document.getElementById(
                  'panopto-embed-player-hover-caption-button'
                )
              ) {
                return;
              }
              if (
                e.relatedTarget ===
                window.document.getElementById(
                  'panopto-embed-player-caption-selector-container'
                )
              ) {
                return;
              }
              if (
                Array.from(
                  window.document.getElementsByClassName(
                    'video-container-children'
                  )
                ).includes(e.relatedTarget as any)
              ) {
                return;
              }
              setPlayerHovered(false);
              setCaptionSelectorVisible(false);
            }}
          >
            <div id="panopto-embed-player" />
            {hoverControllerVisible && !isSticked && (
              <div
                id="panopto-embed-player-hover-container"
                style={{
                  right: isSticked ? 129 : 154,
                  bottom: isSticked ? 3 : 12,
                  position: 'absolute',
                }}
              >
                <div
                  style={{
                    paddingLeft: isSticked ? 6 : 20,
                    paddingRight: isSticked ? 6 : 20,
                    paddingTop: isSticked ? 12 : 20,
                    paddingBottom: isSticked ? 12 : 16,
                    backgroundColor: isSticked ? 'transparent' : 'transparent',
                  }}
                  id="panopto-embed-player-hover-caption-container"
                >
                  <Image
                    onClick={() =>
                      setCaptionSelectorVisible(!captionSelectorVisible)
                    }
                    id="panopto-embed-player-hover-caption-button"
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                    src={`${process.env.PUBLIC_URL}/images/all/icon-vod-global.png`}
                  />
                </div>
              </div>
            )}
            {captionSelectorVisible && hoverControllerVisible && (
              <div
                id="panopto-embed-player-caption-selector-container"
                style={{
                  right: 114,
                  bottom: 66,
                  position: 'absolute',
                  backgroundColor: 'black',
                  width: 96,
                  padding: 4,
                }}
              >
                <div
                  className="video-container-children"
                  style={{
                    padding: 2,
                    color: 'white',
                    fontSize: 12,
                    textAlign: 'right',
                  }}
                >
                  <PolyglotText
                    defaultString="자막언어"
                    id="비디오-뷰-자막언어"
                  />
                </div>
                <div
                  style={{ height: 4 }}
                  className="video-container-children"
                />
                <div
                  onClick={() => {
                    disableCaptions();
                    setCaptionSelectorVisible(false);
                  }}
                  style={{
                    padding: 2,
                    color:
                      panoptoEmbedPlayerState?.selectedCaptionTrack === -1
                        ? 'black'
                        : 'rgba(255, 255, 255, 0.8)',
                    backgroundColor:
                      panoptoEmbedPlayerState?.selectedCaptionTrack === -1
                        ? 'white'
                        : 'black',
                    fontWeight: 600,
                    fontSize: 14,
                    textAlign: 'right',
                    cursor: 'pointer',
                  }}
                  className="video-container-children"
                >
                  <PolyglotText
                    defaultString="사용 안함"
                    id="비디오-뷰-사용안함"
                  />
                </div>
                {captions.map((c) => {
                  return (
                    <div
                      key={c.value}
                      onClick={() => {
                        enableCaptions(c.value);
                        setCaptionSelectorVisible(false);
                      }}
                      style={{
                        padding: 2,
                        color:
                          panoptoEmbedPlayerState?.selectedCaptionTrack ===
                          c.value
                            ? 'black'
                            : 'rgba(255, 255, 255, 0.8)',
                        backgroundColor:
                          panoptoEmbedPlayerState?.selectedCaptionTrack ===
                          c.value
                            ? 'white'
                            : 'black',
                        fontWeight: 600,
                        fontSize: 14,
                        textAlign: 'right',
                        cursor: 'pointer',
                      }}
                      className="video-container-children"
                    >
                      {c.name}
                    </div>
                  );
                })}
              </div>
            )}
            <VideoQuizContainer
              quizPop={quizPop}
              quizCurrentIndex={quizCurrentIndex}
              onCompletedQuiz={onCompletedQuiz}
            />
            {pauseVideoSticky && (
              <div className="video-overlay-small art">
                <button onClick={onScrollTop} type="button">
                  <span className="copy">
                    <PolyglotText
                      defaultString="퀴즈풀고 이어보기"
                      id="Collage-Video-퀴즈풀기"
                    />
                  </span>
                </button>
              </div>
            )}
            {/* video-overlay 에 "none"클래스 추가 시 영역 안보이기 */}
            {nextContentsView &&
              nextContent?.path !== undefined &&
              lectureState.student?.learningState === 'Passed' && (
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
                      <p>
                        <PolyglotText
                          defaultString="다음 학습 이어하기"
                          id="Collage-Video-이어하기"
                        />
                      </p>
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
                    <span className="copy">
                      <PolyglotText
                        defaultString="다음 학습 이어하기"
                        id="Collage-Video-이어하기"
                      />
                    </span>
                  </div>
                </>
              )}
          </div>
          <div className="sticky-video-content">
            <div className="header">{cubeName}</div>
            <div className="time-check">
              <strong>{getTimeStringSeconds(currentTime)}</strong> /
              {getTimeStringSeconds(duration)}
            </div>
            <div className="header-right-link">
              {!isMobile && (
                <Button onClick={clickNewTab}>
                  <span>
                    <Icon className="noteWrite" />
                    Note
                  </span>
                </Button>
              )}
              <a onClick={toggleCardBookmark}>
                <span>
                  <Icon
                    className={
                      inMyLectureModel === undefined ? 'listAdd' : 'listDelete'
                    }
                  />
                  {inMyLectureModel === undefined
                    ? getPolyglotText('관심목록 추가', 'Collage-Video-관심추가')
                    : getPolyglotText(
                        '관심목록 제거',
                        'Collage-Video-관심제거'
                      )}
                </span>
              </a>
              <a onClick={copyUrl}>
                <span>
                  <Icon className="linkCopy" />
                  <PolyglotText
                    defaultString="링크 복사"
                    id="Collage-Video-링크복사"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default LectureVideoView;
