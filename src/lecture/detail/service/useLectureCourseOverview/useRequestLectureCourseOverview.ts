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
  setLectureCourseSatisfaction,
  setLectureCourseFeedbackReview,
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
import { requestLectureSurvey } from '../useLectureSurvey/utility/getLectureSurvey';
import { setLectureSurvey } from 'lecture/detail/store/LectureSurveyStore';

export function useRequestLectureCardOverview() {
  const { cardId } = useParams<LectureParams>();

  useEffect(() => {
    const setData = async function (cardId: string) {
      if (cardId !== undefined) {
        requestLectureCardComment(cardId);
        await requestLectureCardDescription(cardId);
        requestLectureCardFile(cardId);
        requestLectureCardInstructor(cardId);
        requestLectureCardPrecourse(cardId);
        requestLectureCardRelations(cardId);
        requestLectureCardSubcategory(cardId);
        //requestLectureCardReview(cardId);
        requestLectureCardSummary(cardId);
        requestLectureCardTags(cardId);
        requestLectureSurvey();
      }
    };

    setData(cardId);

    return () => {
      setLectureComment();
      setLectureDescription();
      setLectureFile();
      setLectureInstructor();
      setLecturePrecourse();
      setLectureRelations();
      // setLectureReview();
      setLectureSubcategory();
      setLectureCardSummary();
      setLectureTags();
      setLectureSurvey();
      setLectureCourseSatisfaction();
      setLectureCourseFeedbackReview();
    };
  }, [cardId]);
}
