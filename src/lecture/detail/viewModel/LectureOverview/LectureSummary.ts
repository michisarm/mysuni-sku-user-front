import CourseOperator from '../../model/CourseOperator';
import LectureCategory from './LectureCategory';

export default interface LectureSummary {
  name: string;
  category: LectureCategory;
  learningTime: string;
  operator: CourseOperator;
  passedCount: number;
  mytrainingId?: string;
}
