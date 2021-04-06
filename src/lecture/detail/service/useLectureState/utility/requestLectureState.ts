import CubeType from '../../../../model/CubeType';
import { findByCubeId } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureState } from '../../../store/LectureStateStore';
import LectureState from '../../../viewModel/LectureState';

export async function requestLectureState(cubeId: string, cubeType: CubeType) {
  const student = await findByCubeId(cubeId);
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail !== undefined) {
    const lectureState: LectureState = {
      cubeType,
      student,
      cubeDetail,
    };
    setLectureState(lectureState);
  }
}
