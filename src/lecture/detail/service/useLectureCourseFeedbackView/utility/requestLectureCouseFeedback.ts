import { parseInt } from 'lodash';
import {
  setLectureCourseSatisfaction,
  setLectureCourseFeedbackReview,
} from 'lecture/detail/store/LectureOverviewStore';
import {
  findAnswerSheetBySurveyCaseId,
  findReviewSummary,
  findSurveySummaryBySurveyCaseIdAndRound,
} from 'lecture/detail/api/surveyApi';

import LectureSurvey from 'lecture/detail/viewModel/LectureSurvey';
import { findProfilePhoto } from 'layout/UserApp/api/ProfileInfoAPI';
import { getProfileImage } from 'community/ui/app.formatters';

import { getLectureSurveyAnswerSheet } from 'lecture/detail/store/LectureSurveyStore';

export async function requestLectureCouseFeedback(
  lectureSurvey: LectureSurvey
) {
  if (lectureSurvey === undefined) {
    return;
  }
  const answerSheet = getLectureSurveyAnswerSheet();

  const lectureSurveySummary = await findSurveySummaryBySurveyCaseIdAndRound(
    lectureSurvey.surveyCaseId,
    answerSheet?.round || 1
  );

  if (lectureSurveySummary === undefined || lectureSurveySummary === null) {
    return;
  }

  const feedback = await findReviewSummary(lectureSurveySummary.id);
  if (feedback === undefined) {
    return;
  }

  if (feedback.reviewAnswers === undefined) {
    return;
  }

  const reviewAnswerArray = feedback.reviewAnswers || [];

  Promise.all(
    reviewAnswerArray.map(async (item) => {
      const feedbackReviewProfile = await findProfilePhoto([item.denizenId]);
      const profileImage = getProfileImage(
        feedbackReviewProfile[0].photoImagePath,
        feedbackReviewProfile[0].gdiPhotoImagePath,
        feedbackReviewProfile[0].useGdiPhoto
      );
      return {
        completeTime: item.completeTime,
        denizenId: feedbackReviewProfile[0].id,
        id: item.id,
        itemNumber: item.itemNumber,
        registeredTime: item.registeredTime,
        sentence: item.sentence,
        surveyCaseId: item.surveyCaseId,
        name: feedbackReviewProfile[0]?.name,
        nickName: feedbackReviewProfile[0]?.nickname,
        profileImage,
      };
    })
  ).then((nextFeedbackReviewProfile) =>
    setLectureCourseFeedbackReview(nextFeedbackReviewProfile)
  );

  if (feedback.reviewAnswerNumberSummary === undefined) {
    return;
  }

  const totalObject = feedback.reviewAnswerNumberSummary?.numberCountMap || {};
  if (!(1 in totalObject)) {
    Object.assign(totalObject, { 1: 0 });
  }
  if (!(2 in totalObject)) {
    Object.assign(totalObject, { 2: 0 });
  }
  if (!(3 in totalObject)) {
    Object.assign(totalObject, { 3: 0 });
  }
  if (!(4 in totalObject)) {
    Object.assign(totalObject, { 4: 0 });
  }
  if (!(5 in totalObject)) {
    Object.assign(totalObject, { 5: 0 });
  }

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
