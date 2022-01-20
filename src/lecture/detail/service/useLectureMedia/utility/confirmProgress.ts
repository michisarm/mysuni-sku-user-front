/* eslint-disable consistent-return */
import { getLectureParams } from '../../../store/LectureParamsStore';
import {
  clearFindMyCardRelatedStudentsCache,
  confirmProgressByStudentId,
  findMyCardRelatedStudentsCache,
} from '../../../api/cardApi';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';
import { updateCardLectureStructure } from '../../useLectureStructure/utility/updateCardLectureStructure';

export async function confirmProgress(
  syncPlayTime?: boolean,
  studentId?: string
): Promise<void> {
  const params = getLectureParams();
  let _stduentId = studentId;
  if (
    params?.cardId !== undefined &&
    params?.cubeId !== undefined &&
    params?.cubeType !== undefined
  ) {
    if (_stduentId === undefined) {
      const cachedMyCardRelatedStudents = await findMyCardRelatedStudentsCache(
        params?.cardId
      );
      const cachedCubeStudents = cachedMyCardRelatedStudents?.cubeStudents;
      const cachedStudent = findCubeStudent(params?.cubeId, cachedCubeStudents);
      _stduentId = cachedStudent?.id;
    }
    if (_stduentId === undefined) {
      return;
    }
    await confirmProgressByStudentId(_stduentId, syncPlayTime);
    clearFindMyCardRelatedStudentsCache();
    updateCardLectureStructure(params.cardId);
    requestLectureState(params.cardId, params.cubeId, params.cubeType);
  }

  // await MyTrainingService!.instance.findAllMyTrainingsWithState(
  //   'InProgress',
  //   8,
  //   0,
  //   [],
  //   true
  // );
}
