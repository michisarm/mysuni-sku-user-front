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
import { MyTrainingService } from '../../../../../myTraining/stores';

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
    updateCardLectureStructure(params.cardId);
    requestLectureState(params.cardId, params.cubeId, params.cubeType);

    const inProgressTableViews = await MyTrainingService.instance.findAllInProgressStorage();
    sessionStorage.setItem(
      'inProgressTableViews',
      JSON.stringify(inProgressTableViews)
    );

    const completedTableViews = await MyTrainingService.instance.findAllCompletedStorage();
    sessionStorage.setItem(
      'completedTableViews',
      JSON.stringify(completedTableViews)
    );
  }

  await MyTrainingService!.instance.findAllMyTrainingsWithState(
    'InProgress',
    8,
    0,
    [],
    true
  );
}
