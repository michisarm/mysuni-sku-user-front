import { axiosApi } from '@nara.platform/accent';

import CommentCountRdo from '../model/CommentCountRdo';
import ReviewSummary from '../model/ReviewSummary';

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
