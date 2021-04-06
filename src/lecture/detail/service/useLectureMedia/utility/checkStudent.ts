/* eslint-disable consistent-return */
import { confirmProgress } from './confirmProgress';
import LectureParams from '../../../viewModel/LectureParams';
import { StudentCdo } from '../../../../model/StudentCdo';
import { registerStudent } from '../../../api/cardApi';

export async function checkStudent(params: LectureParams): Promise<void> {
  const { cardId, cubeId } = params;
  if (cubeId !== undefined) {
    const studentCdo: StudentCdo = {
      cardId,
      cubeId,
      round: 0,
    };
    const studentId = await registerStudent(studentCdo);
    if (studentId !== undefined) {
      await confirmProgress();
    }
  }
}
