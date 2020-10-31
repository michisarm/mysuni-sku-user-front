/* eslint-disable consistent-return */

import { SkProfileService } from '../../../../../profile/stores';
import {
  deleteStudentByRollBookId,
  findIsJsonStudentByCube,
  findStudent,
  joinCommunity,
  registerStudent,
} from '../../../api/lectureApi';
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import CubeType from '../../../model/CubeType';
import Student from '../../../model/Student';
import StudentCdo from '../../../model/StudentCdo';
import StudentJoin from '../../../model/StudentJoin';
import { setLectureState } from '../../../store/LectureStateStore';
import { updateCubeItemState } from '../../../utility/lectureStructureHelper';
import LectureParams from '../../../viewModel/LectureParams';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureState, { State } from '../../../viewModel/LectureState';

/** Actions */

/**
 *
 * delete http://localhost:3000/api/lecture/students/flow/byRollBookId?rollBookId=de139827-a67a-4ce2-ba90-091c326a4fa2
 * 무료과정 ? 유료과정 ? 등록 ?
 */

/**
 * 
 *registerStudentApprove(studentCdo: StudentCdoModel) {
    // 차수선택 시 id, freeOfCharge 값 전달

    const { id, freeOfCharge } = this.state.selectedClassRoom;
    if (id) {
      // 차수 선택 시 ID 값
      studentCdo.classroomId = id;
      // 차수 선택시 무료(true) 유료(false) 여부
      studentCdo.approvalProcess = freeOfCharge.approvalProcess;
    }

    const { studentService, lectureCardId, init } = this.props;

    studentService!.registerStudent(studentCdo).then(() => {
      studentService!.findStudentByRollBookId(studentCdo.rollBookId);
      studentService!.findIsJsonStudentByCube(lectureCardId);
      studentService!.findStudentCount(studentCdo.rollBookId);
      if (init) init();
    });

    // 알림 메시지
    const messageStr =
      '본 과정은 승인권자(본인리더 or HR담당자)가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은<br>&#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
    reactAlert({ title: '알림', message: messageStr });
  }
 */

/**
 * Student 가 없을 때 처리 확인
 */

const APPROVE = '학습하기';
const SUBMIT = '신청하기';
const CANCEL = '취소하기';
const CHANGE_ROUND = '차수변경';
const DOWNLOAD = '다운로드';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const JOINED = '가입완료';
const SUBMITED = '승인대기';
const REJECTED = '반려됨';
const WAIT = '학습예정';
const JOIN = '가입하기';

interface ChangeStateOption {
  params: LectureRouterParams;
  studentJoins?: StudentJoin[];
  studentJoin: StudentJoin;
  student?: Student;
  cubeType: CubeType;
  lectureState: LectureState;
}

async function submit(
  params: LectureRouterParams,
  rollBookId: string,
  student?: Student
) {
  // classroomModal.show
  const {
    skProfile: { member },
  } = SkProfileService.instance;
  // classroomModal.show
  let nextStudentCdo: StudentCdo = {
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
  if (student !== undefined) {
    const {
      rollBookId,
      name,
      email,
      company,
      department,
      programLectureUsid,
      courseLectureUsid,
      leaderEmails,
      url,
    } = student;
    nextStudentCdo = {
      rollBookId,
      name,
      email,
      company,
      department,
      programLectureUsid,
      courseLectureUsid,
      proposalState: 'Submitted',
      leaderEmails,
      url,
      enClosed: false,
      classroomId: '',
      approvalProcess: false,
    };
  }
  await registerStudent(nextStudentCdo);
  getStateFromCube(params);
}

async function mClassroomSubmit(
  params: LectureRouterParams,
  rollBookId: string,
  classroomId: string
) {
  // classroomModal.show
  const {
    skProfile: { member },
  } = SkProfileService.instance;
  // classroomModal.show
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
    classroomId,
    approvalProcess: false,
  };
  await registerStudent(nextStudentCdo);
  getStateFromCube(params);
}

