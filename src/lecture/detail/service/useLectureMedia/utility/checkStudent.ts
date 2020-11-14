/* eslint-disable consistent-return */
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import {
  findIsJsonStudentByCube, joinCommunity,
} from 'lecture/detail/api/lectureApi';
import SkProfileService from 'profile/present/logic/SkProfileService';
import StudentCdo from 'lecture/detail/model/StudentCdo';
import { getStateFromCube } from '../../useLectureState/utility/getStateFromCube';

export async function registerStudent(
  rollBookId:string
): Promise<void> {

  const {
    skProfile: { member },
  } = SkProfileService.instance;
  const nextStudentCdo: StudentCdo = {
    rollBookId,
    name: member.name,
    email: member.email,
    company: member.company,
    department: member.department,
    proposalState: 'Submitted',
    programLectureUsid: '',
    courseLectureUsid: '',
    leaderEmails: [],
    url: '',
    classroomId: '',
    approvalProcess: false,
  };
  await joinCommunity(nextStudentCdo);
}

export async function checkStudent(
  params: LectureRouterParams
): Promise<void> {

  const { lectureId } = params;
  if (lectureId !== undefined) {
    const studentJoins = await findIsJsonStudentByCube(lectureId);
    // 미디어 플레이 시점에 student 데이터가 없으면 생성 후 우측 상단 학습중 표시
    if (studentJoins.length > 0 && !studentJoins[0].join) {
      await registerStudent(studentJoins[0].rollBookId);
      getStateFromCube(params);
    }
  }
}
