import { axiosApi } from '@nara.platform/accent';
import Media from '../../model/Media';
import OfficeWeb from '../model/OfficeWeb';
import Transcript from '../model/Transcript';
import Task from '../model/Task';
import TaskChild from '../model/TaskChild';
import TaskDetail from '../model/TaskDetail';
import CommentCountRdo from '../model/CommentCountRdo';
import TaskDetailBody from '../model/TaskDetailBody';
import { ClassroomModel } from '../../../personalcube/classroom/model';
import { AxiosResponse } from 'axios';
import TranscriptCountModel from '../model/TranscriptCountModel';
import { findPost, findPostBody } from './cubeApi';

const BASE_URL = '/api/cube';
const FEEDBACK_URL = '/api/feedback';

function AxiosReturn<T>(response: AxiosResponse<T>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === null ||
    (response.data as unknown) === ''
  ) {
    return undefined;
  }
  return response.data;
}
export function findAllTranscript(deliveryId: string, locale: string) {
  return axiosApi
    .get<Transcript[]>(`${BASE_URL}/transcripts/${deliveryId}/${locale}`)
    .then((response) => response && response.data);
}

export function findTranscriptCount(deliveryId: string) {
  return axiosApi
    .get<TranscriptCountModel>(`${BASE_URL}/transcripts/countAll/${deliveryId}`)
    .then((response) => response && response.data);
}

export function findMedia(mediaId: string) {
  return axiosApi
    .get<Media>(`${BASE_URL}/medias/${mediaId}`)
    .then((response) => response && response.data);
}

export function findOfficeWeb(officeWebId: string) {
  const url = `${BASE_URL}/officewebs/${officeWebId}`;
  return axiosApi
    .get<OfficeWeb>(url)
    .then((response) => response && response.data);
}

export function findTask(
  boardId: string,
  offset: number,
  limit: number,
  tabType: string,
  sort?: string,
  deleted?: boolean
): Promise<Task> {
  let url = '';
  if (tabType === 'Posts') {
    // url = `${BASE_URL}/posts/byBoardId?boardId=${boardId}&offset=${offset}&limit=${limit}`;
    url = `${BASE_URL}/posts/byBoardId?boardId=${boardId}&deleted=${false}&offset=${offset}&limit=${limit}&sort=${sort}`;
  } else {
    url = `${BASE_URL}/posts/myByBoardId?boardId=${boardId}&offset=${offset}&limit=${limit}`;
  }
  return axiosApi.get<Task>(url).then((response) => {
    return response && response.data;
  });
}

export function findTaskChild(idArr: string[]): Promise<TaskChild> {
  const url = `${BASE_URL}/replies/byPostIdIn`;
  return axiosApi.post<TaskChild>(url, idArr).then((response) => {
    const arr: any = [];
    arr.results = response.data;
    return response && arr;
  });
}

export function findTaskCommentCount(
  idArr: string[]
): Promise<CommentCountRdo[]> {
  const url = `${FEEDBACK_URL}/comments/count`;
  return axiosApi.post<CommentCountRdo[]>(url, idArr).then((response) => {
    const arr: any = [];
    arr.results = response.data;
    return response && arr.results;
  });
}

export function getCommentFeedbackId(commentFeedbackId: string): Promise<any> {
  const url = `${FEEDBACK_URL}/feedback/${commentFeedbackId}/comment`;
  return axiosApi.get<any>(url).then((response) => {
    return response;
  });
}

export function getTaskDetailBody(postId: string): Promise<TaskDetailBody> {
  const url = `${BASE_URL}/posts/${postId}`;
  return axiosApi.get<TaskDetailBody>(url).then((response) => {
    return response && response.data;
  });
}

export function getTaskCreateId(lectureId: string): Promise<any> {
  const url = `${BASE_URL}/personalcubes/${lectureId}`;
  return axiosApi.get<any>(url).then((response) => {
    return response && response.data;
  });
}

export function deleteTaskPost(
  boardId: string,
  postId: string,
  postType: string
): Promise<any> {
  const url = `${BASE_URL}/posts/${postId}/${boardId}`;
  const replyUrl = `${BASE_URL}/replies/${postId}/${boardId}`;
  if (postType === 'parent') {
    return axiosApi.delete(url);
  } else {
    return axiosApi.delete(replyUrl);
  }
}

export function findFileBox(depotIds: string) {
  return axiosApi
    .get<string>(
      '/api/depot/depotFile/multiple' +
        `?depotIds=%255B%2522${depotIds}%2522%255D`
    )
    .then((response) => (response && response.data) || null);
}

export function findClassrooms(cubeId: string) {
  const url = `${BASE_URL}/classroomgroups/flow/classroomview/${cubeId}`;
  return axiosApi
    .get<ClassroomModel[]>(url)
    .then((response) => response && response.data);
}
