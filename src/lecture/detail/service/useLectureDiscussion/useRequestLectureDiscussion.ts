import { useEffect } from 'react';
import { setLectureDiscussion } from '../../store/LectureDiscussionStore';
import { useLectureParams } from '../../store/LectureParamsStore';
import { requestLectureDiscussion } from './utility/requestLectureDiscussion';

export function useRequestLectureDiscussion() {
  const params = useLectureParams();

  useEffect(() => {
    if (params?.cardId === undefined || params?.discussionId === undefined) {
      return;
    }
    requestLectureDiscussion(params.cardId, params.discussionId);
    return setLectureDiscussion;
  }, [params?.cardId, params?.discussionId]);
}
