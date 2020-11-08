import { getTaskItemMapFromCube } from './getTaskItemMapFromCube';

export async function getCubeLectureTask(
  cubeId: string,
  lectureCardId: string,
  offset: number,
  limit: number,
  tabType: string
): Promise<void> {
  await getTaskItemMapFromCube(cubeId, lectureCardId, offset, limit, tabType);
}