function cancel(params: LectureRouterParams, student: Student) {
  const { rollBookId } = student;
  return deleteStudentByRollBookId(rollBookId);
}

function changeRound() {}

async function approve(
  params: LectureRouterParams,
  rollBookId: string,
  student?: Student
) {
  const {
    skProfile: { member },
  } = SkProfileService.instance;
  // classroomModal.show
  let nextStudentCdo: StudentCdo = {
    rollBookId,
    name: member.name,
    email: member.email,
    company: member.company,
    department: member.department,
    proposalState: 'Approved',
    programLectureUsid: '',
    courseLectureUsid: '',
    leaderEmails: [],
    url: '',
    classroomId: '',
    approvalProcess: false,
  };
  if (student !== undefined) {
    const {
      rollBookId,
      name,
      email,
      company,
      department,
      programLectureUsid,
      courseLectureUsid,
      leaderEmails,
      url,
    } = student;
    nextStudentCdo = {
      rollBookId,
      name,
      email,
      company,
      department,
      programLectureUsid,
      courseLectureUsid,
      proposalState: 'Approved',
      leaderEmails,
      url,
      enClosed: false,
      classroomId: '',
      approvalProcess: false,
    };
  }
  await registerStudent(nextStudentCdo);
  getStateFromCube(params);
}

