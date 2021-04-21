/* eslint-disable consistent-return */
import { setLectureTaskCreateBoardId } from 'lecture/detail/store/LectureTaskCreateStore';
import { findCubeDetailCache } from '../../../api/cubeApi';

export async function getTaskBoardId(cubeId: string) {
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail !== undefined && cubeDetail.cubeMaterial.board !== null) {
    setLectureTaskCreateBoardId(cubeDetail.cubeMaterial.board.id);
  }
}
