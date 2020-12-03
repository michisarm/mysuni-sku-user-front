/* eslint-disable consistent-return */

import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import { ApprovalMemberModel } from '../../../../../approval/member/model/ApprovalMemberModel';
import { ClassroomModel } from '../../../../../personalcube/classroom/model';
import { SkProfileService } from '../../../../../profile/stores';
import MyTrainingService from '../../../../../myTraining/present/logic/MyTrainingService';
import {
  deleteStudentByRollBookId,
  findIsJsonStudentByCube,
  findStudent,
  joinCommunity,
  markComplete,
  registerStudent,
} from '../../../api/lectureApi';
import { findCubeIntro, findMedia, findOfficeWeb, findPersonalCube } from '../../../api/mPersonalCubeApi';
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
import depot from '@nara.drama/depot';
import { getActiveCourseStructureItem, getActiveProgramStructureItem } from '../../useLectureStructure/useLectureStructure';

const APPROVE = '학습하기';
const SUBMIT = '신청하기';
const CANCEL = '취소하기';
const DOWNLOAD = '다운로드';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const JOINED = '가입완료';
const SUBMITED = '승인대기';
const REJECTED = '반려됨';
const WAIT = '학습예정';
const JOIN = '작성하기';

function isEmpty(text: string) {
  return text === null || text === '';
}


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
  const {
    skProfile: { member },
  } = SkProfileService.instance;

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
  if (student !== undefined && student !== null) {
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
  const { skProfile } = SkProfileService.instance;
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
  if (classroom.enrolling.enrollingAvailable && classroom.freeOfCharge.approvalProcess) {
    const messageStr =
      '본 과정은 승인권자(본인리더 or HR담당자)가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은<br>&#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
    reactAlert({ title: '알림', message: messageStr });
  } else {
    const messageStr =
      '본 과정은 과정담당자가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은 <br> &#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
    reactAlert({ title: '알림', message: messageStr });
  }
}

async function cancel(params: LectureRouterParams, student: Student) {
  const { rollBookId } = student;
  await deleteStudentByRollBookId(rollBookId);
  await getStateFromCube(params);
  requestLectureStructure(params.lectureParams, params.pathname);
}

async function getVideoCanceledState(option: ChangeStateOption): Promise<LectureState> {
  const {
    params,
    lectureState,
    cubeType,
    student,
    studentJoins,
    studentJoin: { rollBookId },
    contentsId,
  } = option;

  if (contentsId !== undefined) {
    const { mediaType } = await findMedia(contentsId)
    if (mediaType === MediaType.InternalMedia || mediaType === MediaType.InternalMediaUpload) {
      return {
        ...lectureState,
        hideAction: true,
        canAction: false,
        hideState: true,
      };
    }
  }


  return {
    ...lectureState,
    canAction: true,
    actionText: APPROVE,
    action: () => videoApprove(params, rollBookId, contentsId, student),
    hideState: true,
  };
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
  if (mediaType === MediaType.LinkMedia) {
    const { linkMediaUrl } = mediaContents;
    const link = document.createElement('a')
    link.setAttribute('href', linkMediaUrl);
    link.setAttribute('target', '_blank');
    link.click();
  }
  return approve(params, rollBookId, student)
}

