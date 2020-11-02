import { getTaskDetailCube } from './getTaskDetailCube';
/* eslint-disable consistent-return */

export async function getCubeLectureTaskDetail(postParam: any): Promise<void> {
  await getTaskDetailCube(postParam);
}
