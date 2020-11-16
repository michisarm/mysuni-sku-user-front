/* eslint-disable consistent-return */

import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import { ApprovalMemberModel } from '../../../../../approval/member/model/ApprovalMemberModel';
import { ClassroomModel } from '../../../../../personalcube/classroom/model';
import { SkProfileService } from '../../../../../profile/stores';
import {
  deleteStudentByRollBookId,
  findIsJsonStudentByCube,
  findStudent,
  joinCommunity,
  markComplete,
  registerStudent,
} from '../../../api/lectureApi';
import { findCubeIntro, findMedia, findPersonalCube } from '../../../api/mPersonalCubeApi';
import CubeType from '../../../model/CubeType';
import { MediaType } from '../../../model/MediaType';
import Student from '../../../model/Student';
import StudentCdo from '../../../model/StudentCdo';
import StudentJoin from '../../../model/StudentJoin';
import { setLectureState } from '../../../store/LectureStateStore';
import { requestLectureStructure } from '../../../ui/logic/LectureStructureContainer';
import { updateCubeItemState } from '../../../utility/lectureStructureHelper';
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
// const CHANGE_ROUND = '차수변경';
const DOWNLOAD = '다운로드';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const JOINED = '가입완료';
const SUBMITED = '승인대기';
const REJECTED = '반려됨';
const WAIT = '학습예정';
const JOIN = '작성하기';

interface ChangeStateOption {
  params: LectureRouterParams;
  studentJoins?: StudentJoin[];
  studentJoin: StudentJoin;
  student?: Student;
  cubeType: CubeType;
  lectureState: LectureState;
  pathname?: string;
  hasTest: boolean;
  hasReport: boolean;
  hasSurvey: boolean;
  cubeIntroId: string;
  contentsId?: string;
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
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
}

async function mClassroomSubmit(
  params: LectureRouterParams,
  rollBookId: string,
  classroom: ClassroomModel,
  member?: ApprovalMemberModel,
  pathname?: string,
  student?: Student
) {
  // classroomModal.show
  const { skProfile } = SkProfileService.instance;
  // classroomModal.show
  const nextStudentCdo: StudentCdo = {
    rollBookId,
    name: skProfile.member.name,
    email: skProfile.member.email,
    company: skProfile.member.company,
    department: skProfile.member.department,
    proposalState: 'Submitted',
    programLectureUsid: '',
    courseLectureUsid: '',
    leaderEmails: member === undefined ? [] : [member.email],
    url: pathname
      ? `https://int.mysuni.sk.com/login?contentUrl=${pathname}`
      : '',
    classroomId: classroom.id,
    approvalProcess: classroom.freeOfCharge.approvalProcess,
  };
  if (
    student?.proposalState === 'Canceled' ||
    student?.proposalState === 'Rejected'
  ) {
    nextStudentCdo.proposalState = student.proposalState;
  }
  await registerStudent(nextStudentCdo);
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
  const messageStr =
    '본 과정은 승인권자(본인리더 or HR담당자)가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은<br>&#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
  reactAlert({ title: '알림', message: messageStr });
}

async function cancel(params: LectureRouterParams, student: Student) {
  const { rollBookId } = student;
  await deleteStudentByRollBookId(rollBookId);
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
}

async function videoApprove(params: LectureRouterParams,
  rollBookId: string,
  contentsId?: string,
  student?: Student) {
  if (contentsId === undefined) {
    return;
  }
  const { mediaType, mediaContents } = await findMedia(contentsId)
  if (mediaType === MediaType.ContentsProviderMedia) {
    const { contentsProvider: { expiryDate, url } } = mediaContents;
    if (moment(expiryDate).endOf('day').valueOf() < Date.now()) {
      reactAlert({
        title: '안내',
        message: '해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.'
      })
      return;
    }
    const link = document.createElement('a')
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.click();
  }
  return approve(params, rollBookId, student)
}

async function getVideoApprovedState(lectureState: LectureState, stateText: string, contentsId?: string): Promise<LectureState> {

  if (contentsId !== undefined) {
    const { mediaType, mediaContents } = await findMedia(contentsId)
    if (mediaType === MediaType.ContentsProviderMedia) {
      const { contentsProvider: { expiryDate, url } } = mediaContents;
      return {
        ...lectureState,
        hideAction: false,
        canAction: true,
        actionText: APPROVE,
        action: () => cpVideoOpen(expiryDate, url),
        stateText,
      };
    }

  }

  return {
    ...lectureState,
    hideAction: true,
    canAction: false,
    actionText: APPROVE,
    stateText,
  };

}

async function cpVideoOpen(
  expiryDate: string, url: string) {
  if (moment(expiryDate).endOf('day').valueOf() < Date.now()) {
    reactAlert({
      title: '안내',
      message: '해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.'
    })
    return;
  }
  const link = document.createElement('a')
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.click();

}

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
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
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
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
}