async function getVideoApprovedState(option: ChangeStateOption, stateText: string): Promise<LectureState> {
  const {
    lectureState,
    hasTest,
    contentsId,
    cubeIntroId,
    studentJoin: { rollBookId },
    params,
    hasSurvey,
  } = option;

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
    if (mediaType === MediaType.LinkMedia) {
      const { linkMediaUrl } = mediaContents;
      if (stateText === PROGRESS) {
        const cubeIntro = await findCubeIntro(cubeIntroId);

        if (cubeIntro === undefined ||
          (cubeIntro.reportFileBox === null || (isEmpty(cubeIntro.reportFileBox.reportName) && isEmpty(cubeIntro.reportFileBox.reportQuestion)
            && isEmpty(cubeIntro.reportFileBox.fileBoxId))
          )

        ) {
          if (!hasTest) {
            return {
              ...lectureState,
              hideAction: false,
              canAction: true,
              actionText: COMPLETE,
              action: () => {
                linkVideoOpen(linkMediaUrl)
                complete(params, rollBookId, hasSurvey)
              },
              actionClassName: 'bg2',
              stateText,
            };
          }
        }
        return {
          ...lectureState,
          hideAction: false,
          canAction: true,
          actionText: APPROVE,
          action: () => linkVideoOpen(linkMediaUrl),
          actionClassName: 'bg',
          stateText,
        };
      }
      if (stateText === COMPLETE) {
        return {
          ...lectureState,
          hideAction: false,
          canAction: true,
          actionText: COMPLETE,
          action: () => {
            linkVideoOpen(linkMediaUrl)
          },
          actionClassName: 'bg2',
          stateText,
        };

      }
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

async function getDocumentsApprovedState(option: ChangeStateOption, stateText: string): Promise<LectureState> {
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

  // if (contentsId !== undefined) {
  //   const cubeIntro = await findCubeIntro(cubeIntroId);
  //   const { fileBoxId } = await findOfficeWeb(contentsId);
  //   const depotFilesList = await depot.getDepotFilesList([fileBoxId])
  //   // PDF 만 있는 경우,
  //   if (Array.isArray(depotFilesList) && Array.isArray(depotFilesList[0]) && depotFilesList[0].every(c =>
  //     c.name && c.name.toLowerCase && c.name.toLowerCase().endsWith('.pdf')
  //   )) {
  //     if (stateText === PROGRESS) {
  //       if (cubeIntro === undefined || (cubeIntro.reportFileBox === null || isEmpty cubeIntro.reportFileBox.reportName === '' || cubeIntro.reportFileBox.reportName === null)) {
  //         if (!hasTest) {
  //           return {
  //             ...lectureState,
  //             action: () => complete(params, rollBookId),
  //             hideAction: true,
  //             canAction: false,
  //             actionText: COMPLETE,
  //             stateText,
  //           };
  //         }
  //       }
  //     }
  //   }
  // }

  if (stateText === PROGRESS) {
    const cubeIntro = await findCubeIntro(cubeIntroId);
    if (cubeIntro === undefined ||
      (cubeIntro.reportFileBox === null || (isEmpty(cubeIntro.reportFileBox.reportName) && isEmpty(cubeIntro.reportFileBox.reportQuestion)
        && isEmpty(cubeIntro.reportFileBox.fileBoxId))
      )) {
      if (!hasTest) {
        return {
          ...lectureState,
          action: () => complete(params, rollBookId, hasSurvey),
          canAction: true,
          actionText: COMPLETE,
          stateText,
        };
      }
    } else {
      return {
        ...lectureState,
        actionClassName: 'bg',
        hideAction: false,
        canAction: true,
        actionText: DOWNLOAD,
        action: () => { },
        stateText,
      };
    }
  }
  if (stateText === COMPLETE) {
    return {
      ...lectureState,
      actionClassName: 'bg2',
      hideAction: true,
      canAction: true,
      actionText: DOWNLOAD,
      action: () => { },
      stateText,
    };
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

async function linkVideoOpen(url: string) {
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
  const myTrainingService = MyTrainingService.instance;
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
  if (student !== undefined && student !== null) {
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

  /* 학습중, 학습완료 위치가 바뀐 것 같아서 임의로 수정했습니다. 혹시 에러나면 말씀해주세요! */
  const inProgressTableViews = await myTrainingService!.findAllInProgressTableViewsForStorage();
  sessionStorage.setItem('inProgressTableViews', JSON.stringify(inProgressTableViews));
  /* 메인 페이지 학습중 스토리지  업데이트를 위한 로직 추가. InProgressLearning.tsx 파일에서 참조 가능합니다! */
  await myTrainingService!.findAllMyTrainingsWithState('InProgress', 8, 0, [], true);
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
  if (student !== undefined && student !== null) {
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

async function complete(params: LectureRouterParams, rollBookId: string, hasSurvey: boolean) {
  const myTrainingService = MyTrainingService.instance;
  await markComplete({ rollBookId });
  await getStateFromCube(params);
  await requestLectureStructure(params.lectureParams, params.pathname);
  const course = getActiveCourseStructureItem();
  const program = getActiveProgramStructureItem();
  if ((course?.state === 'Completed' && course.survey !== undefined) || program?.state === 'Completed' && program.survey !== undefined) {
    reactAlert({
      title: '안내',
      message: 'Survey 설문 참여를 해주세요.',
    })
  }

  /* 학습중, 학습완료 위치가 바뀐 것 같아서 임의로 수정했습니다. 혹시 에러나면 말씀해주세요! */
  const completedTableViews = await myTrainingService!.findAllCompletedTableViewsForStorage();
  sessionStorage.setItem('completedTableViews', JSON.stringify(completedTableViews));
  await myTrainingService!.findAllMyTrainingsWithState('InProgress', 8, 0, [], true);

}

function getStateWhenSummited(option: ChangeStateOption): LectureState | void {
  const { params, lectureState, cubeType, student } = option;
  if (student !== undefined && student !== null) {
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

  if (student !== undefined && student !== null) {
    let stateText = PROGRESS;

    switch (student.learningState) {
      case 'Passed':
        stateText = COMPLETE;
        break;
      default:
        break;
    }

    switch (cubeType) {
      case 'Audio':
      case 'Video':
        break;
      case 'Documents':
        break;
      case 'WebPage':
      case 'Cohort':
      case 'Experiential':
        if (stateText === PROGRESS) {
          const cubeIntro = await findCubeIntro(cubeIntroId);
          if (cubeIntro === undefined ||
            (cubeIntro.reportFileBox === null || (isEmpty(cubeIntro.reportFileBox.reportName) && isEmpty(cubeIntro.reportFileBox.reportQuestion)
              && isEmpty(cubeIntro.reportFileBox.fileBoxId))
            )) {
            if (!hasTest) {
              return {
                ...lectureState,
                action: () => complete(params, rollBookId, hasSurvey),
                canAction: true,
                actionText: COMPLETE,
                stateText,
              };
            }
          }
        }
      case 'ClassRoomLecture':
        return {
          ...lectureState,
          hideAction: true,
          stateText: student.learningState === null ? WAIT : stateText,
        };
      case 'ELearning':
        /**
         * 학습완료
         * 승인대기
         * 반려됨
         * 학습예정
         */
        return {
          ...lectureState,
          actionClassName: 'bg',
          hideAction: student.learningState === null,
          canAction: student.learningState !== null,
          action: () => {
            if (document.getElementById('webpage-link') !== null) {
              document.getElementById('webpage-link')?.click();
            }
          },
          actionText: APPROVE,
          stateText: student.learningState === null ? WAIT : stateText,
        };
        {/* Community => Task 데이터 현행화 후 수정 예정*/ }
      case 'Task':
      case 'Community':
        if (stateText === PROGRESS) {
          return {
            ...lectureState,
            actionClassName: 'bg',
            hideAction: false,
            canAction: true,
            href: '#create',
            actionText: JOIN,
            stateText: PROGRESS,
          };
        }
        if (stateText === COMPLETE) {
          return {
            ...lectureState,
            hideAction: true,
            stateText: COMPLETE,
          };
        }
    }
    if (cubeType === 'Video' || cubeType === 'Audio') {
      const mLectureState = await getVideoApprovedState(option, stateText);
      return mLectureState;
    }
    if (cubeType === 'Documents') {
      const mLectureState = await getDocumentsApprovedState(option, stateText);
      return mLectureState;
    }
  }
}

function getStateWhenRejected(option: ChangeStateOption): LectureState | void {
  const { params, lectureState, cubeType, student, studentJoin } = option;

  if (student !== undefined && student !== null) {
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

async function getStateWhenCanceled(option: ChangeStateOption): Promise<LectureState | undefined> {
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
    case 'Video':
    case 'Audio':
      break;
    case 'WebPage':
    case 'Cohort':
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
      {/* Community => Task 데이터 현행화 후 수정 예정*/ }
    case 'Task':
    case 'Community':
      return {
        ...lectureState,
        canAction: true,
        actionText: JOIN,
        action: () => join(params, rollBookId, student),
        href: '#create',
        hideState: true,
      };
  }
  if (cubeType === 'Video' || cubeType === 'Audio') {
    const mLectureState = await getVideoCanceledState(option);
    return mLectureState;
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
          case 'Passed':
            state = 'Completed';
            stateClassName = 'complete';
            break;
          default:
            state = 'Progress';
            actionClassName = 'bg2';
            break;
        }
      }

      if (type === 'Documents' && proposalState !== 'Approved') {
        await approve(params, studentJoin.rollBookId)
        getStateFromCube(params)
        return;
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
            const next = await getStateWhenCanceled({
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
