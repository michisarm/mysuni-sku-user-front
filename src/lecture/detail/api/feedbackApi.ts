import { axiosApi } from '@nara.platform/accent';

import CommentCountRdo from '../model/CommentCountRdo';

const BASE_URL = '/api/feedback';

export function countByFeedbackId(
  feedbackId: string
): Promise<CommentCountRdo> {
  const url = `${BASE_URL}/comments/count?feedbackId=${feedbackId}`;
  return axiosApi
    .get<CommentCountRdo>(url)
    .then(response => response && response.data);
}
