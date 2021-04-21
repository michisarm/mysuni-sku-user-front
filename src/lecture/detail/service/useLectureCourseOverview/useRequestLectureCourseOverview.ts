/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  setInMyLectureCdo,
  setLectureComment,
  setLectureCardSummary,
  setLectureDescription,
  setLectureFile,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureRelations,
  setLectureReview,
  setLectureSubcategory,
  setLectureTags,
} from '../../store/LectureOverviewStore';
import LectureParams from '../../viewModel/LectureParams';
import { clearFindCardCache } from '../../api/cardApi';
import { requestLectureCardComment } from '../useLectureComment/utility/requestLectureCardComment';
import { requestLectureCardDescription } from '../useLectureDescription/utility/requestLectureCardDescription';
import { requestLectureCardFile } from '../useLectureFile/utility/requestLectureCardFile';
import { requestLectureCardInstructor } from '../useLectureInstructor/utility/requestLectureCardInstructor';
import { requestLectureCardPrecourse } from '../useLecturePrecourse/utility/requestLectureCardPrecourse';
import { requestLectureCardRelations } from '../useLectureRelations/utility/requestLectureCardRelations';
import { requestLectureCardReview } from '../useLectureReview/utility/requestLectureCardReview';
import { requestLectureCardSubcategory } from '../useLectureSubcategory/utility/requestLectureCardSubcategory';
import { requestLectureCardSummary } from '../useLectureSummary/utility/requestLectureCardSummary';
import { requestLectureCardTags } from '../useLectureTags/utility/requestLectureCardTags';

export function useRequestLectureCardOverview() {
  const { cardId } = useParams<LectureParams>();

  useEffect(() => {
    if (cardId !== undefined) {
      requestLectureCardComment(cardId);
      requestLectureCardDescription(cardId);
      requestLectureCardFile(cardId);
      requestLectureCardInstructor(cardId);
      requestLectureCardPrecourse(cardId);
      requestLectureCardRelations(cardId);
      requestLectureCardReview(cardId);
      requestLectureCardSubcategory(cardId);
      requestLectureCardSummary(cardId);
      requestLectureCardTags(cardId);
    }

    return () => {
      clearFindCardCache();
      setLectureComment();
      setLectureDescription();
      setLectureFile();
      setLectureInstructor();
      setLecturePrecourse();
      setLectureRelations();
      setLectureReview();
      setLectureSubcategory();
      setLectureCardSummary();
      setLectureTags();
    };
  }, [cardId]);
}
