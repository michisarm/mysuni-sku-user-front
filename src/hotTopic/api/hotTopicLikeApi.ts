import { axiosApi } from '@nara.platform/accent';
import LikeRdo from '../../lecture/detail/model/LikeRdo';
import LikeModel from '../../lecture/detail/model/LikeModel';

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

export function countAllLikeByFeedbackId(
  feedbackIds: string[]
): Promise<LikeRdo[]> {
  //
  const url = `${BASE_URL}/likes/count/list`;
  return axiosApi
    .post(url, feedbackIds)
    .then((response) => response && response.data);
}

export function findAllLikeByFeedbackIds(
  feedbackIds: string[]
): Promise<LikeModel[]> {
  //
  const url = `${BASE_URL}/likes/my/list`;
  return axiosApi
    .post(url, feedbackIds)
    .then((response) => response && response.data);
}
