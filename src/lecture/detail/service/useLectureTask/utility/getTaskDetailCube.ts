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
import { findPost, findPostBody, getReply } from '../../../api/cubeApi';
import SkProfileApi from '../../../../../../src/profile/present/apiclient/SkProfileApi';

async function getTaskItem(postParam: any) {
  const lectureTaskDetail: LectureTaskDetail = {
    id: '',
    postId: '',
    fileBoxId: '',
    title: '',
    name: '',
    writer: {
      employeeId: '',
      email: '',
      name: null,
      companyCode: '',
      companyName: null,
    },
    contents: '',
    time: 0,
    readCount: 0,
    commentFeedbackId: '',
    notice: false,
    pinned: 0, // postpinned -> number = 0
    writerPatronKeyString: '',
  };
  //
  if (postParam.id !== '' && postParam.type === 'parent') {
    const post = await findPost(postParam.id);
    const result = await findPostBody(postParam.id);

    if (post !== undefined) {
      let writerName = '';

      if (post.patronKey && post.patronKey.keyString !== '') {
        const writerProfile = await SkProfileApi.instance.findProfiles([
          post.patronKey.keyString,
        ]);
        if (writerProfile && writerProfile.length > 0) {
          writerName = writerProfile[0].nickName;
        }
      }

      lectureTaskDetail.id = post.id;
      lectureTaskDetail.title = post.title;
      lectureTaskDetail.name = writerName || post.writer;
      lectureTaskDetail.time = post.registeredTime;
      lectureTaskDetail.commentFeedbackId = post.commentFeedbackId;
      lectureTaskDetail.readCount = post.readCount;
      lectureTaskDetail.pinned = post.pinned;
      lectureTaskDetail.writerPatronKeyString = post.patronKey.keyString;
    }
    if (result !== undefined && result.postBody !== undefined) {
      lectureTaskDetail.contents = result.postBody.contents;
      lectureTaskDetail.fileBoxId = result.postBody.fileBoxId;
    }
    return lectureTaskDetail;
  }

  if (postParam.id !== '' && postParam.type === 'child') {
    const post = await getReply(postParam.id);

    if (post !== undefined) {
      let writerName = '';

      if (post.patronKey && post.patronKey.keyString !== '') {
        const writerProfile = await SkProfileApi.instance.findProfiles([
          post.patronKey.keyString,
        ]);
        if (writerProfile && writerProfile.length > 0) {
          writerName = writerProfile[0].nickName;
        }
      }

      lectureTaskDetail.id = post.id;
      lectureTaskDetail.postId = post.postId;
      lectureTaskDetail.title = post.title;
      lectureTaskDetail.name = writerName || post.writer;
      lectureTaskDetail.time = post.time;
      lectureTaskDetail.commentFeedbackId = post.commentFeedbackId;
      lectureTaskDetail.readCount = post.readCount;
      lectureTaskDetail.contents = post.contents;
      lectureTaskDetail.fileBoxId = post.fileBoxId;
      lectureTaskDetail.writerPatronKeyString = post.patronKey.keyString;
    }
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

export async function deleteLectureTaskPost(
  boardId: string,
  taskId: string,
  type: string
) {
  const deleteItem = await deleteTaskPost(boardId, taskId, type);
  return deleteItem;
}
