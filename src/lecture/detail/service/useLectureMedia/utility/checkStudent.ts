/* eslint-disable consistent-return */
import { confirmProgress } from './confirmProgress';
import LectureParams from '../../../viewModel/LectureParams';
import { StudentCdo } from '../../../../model/StudentCdo';
import {
  clearFindMyCardRelatedStudentsCache,
  registerStudent,
} from '../../../api/cardApi';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';
import { updateCardLectureStructure } from '../../useLectureStructure/utility/updateCardLectureStructure';

export async function checkStudent(params: LectureParams): Promise<void> {
  const { cardId, cubeId, cubeType } = params;
  if (cubeId !== undefined && cubeType !== undefined) {
    const studentCdo: StudentCdo = {
      cardId,
      cubeId,
      round: 1,
    };
    const studentId = await registerStudent(studentCdo);
    if (studentId !== undefined) {
      clearFindMyCardRelatedStudentsCache();
      await confirmProgress();
      return;
    }
    clearFindMyCardRelatedStudentsCache();
    updateCardLectureStructure(cardId);
    requestLectureState(cardId, cubeId, cubeType);
  }
}
