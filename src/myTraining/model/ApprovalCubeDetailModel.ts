import { Cube } from '../../lecture/model/Cube';
import { Classroom } from '../../lecture/model/Classroom';
import Student from '../../lecture/model/Student';
import { UserIdentity } from 'shared/model/UserIdentity';

export default interface ApprovalCubeDetailModel {
  //
  classroom: Classroom;
  cube: Cube;
  student: Student;
  studentApproval: { id: string; remark: string; time: number };
  userIdentity: UserIdentity;
}

/*
import { Cube } from '../../lecture/model/Cube';
import { Classroom } from '../../lecture/model/Classroom';
import Student from '../../lecture/model/Student';
import { UserIdentity } from '../../lecture/model/UserIdentity';

class ApprovalCubeDetailModel {
  //
  classroom: Classroom = {
    capacity: 0,
    capacityClosed: false,
    cubeId: '',
    enrolling: {
      applyingPeriod: {
        endDate: '',
        startDate: '',
        valid: false,
        zoneId: '',
      },
      cancellablePeriod: {
        endDate: '',
        startDate: '',
        valid: false,
        zoneId: '',
      },
      cancellationPenalty: '',
      enrollingAvailable: false,
      learningPeriod: {
        endDate: '',
        startDate: '',
        valid: false,
        zoneId: '',
      },
    },
    freeOfCharge: {
      approvalProcess: false,
      chargeAmount: 0,
      freeOfCharge: false,
    },
    id: '',
    operation: {
      location: '',
      operator: {
        keyString: '',
      },
      siteUrl: '',
    },
    patronKey: {
      keyString: '',
    },
    round: 0,
    waitingCapacity: 0,
  };
  cube: Cube = {
    id: '',
    patronKey: {
      keyString: '',
    },
    name: '',
    type: 'None',
    enabled: false,
    categories: [],
    learningTime: 0,
    time: 0,
    defaultLanguage: null,
    hasTest: false,
    reportName: null,
    surveyCaseId: null,
    sharingCineroomIds: [],
  };
  student: Student = {
    id: '',
    name: '',
    proposalState: 'Submitted',
    learningState: 'Progress',
    sessionId: '',
    isFinishMedia: false,
    studentScore: {
      testScoreList: [],
      testTotalScore: 0,
      homeworkScore: 0,
      numberOfTrials: 0,
      latestScore: 0,
      gotEssay: false,
      examId: null,
      paperId: '',
    },
    creationTime: 0,
    updateTime: 0,
    lectureId: '',
    cardId: '',
    joinRequests: [],
    complete: false,
    round: 0,
    examAttendance: false,
    updateTimeForTest: 0,
    homeworkFileBoxId: '',

    sumViewSeconds: '',
    durationViewSeconds: '',
    stamped: false,
    studentType: 'Cube',
    phaseCount: 0,
    completePhaseCount: 0,
    enrolledState: 'Submitted',
    homeworkContent: null,
    homeworkOperatorComment: null,
    homeworkOperatorFileBoxId: null,
    hideYn: false,
    extraWork: {
      testStatus: 'SAVE',
      reportStatus: 'SAVE',
      surveyStatus: 'SAVE',
      discussionStatus: 'SAVE',
    },
    commentCount: 0,
    subCommentCount: 0,
  };
  studentApproval: string = '';
  userIdentity: UserIdentity = {
    email: '',
    companyCode: '',
    companyNames: {
      defaultLanguage: '',
      langStringMap: {
        ko: '',
        en: '',
        zh: '',
      },
    },
    departmentCode: '',
    departmentNames: {
      defaultLanguage: '',
      langStringMap: {
        ko: '',
        en: '',
        zh: '',
      },
    },
    id: '',
    names: {
      defaultLanguage: '',
      langStringMap: {
        ko: '',
        en: '',
        zh: '',
      },
    },
    patronKey: {
      keyString: '',
    },
  };
}

export default ApprovalCubeDetailModel;

*/
