import { IdName } from '@nara.platform/accent';
import { CourseSetModel } from '../../../course/model';
import { LectureType } from '../viewModel/LectureType';
import Category from './Category';
import CourseSet from './CourseSet';
import CubeType from './CubeType';

export default interface InMyLectureCdo {
  serviceType: LectureType;
  serviceId: string;
  category: Category;
  name: string;
  description: string;
  cubeType?: CubeType;
  learningTime: number;
  stampCount: number;
  coursePlanId: string;
  requiredSubsidiaries: IdName[];
  cubeId: string;
  courseSetJson: CourseSetModel;
  courseLectureUsids: string[];
  lectureCardUsids: string[];
  reviewId: string;
  baseUrl: string;
  servicePatronKeyString: string;
}
