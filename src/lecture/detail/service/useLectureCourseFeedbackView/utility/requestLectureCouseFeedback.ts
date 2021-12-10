import {
  setLectureCourseSatisfaction,
  setLectureCourseFeedbackReview,
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

  const isDoneSurvey = answerSheet?.progress === 'Complete';
  console.log('lectureSurvey.surveyCaseId', lectureSurvey.surveyCaseId);
  console.log('lectureSurveySummary', lectureSurveySummary);
  if (lectureSurveySummary !== undefined || null) {
    const feedback = await findReviewSummary(lectureSurveySummary.id);

    if (feedback === undefined) {
      return;
    }

    const feedbackDenizenIds = feedback.reviewAnswers.map((i) => {
      return i.denizenId;
    });
    console.log(feedbackDenizenIds, 'feedbackDenizenIds');
    const feedbackReviewProfile = await findProfilePhoto([
      'r6zu@ne1-m2',
      'r57s@ne1-m2', //feedbackDenizenIds
    ]);

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

      setLectureCourseFeedbackReview([
        ...nextFeedbackReviewProfile,
        ...nextFeedbackReviewProfile,
      ]);
    }

    const { summaryItems } = feedback.answerSummary;
    const totalObject = summaryItems.numberCountMap || {};

    const totalValues = Object.values(totalObject).reverse() || [0];

    const totalCount =
      totalValues.reduce((totalCount, count) => {
        return totalCount + (count || 0);
      }, 0) || 0;

    setLectureCourseSatisfaction({
      AnswerSummaries: feedback.answerSummary,
      totalValues,
      totalCount,
      surveyCaseId: lectureSurvey.surveyCaseId,
      isDoneSurvey,
    });
  }
}
