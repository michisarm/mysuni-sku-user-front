/* eslint-disable consistent-return */
import { confirmProgress } from './confirmProgress';
import LectureParams from '../../../viewModel/LectureParams';
import { StudentCdo } from '../../../../model/StudentCdo';
import {
  clearFindMyCardRelatedStudentsCache,
  registerStudent,
} from '../../../api/cardApi';
import { requestCardLectureStructure } from '../../useLectureStructure/utility/requestCardLectureStructure';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';

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
      await confirmProgress();
    }
    clearFindMyCardRelatedStudentsCache();
    requestCardLectureStructure(cardId);
    requestLectureState(cardId, cubeId, cubeType);
  }
}