async function complete(params: LectureRouterParams, rollBookId: string) {
  await markComplete({ rollBookId });
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
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
          stateText: SUBMITED,
        };
    }
  }
}

async function getStateWhenApproved(
  option: ChangeStateOption
): Promise<LectureState | void> {
  const {
    lectureState,
    cubeType,
    student,
    hasTest,
    hasSurvey,
    cubeIntroId,
    contentsId,
    studentJoin: { rollBookId },
    params,
  } = option;

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
      case 'Video':
        break;
      case 'Documents':
        if (stateText === PROGRESS) {
          const { reportFileBox } = await findCubeIntro(cubeIntroId);
          if (reportFileBox === null || reportFileBox.reportName === '') {
            if (!hasTest) {
              return {
                ...lectureState,
                action: () => complete(params, rollBookId),
                canAction: true,
                actionText: COMPLETE,
                stateText,
              };
            }
          }
        }
        if (stateText === COMPLETE) {
          return {
            ...lectureState,
            actionClassName: 'bg2',
            hideAction: false,
            canAction: true,
            actionText: DOWNLOAD,
            action: () => { },
            stateText,
          };
        }
      case 'WebPage':
      case 'Experiential':
        if (stateText === PROGRESS) {
          const { reportFileBox } = await findCubeIntro(cubeIntroId);
          if (reportFileBox === null || reportFileBox.reportName === '') {
            if (!hasTest) {
              return {
                ...lectureState,
                action: () => complete(params, rollBookId),
                canAction: true,
                actionText: COMPLETE,
                stateText,
              };
            }
          }
        }
      case 'Audio':
        return {
          ...lectureState,
          hideAction: true,
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
    if (cubeType === 'Video') {
      const mLectureState = await getVideoApprovedState(lectureState, stateText, contentsId);
      return mLectureState;
    }
  }
}

function getStateWhenRejected(option: ChangeStateOption): LectureState | void {
  const { params, lectureState, cubeType, student, studentJoin } = option;

  if (student !== undefined) {
    switch (cubeType) {
      case 'ClassRoomLecture':
      case 'ELearning':
        return {
          ...lectureState,
          canAction: true,
          action: () => cancel(params, student),
          actionText: CANCEL,
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
    contentsId,
  } = option;
  switch (cubeType) {
    case 'WebPage':
    case 'Experiential':
      return {
        ...lectureState,
        canAction: true,
        actionText: APPROVE,
        action: () => {
          if (document.getElementById('webpage-link') !== null) {
            document.getElementById('webpage-link')?.click();
          }
          approve(params, rollBookId, student);
        },
        coreAction: () => approve(params, rollBookId, student),
        hideState: true,
      };
    case 'Documents':
      return {
        ...lectureState,
        canAction: true,
        actionText: DOWNLOAD,
        action: () => approve(params, rollBookId, student),
        hideState: true,
      };
    case 'Video':
      return {
        ...lectureState,
        canAction: true,
        actionText: APPROVE,
        action: () => videoApprove(params, rollBookId, contentsId, student),
        hideState: true,
      };
    case 'Audio':
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
        classroomSubmit: (classroom, member) => {
          if (studentJoins !== undefined) {
            const rollbook = studentJoins.find(c => c.round == classroom.round);
            if (rollbook !== undefined) {
              mClassroomSubmit(
                params,
                rollbook.rollBookId,
                classroom,
                member,
                params.pathname,
                student
              );
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
  const { contentId, lectureId, pathname } = params;
  const {
    contents: { type, examId, surveyId, contents: { id: contentsId } },
    cubeIntro: { id: cubeIntroId },
  } = await findPersonalCube(contentId);
  const hasTest = examId !== undefined && examId !== null && examId !== '';
  const hasSurvey =
    surveyId !== undefined && surveyId !== null && surveyId !== '';
  const studentJoins = await findIsJsonStudentByCube(lectureId);
  let actionClassName = 'bg';
  let stateClassName = 'line';
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
            actionClassName = 'bg2';
            break;
          case 'Passed':
            state = 'Completed';
            stateClassName = 'complete';
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

      const lectureState = {
        state,
        learningState,
        proposalState,
        type,
        actionClassName,
        stateClassName,
      };
      updateCubeItemState(contentId, state, learningState);
      switch (proposalState) {
        case 'Approved':
          {
            const next = await getStateWhenApproved({
              params,
              lectureState,
              student,
              studentJoin,
              cubeType: type,
              hasTest,
              hasSurvey,
              cubeIntroId,
              contentsId,
              hasReport: false,
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
              hasTest,
              hasSurvey,
              cubeIntroId,
              hasReport: false,
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
              hasTest,
              hasSurvey,
              cubeIntroId,
              hasReport: false,
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
              pathname,
              hasTest,
              hasSurvey,
              cubeIntroId,
              contentsId,
              hasReport: false,
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
