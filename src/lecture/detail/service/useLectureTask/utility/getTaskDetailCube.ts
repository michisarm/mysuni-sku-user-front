/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  findPersonalCube,
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
    id: '11',
    fileBoxId: '',
    title: '222',
    writer: {
      employeeId: 'Admin',
      email: 'aa@mail.com',
      name: 'Roy',
      companyCode: '',
      companyName: '',
    },
    contents: 'mock 데이터',
    time: 123,
    readCount: '0',
    commentFeedbackId: '',
  };
  //
  if (postParam.id !== '') {
    {
      //TODO. 리스트 api 수정 되면 변경하도록
      const findTaskDetailData = await getTaskDetail(
        postParam.id,
        postParam.type
      );

      if (findTaskDetailData) {
        lectureTaskDetail.id = findTaskDetailData.id;
        lectureTaskDetail.title = findTaskDetailData.title;
        lectureTaskDetail.commentFeedbackId =
          findTaskDetailData.commentFeedbackId;
        lectureTaskDetail.contents = findTaskDetailData.contents;
        return lectureTaskDetail;
      }
    }
  }
}

export async function getTaskDetailCube(postParam: any): Promise<void> {
  // void : return이 없는 경우 undefined

  if (postParam.id !== undefined) {
    // const addflag = !!getLectureTaskItem();
    const taskItem = await getTaskItem(postParam);
    if (taskItem !== undefined) {
      //
      setLectureTaskDetail({ ...taskItem });
    }
  }
}

export async function getTaskLearningCardId(lectureId: string) {
  // void : return이 없는 경우 undefined

  // if (postParam.id !== undefined) {
  // const addflag = !!getLectureTaskItem();
  const taskItem = await getTaskCreateId(lectureId);

  return taskItem;

  // return taskItem
}
