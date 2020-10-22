import { DatePeriod } from '@nara.platform/accent';
import Category from './Category';
import CubeType from './CubeType';
import Examination from './Examination';
import IconBox from './IconBox';
import LearningState from './LearningState';
import AnswerSheet from './SurveyAnswerSheet';
import SurveyCase from './SurveyCase';

export default interface LectureView {
  id: string;
  serviceType: string;
  serviceId: string;
  cubeId: string;
  coursePlanId: string;
  name: string;
  cubeType: CubeType;
  category: Category;
  iconBox: IconBox;
  creationDate: number;
  learningTime: number;
  learningPeriod: DatePeriod;
  lectureCardUsids: string[];
  learningCardId: string;
  sumViewSeconds: number;
  learningState: LearningState;
  required: number;
  examination: Examination;
  answerSheet: AnswerSheet;
  surveyCase: SurveyCase;
}
