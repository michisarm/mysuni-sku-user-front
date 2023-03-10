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
let isFirstEntry = true;

function LectureVideoContainer() {
  const lectureMedia = useLectureMedia();
  const [linkedInOpen, setLinkedInOpen] = useState<boolean>(false);
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);
  const [surveyAlerted, setSurveyAlerted] = useState<boolean>(false);
  const [entryLearningState, setEntryLearningState] = useState<LearningState>();
  const lectureState = useLectureState();
  const panoptoEmbedPlayerState = usePanoptoEmbedPlayerState();
  const history = useHistory();
  const params = useLectureParams();

  const callVideoNearEnded = useCallback(() => {
    setNextContentsView(true);
  }, []);

  useEffect(() => {
    return () => {
      isFirstEntry = true;
      setEntryLearningState(undefined);
    };
  }, [params?.cubeId]);

  useEffect(() => {
    if (lectureState === undefined) {
      return;
    }
    if (isFirstEntry) {
      setEntryLearningState(lectureState.student?.learningState);
      isFirstEntry = false;
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
    if (entryLearningState === undefined) {
      return;
    }

    const removeCallRegisterReplayWatchLog = addOnProgressEventHandler(
      createOnProgressEventHandler(
        callRegisterReplayWatchLog,
        (lastActionTime, state) => {
          return (
            entryLearningState === 'Passed' &&
            state.playerState === PlayerState.Playing &&
            lastActionTime + 60000 < Date.now()
          );
        }
      )
    );

    return () => {
      removeCallRegisterReplayWatchLog();
    };
  }, [entryLearningState]);

  useEffect(() => {
    // fixed: playerState ????????? api?????? > ?????? cube?????? ???????????? api?????? ?????? ??????
    // if (panoptoEmbedPlayerState?.playerState === undefined) {
    //   return;
    // }
    // callConfirmProgress(panoptoEmbedPlayerState);
  }, [panoptoEmbedPlayerState?.playerState]);

  useEffect(() => {
    // if (panoptoEmbedPlayerState?.playerState === undefined) {
    //   return;
    // }
    // ???????????? ????????? ??????????????? ????????? ????????? ???????????? ?????????
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
            title: getPolyglotText('Survey', 'Collage-Video-??????'),
            message: getPolyglotText(
              'Survey??? ??????????????????.',
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
    // ???????????? ?????? param = patronKeyString, state, lectureId
    // state = start:??????, ?????? end:??????
    // lectureId = ???????????? ID
    retMultiVideoOverlap(viewState, usid).then((res: any) => {
      setLiveLectureCardId(res);
      if (viewState !== 'end') {
        if (!res || (res === 'false' && res !== preliveLectureId)) {
          reactAlert({
            title: getPolyglotText('??????', 'Collage-Video-??????'),
            message: getPolyglotText(
              '?????? ?????? ????????? ???????????? ????????????.<br>?????? ????????? ????????? ??? ????????? ????????? ????????????.',
              'Collage-Video-????????????'
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
      //?????? ????????? ?????? ?????? signal
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
      //?????? ????????? ?????? ?????? signal
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

  // ????????? ????????? ??????
  const [scroll, setScroll] = useState<number>(0);
  const [videoPosition, setVideoPosition] = useState<number>(0);

  // ????????? ????????? ??????
  useEffect(() => {
    const onScroll = () => setScroll(window.pageYOffset);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // video ?????? ??????
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
            title: '??????',
            message:
              '?????? ???????????? ????????? ?????? ????????? ??? ?????? ???????????? ??? ????????????.',
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
