import { StudentCdo } from '../../../../model/StudentCdo';
import {
  cancelStudents,
  clearFindMyCardRelatedStudentsCache,
  findByCubeId,
  markComplete,
  registerStudent,
} from '../../../api/cardApi';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { requestCardLectureStructure } from '../../useLectureStructure/utility/requestCardLectureStructure';
import { requestLectureState } from './requestLectureState';

export async function submit(
  round: number,
  approvalProcess?: boolean,
  approvalEmail?: string
) {
  const params = getLectureParams();
  if (params?.cubeId === undefined || params?.cubeType === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  const studentCdo: StudentCdo = {
    cardId,
    cubeId,
    round,
    approvalProcess,
    approvalEmail,
  };
  await registerStudent(studentCdo);
  clearFindMyCardRelatedStudentsCache();
  requestCardLectureStructure(cardId);
  requestLectureState(cubeId, cubeType);
}

export async function cancel() {
  const params = getLectureParams();
  if (params?.cubeId === undefined || params?.cubeType === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  const student = await findByCubeId(cubeId);
  if (student === undefined) {
    return;
  }
  await cancelStudents(student.id);
  clearFindMyCardRelatedStudentsCache();
  requestCardLectureStructure(cardId);
  requestLectureState(cubeId, cubeType);
}

export async function startLearning() {
  const params = getLectureParams();
  if (params?.cubeId === undefined || params?.cubeType === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  const studentCdo: StudentCdo = {
    cardId,
    cubeId,
    round: 1,
  };
  await registerStudent(studentCdo);
  clearFindMyCardRelatedStudentsCache();
  requestCardLectureStructure(cardId);
  requestLectureState(cubeId, cubeType);
}

export async function completeLearning() {
  const params = getLectureParams();
  if (params?.cubeId === undefined || params?.cubeType === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  const student = await findByCubeId(cubeId);
  if (student === undefined) {
    return;
  }
  await markComplete(student.id);
  clearFindMyCardRelatedStudentsCache();
  requestCardLectureStructure(cardId);
  requestLectureState(cubeId, cubeType);
}
