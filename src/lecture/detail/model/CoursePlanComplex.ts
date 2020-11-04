import CommentCountRdo from './CommentCountRdo';
import CourseLecture from './CourseLecture';
import CoursePlan from './CoursePlan';
import CoursePlanContents from './CoursePlanContents';
import Examination from './Examination';
import ExamPaper from './ExamPaper';
import LectureView from './LectureView';
import ProgramLecture from './ProgramLecture';
import ReviewSummary from './ReviewSummary';
import SubLectureView from './SubLectureView';
import SurveyCase from './SurveyCase';

export default interface CoursePlanComplex {
  coursePlan: CoursePlan;
  coursePlanContents: CoursePlanContents;
  examination: Examination;
  examPaper: ExamPaper;
  surveyCase: SurveyCase;
  courseLecture: CourseLecture;
  programLecture: ProgramLecture;
  reviewSummary: ReviewSummary;
  commentCountRdo: CommentCountRdo;
  lectureViews: LectureView[];
  subLectureViews: SubLectureView[];
  preCourseLectures: LectureView[];
}
