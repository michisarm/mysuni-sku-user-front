import { DatePeriod } from '@nara.platform/accent';
import CourseSet from './CourseSet';
import Creator from './Creator';
import DifficultyLevel from './DifficultyLevel';
import Instructor from './Instructor';
import Test from './Test';

export default interface CoursePlanContents {
  description: string;
  creator: Creator;
  learningPeriod: DatePeriod;
  courseSet: CourseSet;
  surveyId: string;
  surveyCaseId: string;
  testId: string;
  paperId: string;
  fileBoxId: string;
  totalCourseCount: number;
  instructor: Instructor[];
  tests: Test[];
  relations: any[];
  difficultyLevel?: DifficultyLevel;
}
