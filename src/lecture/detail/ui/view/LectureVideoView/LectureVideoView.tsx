import React, { useCallback, useEffect, useState } from 'react';
import { reactAlert } from '@nara.platform/accent';
import { useLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import LectureParams from '../../../viewModel/LectureParams';
import { Icon } from 'semantic-ui-react';
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
} from '../../../service/PanoptoEmbedPlayer';
import LectureState from '../../../viewModel/LectureState';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { findCubeDetailCache } from '../../../api/cubeApi';

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

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({
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
      findCubeDetailCache(params.cubeId).then(cubeDetail => {
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
              search.split('&').forEach(keyValue => {
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
      quizShowTime.filter(f => f === matchesQuizTime).length > 0 && // 퀴즈 등장 시간
      lectureMedia?.mediaContents.internalMedias[0].quizIds // quizIds 체크
      // pathnameChangeCheck !== 'true'
    ) {
      if (
        scroll > videoPosition &&
        quizShowTime.indexOf(matchesQuizTime) !== -1
      ) {
        setQuizquizCurrentTime(0);
        setPauseVideoSticky(true);
        setQuizPop(false);
        pauseVideo();
        reactAlert({
          title: '영상이 중지됐습니다.',
          message: '퀴즈 답안을 제출하고 이어보기를 할 수 있습니다.',
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
      playVideo();
    }
    // setQuizCurrentIndex(quizCurrentIndex + 1);
  }, [quizPop, quizCurrentIndex]);

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

  return (
    <div
      className={
        scroll > videoPosition &&
          !enabled &&
          lectureMedia?.mediaType === 'InternalMedia'
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
            {getTimeStringSeconds(duration)}
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
      </div>
    </div>
  );
};

export default LectureVideoView;
