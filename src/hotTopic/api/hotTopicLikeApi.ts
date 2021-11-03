import { axiosApi } from '@nara.platform/accent';

const BASE_URL = '/api/feedback';

export function countLikeByFeedbackId(feedbackId: string): Promise<number> {
  const url = `${BASE_URL}/likes/count?feedbackId=${feedbackId}`;
  return axiosApi
    .get<number>(url)
    .then((response) => response && response.data);
}

interface MyLikeModel {
  denizenId: string;
  feedbackId: string;
  id: string;
  time: number;
}

export function findMyLikeByFeedbackId(
  feedbackId: string
): Promise<MyLikeModel | string | undefined> {
  const url = `${BASE_URL}/likes/my?feedbackId=${feedbackId}`;
  return axiosApi
    .get<MyLikeModel | string | undefined>(url)
    .then((response) => response && response.data);
}

export function likeByFeedbackId(feedbackId: string): Promise<string> {
  const url = `${BASE_URL}/likes?feedbackId=${feedbackId}`;
  return axiosApi
    .post<string>(url)
    .then((response) => response && response.data);
}

export function unlikeByFeedbackId(feedbackId: string): Promise<void> {
  const url = `${BASE_URL}/likes/${feedbackId}`;
  return axiosApi.delete(url).then((response) => response && response.data);
}