async function join(
  params: LectureRouterParams,
  rollBookId: string,
  student?: Student
) {
  const {
    skProfile: { member },
  } = SkProfileService.instance;
  // classroomModal.show
  let nextStudentCdo: StudentCdo = {
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
  if (student !== undefined) {
    const {
      rollBookId,
      name,
      email,
      company,
      department,
      programLectureUsid,
      courseLectureUsid,
      leaderEmails,
      url,
    } = student;
    nextStudentCdo = {
      rollBookId,
      name,
      email,
      company,
      department,
      programLectureUsid,
      courseLectureUsid,
      proposalState: 'Submitted',
      leaderEmails,
      url,
      enClosed: false,
      classroomId: '',
      approvalProcess: false,
    };
  }

  await joinCommunity(nextStudentCdo);
  getStateFromCube(params);
}

function getStateWhenSummited(option: ChangeStateOption): LectureState | void {
  const { params, lectureState, cubeType, student } = option;
  if (student !== undefined) {
    switch (cubeType) {
      case 'ClassRoomLecture':
      case 'ELearning':
        return {
          ...lectureState,
          canAction: true,
          action: () => cancel(params, student),
          actionText: CANCEL,
          stateText: WAIT,
        };
    }
  }
}

function getStateWhenApproved(option: ChangeStateOption): LectureState | void {
  const { lectureState, cubeType, student } = option;

  if (student !== undefined) {
    let stateText = PROGRESS;

    switch (student.learningState) {
      case 'Passed':
        stateText = COMPLETE;
        break;
      default:
        break;
    }

    switch (cubeType) {
      case 'WebPage':
      case 'Experiential':
      case 'Video':
      case 'Audio':
      case 'WebPage':
      case 'Documents':
        return {
          ...lectureState,
          canAction: false,
          actionText: APPROVE,
          stateText,
        };
      case 'ClassRoomLecture':
      case 'ELearning':
        /**
         * 학습완료
         * 승인대기
         * 반려됨
         * 학습예정
         */
        return {
          ...lectureState,
          hideAction: true,
          stateText: student.learningState === null ? WAIT : stateText,
        };
      case 'Community':
        return {
          ...lectureState,
          hideAction: true,
          stateText: JOINED,
        };
    }
  }
}

function getStateWhenRejected(option: ChangeStateOption): LectureState | void {
  const {
    params,
    lectureState,
    cubeType,
    student,
    studentJoin: { rollBookId },
  } = option;

  if (student !== undefined) {
    switch (cubeType) {
      case 'ClassRoomLecture':
      case 'ELearning':
        return {
          ...lectureState,
          canAction: true,
          action: () => submit(params, rollBookId, student),
          actionText: SUBMIT,
          stateText: REJECTED,
        };
    }
  }
}

function getStateWhenCanceled(option: ChangeStateOption): LectureState | void {
  const {
    params,
    lectureState,
    cubeType,
    student,
    studentJoins,
    studentJoin: { rollBookId },
  } = option;
  switch (cubeType) {
    case 'WebPage':
    case 'Experiential':
    case 'Video':
    case 'Audio':
    case 'WebPage':
    case 'Documents':
      return {
        ...lectureState,
        canAction: true,
        actionText: APPROVE,
        action: () => approve(params, rollBookId, student),
        hideState: true,
      };
    case 'ClassRoomLecture':
    case 'ELearning':
      return {
        ...lectureState,
        canAction: true,
        actionText: SUBMIT,
        action: () => submit(params, rollBookId, student),
        hideState: true,
        classroomSubmit: (round, classroomId) => {
          if (studentJoins !== undefined) {
            const rollbook = studentJoins.find(c => c.round == round);
            if (rollbook !== undefined) {
              mClassroomSubmit(params, rollbook.rollBookId, classroomId);
            }
          }
        },
      };
    case 'Community':
      return {
        ...lectureState,
        canAction: true,
        actionText: JOIN,
        action: () => join(params, rollBookId, student),
        hideState: true,
      };
  }
}

export async function getStateFromCube(params: LectureRouterParams) {
  const { contentId, lectureId } = params;
  const {
    contents: { type },
  } = await findPersonalCube(contentId);
  const studentJoins = await findIsJsonStudentByCube(lectureId);
  console.log('studentJoins', studentJoins);
  if (studentJoins.length > 0) {
    const studentJoin: StudentJoin | null = studentJoins.reduce<StudentJoin | null>(
      (r, c) => {
        if (r === null) {
          return c;
        }
        if (c.updateTime > r.updateTime) {
          return c;
        }
        return r;
      },
      null
    );
    if (studentJoin !== null) {
      const student =
        studentJoin.studentId !== null
          ? await findStudent(studentJoin.studentId)
          : undefined;
      const { learningState, proposalState } = studentJoin;
      let state: State = 'None';
      if (proposalState === 'Approved') {
        switch (learningState) {
          case 'Progress':
          case 'TestPassed':
          case 'TestWaiting':
          case 'HomeworkWaiting':
            state = 'Progress';
            break;
          case 'Passed':
            state = 'Completed';
            break;

          default:
            break;
        }
      }

      switch (type) {
        case 'ELearning':
        case 'ClassRoomLecture':
          switch (proposalState) {
            case 'Approved':
              break;
            case 'Canceled':
              break;
            case 'Rejected':
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }

      const lectureState = { state, learningState, proposalState, type };
      updateCubeItemState(contentId, state, learningState);
      switch (proposalState) {
        case 'Approved':
          {
            const next = getStateWhenApproved({
              params,
              lectureState,
              student,
              studentJoin,
              cubeType: type,
            });
            if (next === undefined) {
              setLectureState();
            } else {
              setLectureState(next);
            }
          }
          break;
        case 'Submitted':
          {
            const next = getStateWhenSummited({
              params,
              lectureState,
              student,
              studentJoin,
              cubeType: type,
            });
            if (next === undefined) {
              setLectureState();
            } else {
              setLectureState(next);
            }
          }
          break;
        case 'Rejected':
          {
            const next = getStateWhenRejected({
              params,
              lectureState,
              student,
              studentJoin,
              cubeType: type,
            });
            if (next === undefined) {
              setLectureState();
            } else {
              setLectureState(next);
            }
          }
          break;
        default:
          {
            const next = getStateWhenCanceled({
              params,
              lectureState,
              student,
              studentJoins,
              studentJoin,
              cubeType: type,
            });
            if (next === undefined) {
              setLectureState();
            } else {
              setLectureState(next);
            }
          }
          break;
      }
    }
  }
}
