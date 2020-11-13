/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  deleteTaskPost,
  findFileBox,
  findPersonalCube,
  getCommentFeedbackId,
  getTaskCreateId,
  getTaskDetail,
} from 'lecture/detail/api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import {
  setLectureTaskDetail,
  // setLectureChildTaskItem,
} from 'lecture/detail/store/LectureTaskStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';

function getPersonalCubeByParams(cubeId: string): Promise<PersonalCube> {
  return findPersonalCube(cubeId);
}

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
    notice: false
  };
  //
  if (postParam.id !== '') {
    {
      const findTaskDetailData = await getTaskDetail(
        postParam.id,
        postParam.type
      );

      if (postParam.type === 'child') {
        const replyData = await getCommentFeedbackId(
          findTaskDetailData.commentFeedbackId
        );
      }

      if (findTaskDetailData) {
        if (findTaskDetailData.post) {
          lectureTaskDetail.id = findTaskDetailData.post.id;
          lectureTaskDetail.title = findTaskDetailData.post.title;
          lectureTaskDetail.name = findTaskDetailData.post.writer;
          lectureTaskDetail.time = findTaskDetailData.post.time;
          lectureTaskDetail.commentFeedbackId =
            findTaskDetailData.post.commentFeedbackId;
          lectureTaskDetail.readCount = findTaskDetailData.post.readCount;
        } else {
          lectureTaskDetail.id = findTaskDetailData.id;
          lectureTaskDetail.title = findTaskDetailData.title;
          lectureTaskDetail.name = findTaskDetailData.writer;
          lectureTaskDetail.time = findTaskDetailData.time;
          lectureTaskDetail.commentFeedbackId =
            findTaskDetailData.commentFeedbackId;
          lectureTaskDetail.readCount = findTaskDetailData.readCount;
        }
        if (findTaskDetailData.postBody) {
          lectureTaskDetail.contents = findTaskDetailData.postBody.contents;
          lectureTaskDetail.fileBoxId = findTaskDetailData.postBody.fileBoxId;
        } else {
          lectureTaskDetail.contents = findTaskDetailData.contents;
          lectureTaskDetail.fileBoxId = findTaskDetailData.fileBoxId;
        }
        return lectureTaskDetail;
      }
    }
  }
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
