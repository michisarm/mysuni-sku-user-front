import { getLectureParams } from '../../../store/LectureParamsStore';
import {
  getLectureTaskOffset,
  getLectureTaskOrder,
} from '../../../store/LectureTaskStore';
import { getTaskItemMapFromCube } from './getTaskItemMapFromCube';

export async function getCubeLectureTask(): Promise<void> {
  const params = getLectureParams();
  const cubeId = params?.cubeId;
  if (cubeId === undefined) {
    return;
  }
  const offset = getLectureTaskOffset() || 0;
  const limit = 10;
  const tabType = getLectureTaskOrder() === 'My' ? 'My' : 'Posts';
  const sort = getLectureTaskOrder() || 'new';

  await getTaskItemMapFromCube(cubeId, offset, limit, tabType, sort);
}
