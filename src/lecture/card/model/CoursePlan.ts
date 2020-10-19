import Category from './Category';
import CourseOpen from './CourseOpen';
import CourseOperator from './CourseOperator';
import Creator from './Creator';
import IconBox from './IconBox';
import Instructor from './Instructor';
import OpenRequest from './OpenRequest';
import ReportFileBox from './ReportFileBox';
import Stamp from './Stamp';

export default interface CoursePlan {
  coursePlanId: string;
  category: Category;
  subCategories: Category[];
  name: string;
  contentsId: string;
  courseOperator: CourseOperator;
  iconBox: IconBox;
  courseOpen: CourseOpen;
  reportFileBox: ReportFileBox;
  stamp: Stamp;
  creator: Creator;
  learningTime: number;
  time: number;
  stateUpdateDate: number;
  openRequests: OpenRequest[];
  required: number;
  hasPreCourse: string;
  instructor: Instructor[];
}
