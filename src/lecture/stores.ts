
import LectureCardService from './shared/present/logic/LectureCardService';
import LectureService from './shared/present/logic/LectureService';
import ProgramLectureService from './shared/present/logic/ProgramLectureService';
import CourseLectureService from './shared/present/logic/CourseLectureService';
import RollBookService from './shared/present/logic/RollBookService';
import StudentService from './shared/present/logic/StudentService';
import CollegeLectureCountService from './shared/present/logic/CollegeLectureCountService';
import LectureCountService from './category/present/logic/LectureCountService';

import AnswerSheetService from '../survey/answer/present/logic/AnswerSheetService';
import SurveyCaseService from '../survey/event/present/logic/SurveyCaseService';
import SurveyFormService from '../survey/form/present/logic/SurveyFormService';
import RQDLectureService from './shared/present/logic/RQDLectureService';
import NEWLectureService from './shared/present/logic/NEWLectureService';
import POPLectureService from './shared/present/logic/POPLectureService';
import LRSLectureService from './shared/present/logic/LRSLectureService';
import BadgeService from '../certification/present/logic/BadgeService';
import BadgeDetailService from '../certification/present/logic/BadgeDetailService';
import ENRLectureService from './shared/present/logic/ENRLectureService';

export default {
  lecture: {
    lectureCardService: LectureCardService.instance,
    lectureService: LectureService.instance,
    programLectureService: ProgramLectureService.instance,
    courseLectureService: CourseLectureService.instance,
    rollBookService: RollBookService.instance,
    studentService: StudentService.instance,
    collegeLectureCountService: CollegeLectureCountService.instance,
    lectureCountService: LectureCountService.instance,
    answerSheetService: AnswerSheetService.instance,
    surveyCaseService: SurveyCaseService.instance,
    surveyFormService: SurveyFormService.instance,
  },
  rqdLecture: {
    rqdLectureService: RQDLectureService.instance,
  },
  newLecture: {
    newLectureService: NEWLectureService.instance,
  },
  popLecture: {
    popLectureService: POPLectureService.instance,
  },
  lrsLecture: {
    lrsLectureService: LRSLectureService.instance,
  },
  badge: {
    badgeService: BadgeService.instance,
  },
  badgeDetail: {
    badgeDetailService: BadgeDetailService.instance,
  },
  enrLecture: {
    enrLectureService : ENRLectureService.instance,
  }
};

export {
  LectureCardService,
  LectureService,
  RQDLectureService,
  NEWLectureService,
  POPLectureService,
  LRSLectureService,
  ProgramLectureService,
  CourseLectureService,
  RollBookService,
  StudentService,
  CollegeLectureCountService,
  LectureCountService,
  AnswerSheetService,
  SurveyCaseService,
  SurveyFormService,
  BadgeService,
  BadgeDetailService,
  ENRLectureService,
};
