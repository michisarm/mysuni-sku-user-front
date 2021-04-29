import { getTaskItemMapFromCube } from './getTaskItemMapFromCube';

export async function getCubeLectureTask(
  cubeId: string,
  offset: number,
  limit: number,
  tabType: string,
  sort?: string
): Promise<void> {
  await getTaskItemMapFromCube(cubeId, offset, limit, tabType, sort);
}
