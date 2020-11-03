import { getTaskDetailCube, getTaskLearningCardId } from './getTaskDetailCube';
/* eslint-disable consistent-return */

export async function getCubeLectureTaskDetail(postParam: any): Promise<void> {
  await getTaskDetailCube(postParam);
}

export function getCubeLectureTaskLearningCardId(lectureId: string) {
  const test = getTaskLearningCardId(lectureId);

  return test;
}
