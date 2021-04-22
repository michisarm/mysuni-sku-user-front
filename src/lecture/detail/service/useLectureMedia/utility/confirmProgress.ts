/* eslint-disable consistent-return */
import { getLectureParams } from '../../../store/LectureParamsStore';
import {
  clearFindMyCardRelatedStudentsCache,
  confirmProgressByStudentId,
  findMyCardRelatedStudentsCache,
} from '../../../api/cardApi';
import { requestCardLectureStructure } from '../../useLectureStructure/utility/requestCardLectureStructure';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';

export async function confirmProgress(studentId?: string): Promise<void> {
  const params = getLectureParams();
  let _stduentId = studentId;
  if (
    params?.cardId !== undefined &&
    params?.cubeId !== undefined &&
    params?.cubeType !== undefined
  ) {
    if (_stduentId === undefined) {
      const myCardRelatedStudents = await findMyCardRelatedStudentsCache(
        params?.cardId
      );
      const cubeStudents = myCardRelatedStudents?.cubeStudents;
      const student = findCubeStudent(params?.cubeId, cubeStudents);
      _stduentId = student?.id;
    }
    if (_stduentId === undefined) {
      return;
    }
    await confirmProgressByStudentId(_stduentId);
    clearFindMyCardRelatedStudentsCache();
    requestCardLectureStructure(params.cardId);
    requestLectureState(params.cardId, params.cubeId, params.cubeType);
  }
}
