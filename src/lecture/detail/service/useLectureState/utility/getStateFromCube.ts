/* eslint-disable consistent-return */

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
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureState from '../../../viewModel/LectureState';
import { State } from '../../../viewModel/LectureStructure';

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
  studentJoin: StudentJoin;
  student: Student;
  cubeType: CubeType;
  lectureState: LectureState;
}

function submit(student: Student) {
  // classroomModal.show
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
  const studentCdo: StudentCdo = {
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
  return registerStudent(studentCdo);
}

function cancel(student: Student) {
  const { rollBookId } = student;
  return deleteStudentByRollBookId(rollBookId);
}

function changeRound() {}

function approve(student: Student) {
  // classroomModal.show
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
  const studentCdo: StudentCdo = {
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
  return registerStudent(studentCdo);
}

function join(student: Student) {
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
  const studentCdo: StudentCdo = {
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
  return joinCommunity(studentCdo);
}

function getStateWhenSummited(option: ChangeStateOption): LectureState | void {
  const { lectureState, cubeType, student } = option;
  switch (cubeType) {
    case 'ClassRoomLecture':
    case 'ELearning':
      return {
        ...lectureState,
        canAction: true,
        action: () => cancel(student),
        actionText: CANCEL,
        stateText: WAIT,
      };
  }
}

function getStateWhenApproved(option: ChangeStateOption): LectureState | void {
  const { lectureState, cubeType, student } = option;

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

function getStateWhenRejected(option: ChangeStateOption): LectureState | void {
  const { lectureState, cubeType, student } = option;
  switch (cubeType) {
    case 'ClassRoomLecture':
    case 'ELearning':
      return {
        ...lectureState,
        canAction: true,
        action: () => submit(student),
        actionText: SUBMIT,
        stateText: REJECTED,
      };
  }
}

function getStateWhenCanceled(option: ChangeStateOption): LectureState | void {
  const { lectureState, cubeType, student } = option;
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
        action: () => approve(student),
        hideState: true,
      };
    case 'ClassRoomLecture':
    case 'ELearning':
      return {
        ...lectureState,
        canAction: true,
        actionText: SUBMIT,
        action: () => submit(student),
        hideState: true,
      };
    case 'Community':
      return {
        ...lectureState,
        canAction: true,
        actionText: JOIN,
        action: () => join(student),
        hideState: true,
      };
  }
}

export async function getStateFromCube(
  params: LectureRouterParams
): Promise<LectureState | void> {
  const { contentId, lectureId } = params;
  const {
    contents: { type },
  } = await findPersonalCube(contentId);
  const studentJoins = await findIsJsonStudentByCube(lectureId);
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
      const student = await findStudent(studentJoin.studentId);
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
      switch (proposalState) {
        case 'Approved':
          return getStateWhenApproved({
            lectureState,
            student,
            studentJoin,
            cubeType: type,
          });
        case 'Submitted':
          return getStateWhenSummited({
            lectureState,
            student,
            studentJoin,
            cubeType: type,
          });
        case 'Canceled':
          return getStateWhenCanceled({
            lectureState,
            student,
            studentJoin,
            cubeType: type,
          });
        case 'Rejected':
          return getStateWhenRejected({
            lectureState,
            student,
            studentJoin,
            cubeType: type,
          });
      }
    }
  }
}
