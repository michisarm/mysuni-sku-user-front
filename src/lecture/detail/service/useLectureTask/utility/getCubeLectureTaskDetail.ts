import { getTaskDetailCube } from './getTaskDetailCube';
/* eslint-disable consistent-return */

export async function getCubeLectureTaskDetail(postId: string): Promise<void> {
  await getTaskDetailCube(postId);
}
