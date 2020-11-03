import { getTaskDetailCube, getTaskLearningCardId } from './getTaskDetailCube';
/* eslint-disable consistent-return */

export async function getCubeLectureTaskDetail(postParam: any): Promise<void> {
  await getTaskDetailCube(postParam);
}

export function getCubeLectureTaskLearningCardId(lectureId: string) {
  console.log('카드아이디');
  const test = getTaskLearningCardId(lectureId);

  return test;
}
