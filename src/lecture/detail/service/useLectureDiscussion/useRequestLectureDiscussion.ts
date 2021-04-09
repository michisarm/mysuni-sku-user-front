import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setLectureDiscussion } from '../../store/LectureDiscussionStore';
import { useLectureParams } from '../../store/LectureParamsStore';
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
