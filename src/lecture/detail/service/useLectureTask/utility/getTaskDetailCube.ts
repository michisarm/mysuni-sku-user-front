/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  deleteTaskPost,
  getCommentFeedbackId,
  getTaskCreateId,
} from 'lecture/detail/api/mPersonalCubeApi';
import {
  setLectureTaskDetail,
  // setLectureChildTaskItem,
} from 'lecture/detail/store/LectureTaskStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import { findPost, findPostBody } from '../../../api/cubeApi';

async function getTaskItem(postParam: any) {
  const lectureTaskDetail: LectureTaskDetail = {
    id: '',
    fileBoxId: '',
    title: '',
    name: '',
    writer: {
      employeeId: '',
      email: '',
      name: '',
      companyCode: '',
      companyName: '',
    },
    contents: '',
    time: 0,
    readCount: 0,
    commentFeedbackId: '',
    notice: false,
  };
  //
  if (postParam.id !== '' && postParam.type === 'parent') {
    const post = await findPost(postParam.id);
    const postBody = await findPostBody(postParam.id);
    if (post !== undefined) {
      lectureTaskDetail.id = post.id;
      lectureTaskDetail.title = post.title;
      lectureTaskDetail.name = post.writer;
      lectureTaskDetail.time = post.time;
      lectureTaskDetail.commentFeedbackId = post.commentFeedbackId;
      lectureTaskDetail.readCount = post.readCount;
    }
    if (postBody !== undefined) {
      lectureTaskDetail.contents = postBody.contents;
      lectureTaskDetail.fileBoxId = postBody.fileBoxId;
    }
    return lectureTaskDetail;
  }

  return lectureTaskDetail;
}

export async function getTaskDetailCube(postParam: any): Promise<void> {
  if (postParam && postParam.id !== undefined) {
    const taskItem = await getTaskItem(postParam);
    if (taskItem !== undefined) {
      setLectureTaskDetail({ ...taskItem });
    }
  }
}

export async function getTaskLearningCardId(lectureId: string) {
  const taskItem = await getTaskCreateId(lectureId);
  return taskItem;
}

export async function deleteLectureTaskPost(id: string, type: string) {
  const deleteItem = await deleteTaskPost(id, type);
  return deleteItem;
}
