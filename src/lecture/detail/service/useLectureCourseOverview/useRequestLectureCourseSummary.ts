/* eslint-disable consistent-return */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setLectureCardSummary } from '../../store/LectureOverviewStore';
import LectureParams from '../../viewModel/LectureParams';
import { requestLectureCardSummary } from '../useLectureSummary/utility/requestLectureCardSummary';

export function useRequestLectureCourseSummary() {
  const { cardId } = useParams<LectureParams>();

  useEffect(() => {
    if (cardId !== undefined) {
      requestLectureCardSummary(cardId);
    }

    return () => {
      setLectureCardSummary();
    };
  }, [cardId]);
}
