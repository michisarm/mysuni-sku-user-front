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
  pauseVideo,
  PlayerState,
  playVideo,
  VideoContainer,
} from '@sku/skuniv-ui-video-player';
import LectureState from '../../../viewModel/LectureState';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { findCubeDetailCache } from '../../../api/cubeApi';
import {
  findIsBookmark,
  toggleCardBookmark,
} from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun } from 'mobx';
import { isMobile } from 'react-device-detect';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { SkProfileService } from 'profile/stores';
import { Action, Area } from 'tracker/model';

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

//FIXME SSO ???????????? ????????? ????????? ?????? ??? ???.
const LectureVideoView: React.FC<LectureVideoViewProps> =
  function LectureVideoView({
    getStickyPosition,
    scroll,
    videoPosition,
    enabled, // ???????????? ?????? state
    nextContentsView,
    lectureState,
    currentTime,
    duration,
    playerState,
  }) {
    const params = useParams<LectureParams>();
    const [isBookmark, setIsBookmark] = useState<boolean>(false);
    const [serverName, setServerName] = useState<string>();
    const [hideNextContent, setHideNextContent] = useState<boolean>(false);
    const lectureMedia = useLectureMedia();
    const [videoContainerProps, setVideoContainerProps] = useState<
      | {
          panoptoSessionId: string;
          directConnectionName?: string;
          targetSamlInstanceName?: string;
        }
      | undefined
    >(undefined);
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
              let nextServerName: string | undefined;
              let search = window.location.search;
              if (search.includes('serverName')) {
                search = search.substring(1);
                search.split('&').forEach((keyValue) => {
                  const [key, value] = keyValue.split('=');
                  if (key === 'serverName') {
                    nextServerName = value;
                  }
                });
              }
              setServerName(nextServerName);

              const panoptoSessionId =
                media.mediaContents.internalMedias[0].panoptoSessionId;
              const directConnectionName =
                media.mediaContents.internalMedias[0].directConnectionName;
              const targetSamlInstanceName =
                media.mediaContents.internalMedias[0].targetSamlInstanceName;
              setVideoContainerProps({
                panoptoSessionId,
                directConnectionName,
                targetSamlInstanceName,
              });
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

    // ?????? ????????? ?????? ????????????
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

    // sticky??? ???????????? ?????? (cube)
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

      const pathnameChangeCheck = sessionStorage.getItem('lectureVideoView');

      if (pathnameChangeCheck && playerState === PlayerState.Playing) {
        setTimeout(() => {
          sessionStorage.removeItem('lectureVideoView');
        }, 1000);
      }
      if (
        // learningState !== 'Passed' && // ???????????? ??????
        matchesQuizTime !== undefined && // quizShowTime ???????????? ????????? currentTime
        quizShowTime && // ?????? ?????? ??????
        // matchesQuizTime === quizShowTime[quizCurrentIndex] && // ?????? ?????? ??????
        quizShowTime.filter((f) => f === matchesQuizTime).length > 0 && // ?????? ?????? ??????
        lectureMedia?.mediaContents.internalMedias[0].quizIds // quizIds ??????
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
              '????????? ??????????????????.',
              'Collage-Video-????????????'
            ),
            message: getPolyglotText(
              '?????? ????????? ???????????? ??????????????? ??? ??? ????????????.',
              'Collage-Video-????????????'
            ),
            onClose: () => onScrollTop(),
          });
        } else if (quizCurrentTime !== matchesQuizTime) {
          setPauseVideoSticky(false);
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

    useEffect(() => {
      setIsBookmark(findIsBookmark(params?.cardId));
    }, [params?.cardId]);

    const onCompletedQuiz = useCallback(() => {
      if (quizPop) {
        setQuizPop(false);
        playVideo();
      }
      // setQuizCurrentIndex(quizCurrentIndex + 1);
    }, [quizPop, quizCurrentIndex]);

    const onScrollTop = () => {
      window.scrollTo(0, 124);
      setPauseVideoSticky(false);
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
        title: getPolyglotText('??????', 'cicl-????????????-??????'),
        message: getPolyglotText(
          'URL??? ?????????????????????.',
          'mypage-????????????-url'
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
        ref={getStickyPosition}
      >
        <div className="lms-video-sticky">
          {videoContainerProps !== undefined && (
            <VideoContainer
              language={SkProfileService.instance.skProfile.language}
              panoptoSessionId={videoContainerProps.panoptoSessionId}
              directConnectionName={videoContainerProps.directConnectionName}
              targetSamlInstanceName={
                videoContainerProps.targetSamlInstanceName
              }
              captionText={getPolyglotText('????????????', '?????????-???-????????????')}
              disableCaptionText={getPolyglotText(
                '?????? ??????',
                '?????????-???-????????????'
              )}
              serverName={serverName}
            >
              <>
                <VideoQuizContainer
                  isSticked={isSticked}
                  quizPop={quizPop}
                  quizCurrentIndex={quizCurrentIndex}
                  onCompletedQuiz={onCompletedQuiz}
                />
                {pauseVideoSticky && (
                  <div className="video-overlay-small art">
                    <button onClick={onScrollTop} type="button">
                      <span className="copy">
                        <PolyglotText
                          defaultString="???????????? ????????????"
                          id="Collage-Video-????????????"
                        />
                      </span>
                    </button>
                  </div>
                )}
                {!hideNextContent &&
                  nextContentsView &&
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
                              defaultString="?????? ?????? ????????????"
                              id="Collage-Video-????????????"
                            />
                          </p>
                          <h3>
                            {nextContent &&
                              (nextContent as LectureStructureCubeItem).name}
                          </h3>
                        </div>
                        <img
                          src="https://image.mysuni.sk.com/suni-asset/public/static/images/all/close-white.png"
                          style={{ float: 'right', marginTop: 13 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHideNextContent(true);
                          }}
                        />
                      </div>
                      <div
                        className="video-overlay-small"
                        onClick={() => nextContents(nextContent?.path)}
                        style={{
                          cursor: 'pointer',
                          justifyContent: 'initial',
                          paddingLeft: 20,
                          paddingRight: 20,
                        }}
                      >
                        <button style={{ display: 'flex' }}>
                          <img src={playerBtn} />
                        </button>
                        <span className="copy" style={{ flex: 1 }}>
                          <PolyglotText
                            defaultString="?????? ?????? ????????????"
                            id="Collage-Video-????????????"
                          />
                        </span>
                        <img
                          src="https://image.mysuni.sk.com/suni-asset/public/static/images/all/close-white.png"
                          style={{
                            width: 18,
                            height: 18,
                            marginRight: 0,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHideNextContent(true);
                          }}
                        />
                      </div>
                    </>
                  )}
              </>
            </VideoContainer>
          )}

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
              <a onClick={() => toggleCardBookmark(setIsBookmark)}>
                <span>
                  <Icon className={!isBookmark ? 'listAdd' : 'listDelete'} />
                  {!isBookmark
                    ? getPolyglotText('?????? ??????', 'Collage-Video-????????????')
                    : getPolyglotText('?????? ??????', 'Collage-Video-????????????')}
                </span>
              </a>
              <a
                onClick={copyUrl}
                data-area={Area.CUBE_PLAY}
                data-action={Action.CLICK}
                data-action-name="???????????? ?????? ??????"
              >
                <span>
                  <Icon className="linkCopy" />
                  <PolyglotText
                    defaultString="????????????"
                    id="Collage-Video-????????????"
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
