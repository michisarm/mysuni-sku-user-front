import {CommentCountRdoModel, ReviewSummaryModel} from '@nara.drama/feedback';
import {CoursePlanModel} from './CoursePlanModel';
import {CoursePlanContentsModel} from './CoursePlanContentsModel';
import CourseLectureModel from '../../lecture/model/CourseLectureModel';
import AnswerSheetModel from '../../survey/answer/model/AnswerSheetModel';
import LectureViewModel from '../../lecture/model/LectureViewModel';
import SubLectureViewModel from '../../lecture/model/SubLectureViewModel';
import ProgramLectureModel from '../../lecture/model/ProgramLectureModel';
import {SurveyFormModel} from '../../survey/form/model/SurveyFormModel';
import { ExaminationModel } from '../../assistant/exam/model/ExaminationModel';
import { ExamPaperModel } from '../../assistant/paper/model/ExamPaperModel';

export interface CoursePlanCustomModel {
  coursePlan: CoursePlanModel
  coursePlanContents: CoursePlanContentsModel
  answerSheet: AnswerSheetModel
  // surveyCase: SurveyCaseModel
  surveyForm: SurveyFormModel
  courseLecture: CourseLectureModel
  programLecture: ProgramLectureModel
  lectureViews: LectureViewModel[]
  reviewSummary: ReviewSummaryModel
  commentCountRdo: CommentCountRdoModel
  subLectureViews:  SubLectureViewModel[]
  preCourseLectures: LectureViewModel[]
  examination: ExaminationModel
  examPaper: ExamPaperModel
  // reviewSummary:
  // commentCountRdo:
}
