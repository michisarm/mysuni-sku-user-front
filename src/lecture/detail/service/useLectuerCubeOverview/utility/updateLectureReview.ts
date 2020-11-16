import { findReviewSummary } from "../../../api/feedbackApi";
import { getLectureReview, setLectureReview } from "../../../store/LectureOverviewStore";

export async function updateLectureReview() {
  const lectureReview = getLectureReview();
  if (lectureReview === undefined) {
    return;
  }
  const reviewSummary = await findReviewSummary(lectureReview.id);
  if (
    reviewSummary !== null &&
    reviewSummary !== undefined &&
    reviewSummary.average !== undefined
  ) {
    setLectureReview({ average: reviewSummary.average, id: reviewSummary.id });
  }
}