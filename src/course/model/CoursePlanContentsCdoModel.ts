import { DatePeriod, CreatorModel } from 'shared/model';
import { CourseSetModel } from './CourseSetModel';

export class CoursePlanContentsCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  description: string = '';
  creator: CreatorModel = new CreatorModel();
  learningPeriod: DatePeriod = new DatePeriod();
  courseSet: CourseSetModel = new CourseSetModel();
  surveyId: string = '';
  testId: string = '';
  fileBoxId: string = '';
}
