import CubeType from '../../../../model/CubeType';
import { findMyCardRelatedStudentsCache } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureState } from '../../../store/LectureStateStore';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import LectureState from '../../../viewModel/LectureState';

export async function requestLectureState(
  cardId: string,
  cubeId: string,
  cubeType: CubeType
) {
  const myCardRelatedStudents = await findMyCardRelatedStudentsCache(cardId);
  const cubeStudents = myCardRelatedStudents?.cubeStudents;
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail !== undefined) {
    const lectureState: LectureState = {
      cubeType,
      student: findCubeStudent(cubeId, cubeStudents),
      cubeDetail,
    };
    setLectureState(lectureState);
  }
}
