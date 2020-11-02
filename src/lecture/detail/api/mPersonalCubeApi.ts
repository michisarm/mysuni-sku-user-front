import { axiosApi } from '@nara.platform/accent';
import CubeIntro from '../model/CubeIntro';
import Media from '../model/Media';
import OfficeWeb from '../model/OfficeWeb';
import PersonalCube from '../model/PersonalCube';
import Transcript from '../model/Transcript';
import Task from '../model/Task';
import TaskChild from '../model/TaskChild';
import TaskDetail from '../model/TaskDetail';
import CommentCountRdo from '../model/CommentCountRdo';
import TaskDetailBody from '../model/TaskDetailBody';

const BASE_URL = '/api/personalCube';
const FEEDBACK_URL = '/api/feedback';

export function findPersonalCube(
  personalCubeId: string
): Promise<PersonalCube> {
  const url = `${BASE_URL}/personalcubes/${personalCubeId}`;
  return axiosApi
    .get<PersonalCube>(url)
    .then(response => response && response.data);
}

export function findCubeIntro(cubeIntroId: string): Promise<CubeIntro> {
  const url = `${BASE_URL}/cubeintros/${cubeIntroId}`;
  return axiosApi
    .get<CubeIntro>(url)
    .then(response => response && response.data);
}

export function findAllTranscript(deliveryId: string, locale: string) {
  return axiosApi
    .get<Transcript[]>(`${BASE_URL}/transcripts/${deliveryId}/${locale}`)
    .then(response => response && response.data);
}

export function findMedia(mediaId: string) {
  return axiosApi
    .get<Media>(`${BASE_URL}/medias/${mediaId}`)
    .then(response => response && response.data);
}

export function findOfficeWeb(officeWebId: string) {
  const url = `${BASE_URL}/officewebs/${officeWebId}`;
  return axiosApi
    .get<OfficeWeb>(url)
    .then(response => response && response.data);
}

export function findTask(
  boardId: string,
  offset: number,
  limit: number
): Promise<Task> {
  //시작점
  const url = `${BASE_URL}/posts/byBoardId?boardId=${boardId}&offset=${offset}&limit=${limit}`;
  return axiosApi.get<Task>(url).then(response => {
    return response && response.data;
  });
}

export function findTaskChild(idArr: string[]): Promise<TaskChild> {
  const url = `${BASE_URL}/replies/byPostIdIn`;
  return axiosApi.post<TaskChild>(url, idArr).then(response => {
    const arr: any = [];
    arr.results = response.data;
    return response && arr;
  });
}

export function findTaskCommentCount(
  idArr: string[]
): Promise<CommentCountRdo[]> {
  const url = `${FEEDBACK_URL}/comments/count`;
  return axiosApi.post<CommentCountRdo[]>(url, idArr).then(response => {
    const arr: any = [];
    arr.results = response.data;
    return response && arr.results;
  });
}

export function getTaskDetail(
  postId: string,
  postType: string
): Promise<TaskDetail> {
  const url = `${BASE_URL}/posts/${postId}`;
  const replyUrl = `${BASE_URL}/replies/${postId}`;
  if (postType === 'parent') {
    return axiosApi.get<TaskDetail>(url).then(response => {
      return response && response.data;
    });
  } else {
    return axiosApi.get<TaskDetail>(replyUrl).then(response => {
      return response && response.data;
    });
  }
}

export function getTaskDetailBody(postId: string): Promise<TaskDetailBody> {
  const url = `${BASE_URL}/posts/${postId}`;
  return axiosApi.get<TaskDetailBody>(url).then(response => {
    return response && response.data;
  });
}

export function getTaskCreateId(): Promise<any> {
  const url = `${BASE_URL}/course/learning/LEARNING-CARD-xl/${postId}`;
  return axiosApi.get<TaskDetailBody>(url).then(response => {
    return response && response.data;
  });
}
