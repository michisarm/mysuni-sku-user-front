import {
  deleteLectureTaskPost,
  getTaskDetailCube,
  getTaskLearningCardId,
} from './getTaskDetailCube';
/* eslint-disable consistent-return */

export async function getCubeLectureTaskDetail(postParam: any): Promise<void> {
  await getTaskDetailCube(postParam);
}

export function getCubeLectureTaskLearningCardId(lectureId: string) {
  const cardId = getTaskLearningCardId(lectureId);
  return cardId;
}

export function deleteCubeLectureTaskPost(id: string, type: string) {
  const test = deleteLectureTaskPost(id, type);

  return test;
}
