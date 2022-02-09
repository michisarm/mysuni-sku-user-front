/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import {
  getLectureMedia,
  useLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import LinkedInModal from '../view/LectureVideoView/LinkedInModal';
import ContentsProviderType from 'personalcube/media/model/ContentsProviderType';
import { useHistory, useLocation } from 'react-router-dom';
import { MediaType } from '../../../model/MediaType';
import {
  addOnProgressEventHandler,
  createOnProgressEventHandler,
  PlayerState,
} from '@sku/skuniv-ui-video-player';
import { usePanoptoEmbedPlayerState } from '@sku/skuniv-ui-video-player';
import {
  getLectureState,
  useLectureState,
} from '../../store/LectureStateStore';
import {
  callConfirmProgress,
  callDebounceActionTrack,
  callRegisterReplayWatchLog,
  callRegisterWatchLog,
  checkStudent,
} from '../../service/useVideoContainer/utility/VideoContainerEvents';
import { getActiveCourseStructureItem } from '../../utility/lectureStructureHelper';
import { reactAlert } from '@nara.platform/accent';
import { retMultiVideoOverlap } from '../../service/useLectureMedia/useLectureWatchLog';
import { useLectureParams } from '../../store/LectureParamsStore';
import moment from 'moment';
import _ from 'lodash';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { LearningState } from 'lecture/model/LearningState';

let preliveLectureId = '';
let 최초진입 = true;

function LectureVideoContainer() {
  const lectureMedia = useLectureMedia();
  const [linkedInOpen, setLinkedInOpen] = useState<boolean>(false);
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);
  const [surveyAlerted, setSurveyAlerted] = useState<boolean>(false);
  const [최초학습상태, set최초학습상태] = useState<LearningState>();
  const lectureState = useLectureState();
  const panoptoEmbedPlayerState = usePanoptoEmbedPlayerState();
  const history = useHistory();
  const params = useLectureParams();

  const callVideoNearEnded = useCallback(() => {
    setNextContentsView(true);
  }, []);

  useEffect(() => {
    return () => {
      최초진입 = true;
      set최초학습상태(undefined);
    };
  }, [params?.cubeId]);

  useEffect(() => {
    if (lectureState === undefined) {
      return;
    }
    if (최초진입) {
      set최초학습상태(lectureState.student?.learningState);
      최초진입 = false;
    }
  }, [lectureState]);

  useEffect(() => {
    const removeCallRegisterWatchLog = addOnProgressEventHandler(
      createOnProgressEventHandler(
        callRegisterWatchLog,
        (lastActionTime, state) => {
          return (
            state.playerState === PlayerState.Playing &&
            lastActionTime + 10000 < Date.now()
          );
        }
      )
    );
    const removeCallVideoNearEnded = addOnProgressEventHandler(
      createOnProgressEventHandler(
        callVideoNearEnded,
        (lastActionTime, state, didAction) => {
          const { duration = 0, currentTime = 0, playerState } = state;
          return (
            playerState === PlayerState.Playing &&
            currentTime + 10 > duration &&
            didAction === false
          );
        }
      )
    );
    const removeCheckStudent = addOnProgressEventHandler(
      createOnProgressEventHandler(
        checkStudent,
        (lastActionTime, state, didAction) => {
          const { playerState } = state;
          return playerState === PlayerState.Playing && didAction === false;
        }
      )
    );
    const removeDebounceActionTrack = addOnProgressEventHandler(
      createOnProgressEventHandler(
        callDebounceActionTrack,
        (lastActionTime, state, didAction) => {
          const { playerState } = state;
          return playerState === PlayerState.Playing && didAction === false;
        }
      )
    );

    return () => {
      setNextContentsView(false);
      removeCallRegisterWatchLog();
      removeCallVideoNearEnded();
      removeCheckStudent();
      removeDebounceActionTrack();
    };
  }, [params?.cubeId]);

  useEffect(() => {
    //
    if (lectureState === undefined) {
      return;
    }

    const removeCallRegisterReplayWatchLog = addOnProgressEventHandler(
      createOnProgressEventHandler(
        callRegisterReplayWatchLog,
        (lastActionTime, state) => {
          return (
            최초학습상태 === 'Passed' &&
            state.playerState === PlayerState.Playing &&
            lastActionTime + 60000 < Date.now()
          );
        }
      )
    );

    return () => {
      removeCallRegisterReplayWatchLog();
    };
  }, [
    lectureState?.student?.learningState,
    lectureState?.student?.durationViewSeconds,
  ]);

  useEffect(() => {
    // fixed: playerState 변화시 api호출 > 최초 cube화면 진입시로 api호출 시점 변경
    // if (panoptoEmbedPlayerState?.playerState === undefined) {
    //   return;
    // }
    // callConfirmProgress(panoptoEmbedPlayerState);
  }, [panoptoEmbedPlayerState?.playerState]);

  useEffect(() => {
    // if (panoptoEmbedPlayerState?.playerState === undefined) {
    //   return;
    // }
    // 학습자로 등록이 되어있으면 보내기 없으면 등록하고 보내기
    callConfirmProgress(panoptoEmbedPlayerState, true);
  }, [params?.cubeId]);

  useEffect(() => {
    if (surveyAlerted === true) {
      return;
    }
    if (
      panoptoEmbedPlayerState?.playerState === undefined ||
      panoptoEmbedPlayerState?.duration === undefined ||
      panoptoEmbedPlayerState?.currentTime === undefined
    ) {
      return;
    }
    if (
      // panoptoEmbedPlayerState.playerState === PlayerState.Paused ||
      panoptoEmbedPlayerState.playerState === PlayerState.Ended
    ) {
      if (
        panoptoEmbedPlayerState.duration <= panoptoEmbedPlayerState.currentTime
      ) {
        const course = getActiveCourseStructureItem();
        if (
          course?.state === 'Completed' &&
          course.survey !== undefined &&
          course.survey.state !== 'Completed'
        ) {
          setSurveyAlerted(true);
          reactAlert({
            title: getPolyglotText('Survey', 'Collage-Video-안내'),
            message: getPolyglotText(
              'Survey에 참여해주세요.',
              'Collage-Video-Survey'
            ),
            onClose: () => {
              if (course?.survey?.path !== undefined) {
                history.push(course.survey.path);
              }
            },
          });
        }
      }
    }
  }, [
    panoptoEmbedPlayerState?.playerState,
    panoptoEmbedPlayerState?.duration,
    panoptoEmbedPlayerState?.currentTime,
    surveyAlerted,
  ]);

  useEffect(() => {
    if (panoptoEmbedPlayerState?.duration === undefined) {
      return;
    }
    const interval = Math.max(
      (panoptoEmbedPlayerState?.duration / 20) * 1000,
      30000
    );
    const removeCallConfirmProgress = addOnProgressEventHandler(
      createOnProgressEventHandler(
        callConfirmProgress,
        (lastActionTime, state) => {
          return (
            state.playerState === PlayerState.Playing &&
            lastActionTime + interval < Date.now()
          );
        }
      )
    );
    return () => {
      removeCallConfirmProgress();
    };
  }, [panoptoEmbedPlayerState?.duration]);

  const [liveLectureCardId, setLiveLectureCardId] = useState<string>('');
  const handleMultiVideo = useCallback((viewState: string, usid: string) => {
    // 멀티시청 제한 param = patronKeyString, state, lectureId
    // state = start:시작, 중간 end:종료
    // lectureId = 시청중인 ID
    retMultiVideoOverlap(viewState, usid).then((res: any) => {
      setLiveLectureCardId(res);
      if (viewState !== 'end') {
        if (!res || (res === 'false' && res !== preliveLectureId)) {
          reactAlert({
            title: getPolyglotText('알림', 'Collage-Video-알림'),
            message: getPolyglotText(
              '현재 다른 과정을 학습하고 있습니다.<br>기존 학습을 완료한 후 학습해 주시기 바랍니다.',
              'Collage-Video-기존학습'
            ),
          });
        }
      }
    });
  }, []);

  const endMultiVideo = useCallback(() => {
    const liveLectureId = JSON.parse(
      sessionStorage.getItem('liveLectureCardId')!
    );
    if (liveLectureId) {
      //중복 동영상 체크 종료 signal
      handleMultiVideo('end', liveLectureId);
      sessionStorage.removeItem('liveLectureCardId');
    }
  }, []);

  useEffect(() => {
    if (
      panoptoEmbedPlayerState?.playerState === undefined ||
      params?.cubeId === undefined
    ) {
      return;
    }
    if (panoptoEmbedPlayerState.playerState === PlayerState.Playing) {
      handleMultiVideo('start', params.cubeId || 'start');
      sessionStorage.setItem(
        'liveLectureCardId',
        JSON.stringify(params.cubeId)
      );
      preliveLectureId = params.cubeId;
    } else {
      //중복 동영상 체크 종료 signal
      handleMultiVideo('end', liveLectureCardId);
      sessionStorage.removeItem('liveLectureCardId');
    }
  }, [panoptoEmbedPlayerState?.playerState, params?.cubeId]);

  useEffect(() => {
    return () => {
      endMultiVideo();
    };
  }, [params?.cubeId]);

  useEffect(() => {
    if (
      lectureMedia?.mediaType === MediaType.ContentsProviderMedia &&
      (lectureMedia?.mediaContents.contentsProvider.contentsProviderType
        .name === 'Linked in' ||
        lectureMedia?.mediaContents.contentsProvider.contentsProviderType
          .name === ContentsProviderType.LinkedIn)
    ) {
      setLinkedInOpen(true);
    } else {
      setLinkedInOpen(false);
    }

    return () => {
      setLinkedInOpen(false);
    };
  }, [lectureMedia]);

  const { pathname } = useLocation();

  // 스크롤 이벤트 영역
  const [scroll, setScroll] = useState<number>(0);
  const [videoPosition, setVideoPosition] = useState<number>(0);

  // 실시간 스크롤 감시
  useEffect(() => {
    const onScroll = () => setScroll(window.pageYOffset);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // video 영역 위치
  const getStickyPosition = useCallback(
    (node) => {
      if (getLectureMedia() === undefined) {
        return;
      }
      if (node !== undefined) {
        setVideoPosition(
          window.pageYOffset + node?.getBoundingClientRect().bottom / 1.5
        );
      }
    },
    [getLectureMedia(), pathname]
  );

  const [isExpiredContentAlerted, setIsExpiredContentAlerted] =
    useState<boolean>(false);

  const isExpiredContent = useMemo(() => {
    if (
      (lectureMedia?.mediaType === MediaType.InternalMedia ||
        lectureMedia?.mediaType === MediaType.InternalMediaUpload) &&
      !_.isEmpty(lectureMedia.mediaContents.contentsProvider.expiryDate) &&
      moment(lectureMedia?.mediaContents.contentsProvider.expiryDate).isValid()
    ) {
      if (
        moment(lectureMedia.mediaContents.contentsProvider.expiryDate)
          .endOf('day')
          .valueOf() < Date.now()
      ) {
        if (isExpiredContentAlerted === false) {
          setIsExpiredContentAlerted(true);
          reactAlert({
            title: '안내',
            message:
              '해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.',
          });
        }
        return true;
      }
    }

    return false;
  }, [lectureMedia, isExpiredContentAlerted]);

  return (
    <>
      {isExpiredContent !== true &&
        lectureMedia !== undefined &&
        lectureState !== undefined &&
        (lectureMedia.mediaType == 'InternalMedia' ||
          lectureMedia.mediaType == 'InternalMediaUpload') && (
          <LectureVideoView
            getStickyPosition={getStickyPosition}
            scroll={scroll}
            videoPosition={videoPosition}
            enabled={linkedInOpen}
            nextContentsView={nextContentsView}
            lectureState={lectureState}
            currentTime={panoptoEmbedPlayerState?.currentTime || 0}
            duration={panoptoEmbedPlayerState?.duration || 0}
            playerState={
              panoptoEmbedPlayerState?.playerState || PlayerState.Paused
            }
          />
        )}
      <LinkedInModal enabled={linkedInOpen} />
    </>
  );
}

export default LectureVideoContainer;
