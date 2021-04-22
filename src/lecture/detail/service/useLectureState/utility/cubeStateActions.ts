import { StudentCdo } from '../../../../model/StudentCdo';
import {
  cancelStudents,
  clearFindMyCardRelatedStudentsCache,
  findMyCardRelatedStudentsCache,
  markComplete,
  registerStudent,
} from '../../../api/cardApi';
import CubeType from '../../../model/CubeType';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import { updateCardLectureStructure } from '../../useLectureStructure/utility/updateCardLectureStructure';
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
    //approvalProcess,
    approverDenizenId: approvalEmail,
  };
  await registerStudent(studentCdo);
  clearFindMyCardRelatedStudentsCache();
  updateCardLectureStructure(cardId);
  requestLectureState(cardId, cubeId, cubeType);
}

export async function submitFromCubeId(
  cubeId: string,
  cubeType: CubeType,
  round: number,
  approvalProcess?: boolean,
  approvalEmail?: string
) {
  const params = getLectureParams();
  if (params?.cardId === undefined) {
    return;
  }
  const { cardId } = params;
  const studentCdo: StudentCdo = {
    cardId,
    cubeId,
    round,
    //approvalProcess,
    approverDenizenId: approvalEmail,
  };
  await registerStudent(studentCdo);
  clearFindMyCardRelatedStudentsCache();
  updateCardLectureStructure(cardId);
  requestLectureState(cardId, cubeId, cubeType);
}

export async function cancel() {
  const params = getLectureParams();
  if (params?.cubeId === undefined || params?.cubeType === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  const myCardRelatedStudents = await findMyCardRelatedStudentsCache(cardId);
  const cubeStudents = myCardRelatedStudents?.cubeStudents;
  const student = findCubeStudent(cubeId, cubeStudents);
  if (student === undefined) {
    return;
  }
  await cancelStudents(student.id);
  clearFindMyCardRelatedStudentsCache();
  updateCardLectureStructure(cardId);
  requestLectureState(cardId, cubeId, cubeType);
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
  updateCardLectureStructure(cardId);
  requestLectureState(cardId, cubeId, cubeType);
}

export async function completeLearning() {
  const params = getLectureParams();
  if (params?.cubeId === undefined || params?.cubeType === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  const myCardRelatedStudents = await findMyCardRelatedStudentsCache(cardId);
  const cubeStudents = myCardRelatedStudents?.cubeStudents;
  const student = findCubeStudent(cubeId, cubeStudents);
  if (student === undefined) {
    return;
  }
  await markComplete(student.id);
  clearFindMyCardRelatedStudentsCache();
  updateCardLectureStructure(cardId);
  requestLectureState(cardId, cubeId, cubeType);
}

// 2021.04.21 Cube Discussion 에서 코멘트 등록 후 화면 Refresh를 위해 추가
export async function refresh(
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
    //approvalProcess,
    approverDenizenId: approvalEmail,
  };
  // await registerStudent(studentCdo);
  clearFindMyCardRelatedStudentsCache();
  updateCardLectureStructure(cardId);
  requestLectureState(cardId, cubeId, cubeType);
}

// 2021.04.21 Cube Discussion 에서 코멘트 등록 시 자동으로 학습 진행을 위해 추가
export async function submitRegisterStudent() {
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
}
