import { axiosApi } from '@nara.platform/accent';

import CommentCountRdo from '../model/CommentCountRdo';
import ReviewSummary from '../model/ReviewSummary';
import FeedbackContent from '../viewModel/LectureFeedbackContent';

const BASE_URL = '/api/feedback';

// http://localhost:3000/api/feedback/reviews/summary/da3c9508-3c2f-44c1-b9c6-b39e1f92eb6e

export function countByFeedbackId(
  feedbackId: string
): Promise<CommentCountRdo> {
  const url = `${BASE_URL}/comments/count?feedbackId=${feedbackId}`;
  return axiosApi
    .get<CommentCountRdo>(url)
    .then(response => response && response.data);
}

export function findReviewSummary(feedbackId: string): Promise<ReviewSummary> {
  const url = `${BASE_URL}/reviews/summary/${feedbackId}`;
  return axiosApi
    .get<ReviewSummary>(url)
    .then(response => response && response.data);
}

// LMS Feedback 콘텐츠
export function findFeedbackMenu(feedbackId: string): Promise<FeedbackContent> {
  const url = `${BASE_URL}/feedback/${feedbackId}/discussion`;
  console.log('api호출');
  return axiosApi
    .get<FeedbackContent>(url)
    .then(response => response && response.data);
}
