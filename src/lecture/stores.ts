
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
import NewLectureService from './shared/present/logic/NewLectureService';
import PopularLectureService from './shared/present/logic/PopularLectureService';
import RecommendLectureService from './shared/present/logic/RecommendLectureService';
import BadgeService from '../certification/present/logic/BadgeService';


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
  badge: {
    badgeService: BadgeService.instance,
  },
  newLecture: {
    newLectureService: NewLectureService.instance,
  },
  popularLecture: {
    popularLectureService: PopularLectureService.instance,
  },
  recommendLecture: {
    recommendLectureService: RecommendLectureService.instance,
  },
};

export {
  LectureCardService,
  LectureService,
  BadgeService,
  NewLectureService,
  PopularLectureService,
  RecommendLectureService,
  ProgramLectureService,
  CourseLectureService,
  RollBookService,
  StudentService,
  CollegeLectureCountService,
  LectureCountService,
  AnswerSheetService,
  SurveyCaseService,
  SurveyFormService,
};
