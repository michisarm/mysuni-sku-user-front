import { findFeedbackMenu } from 'lecture/detail/api/feedbackApi';
import { setLectureFeedbackContent } from 'lecture/detail/store/LectureFeedbackStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  setLectureDiscussion,
  useLectureDiscussion,
} from '../../store/LectureDiscussionStore';
import LectureParams from '../../viewModel/LectureParams';
import { requestLectureDiscussion } from './utility/requestLectureDiscussion';

export function useRequestLectureDiscussion() {
  const params = useParams<LectureParams>();

  useEffect(() => {
    if (params?.cardId === undefined || params?.contentId === undefined) {
      return;
    }

    requestLectureDiscussion(params.cardId, params.contentId);
    return setLectureDiscussion;
  }, [params?.cardId, params?.contentId]);
}

export function useRequestLectureFeedbackContent() {
  const lectureDiscussion = useLectureDiscussion();
  useEffect(() => {
    if (lectureDiscussion?.id === undefined) {
      return;
    }
    requestLectureFeedbackContent(lectureDiscussion.id);
  }, [lectureDiscussion?.id]);
}

export function requestLectureFeedbackContent(lectureDiscussionId: string) {
  findFeedbackMenu(lectureDiscussionId).then((result) => {
    setLectureFeedbackContent({
      ...result,
    });
  });
}
