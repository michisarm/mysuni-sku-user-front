import { parseInt } from 'lodash';
import {
  setLectureCourseSatisfaction,
  setLectureCourseFeedbackReview,
  getLectureCoureSFeedbackReview,
} from 'lecture/detail/store/LectureOverviewStore';
import {
  findReviewSummary,
  findSurveySummaryBySurveyCaseIdAndRound,
  findAnswerSheetBySurveyCaseId,
} from 'lecture/detail/api/surveyApi';

import LectureSurvey from 'lecture/detail/viewModel/LectureSurvey';
import { findProfilePhoto } from 'layout/UserApp/api/ProfileInfoAPI';
import { getProfileImage } from 'community/ui/app.formatters';

export async function requestLectureCouseFeedback(
  lectureSurvey: LectureSurvey
) {
  if (lectureSurvey === undefined) {
    return;
  }
  const answerSheet = await findAnswerSheetBySurveyCaseId(
    lectureSurvey.surveyCaseId
  );
  const lectureSurveySummary = await findSurveySummaryBySurveyCaseIdAndRound(
    lectureSurvey.surveyCaseId,
    answerSheet?.round || 1
  );

  if (lectureSurveySummary !== undefined || null) {
    const feedback = await findReviewSummary(lectureSurveySummary.id);
    if (feedback === undefined) {
      return;
    }

    if (feedback.reviewAnswers !== undefined) {
      const feedbackDenizenIds = feedback.reviewAnswers.map((i) => {
        return i.denizenId;
      });
      const feedbackReviewProfile = await findProfilePhoto(feedbackDenizenIds);

      if (feedback.reviewAnswers !== undefined) {
        const nextFeedbackReviewProfile = feedback.reviewAnswers.map(
          (item, i) => {
            const profileImage = getProfileImage(
              feedbackReviewProfile[i].photoImagePath,
              feedbackReviewProfile[i].gdiPhotoImagePath,
              feedbackReviewProfile[i].useGdiPhoto
            );
            return {
              completeTime: item.completeTime,
              denizenId: feedbackReviewProfile[i].id, //item.denizenId,
              id: item.id,
              itemNumber: item.itemNumber,
              registeredTime: item.registeredTime,
              sentence: item.sentence,
              surveyCaseId: item.surveyCaseId,
              name: feedbackReviewProfile[i]?.name,
              nickName: feedbackReviewProfile[i]?.nickname,
              profileImage,
            };
          }
        );

        setLectureCourseFeedbackReview(nextFeedbackReviewProfile);
      }
    }
    if (feedback.reviewAnswerNumberSummary !== undefined) {
      const { numberCountMap } = feedback.reviewAnswerNumberSummary;
      const totalObject = numberCountMap || {};
      const isDoneSurvey = answerSheet?.progress === 'Complete';
      const reversedValues = Object.values(totalObject).reverse() || [0];
      const totalCount =
        reversedValues.reduce((totalCount, count) => {
          return totalCount + (count || 0);
        }, 0) || 0;

      const average = getAverage(totalObject, totalCount);

      setLectureCourseSatisfaction({
        AnswerSummaries: feedback.reviewAnswerNumberSummary,
        reversedValues,
        totalCount,
        average,
        surveyCaseId: lectureSurvey.surveyCaseId,
        isDoneSurvey,
      });
    }
  }
}

function getAverage(object: Record<number, number>, totalCount: number) {
  const questionNumber = Object.keys(object).map((i) => parseInt(i));
  const values = Object.values(object);
  const sumOfValues =
    questionNumber.reduce((sum, count, index) => {
      const value = values[index] * questionNumber[index];
      return sum + value;
    }, 0) || 0;
  return sumOfValues / totalCount || 0;
}
