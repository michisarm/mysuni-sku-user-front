import { IdName } from '@nara.platform/accent';
import { CourseSetModel } from '../../../course/model';
import { CardCategory } from '../../../shared/model/CardCategory';
import { LectureType } from '../viewModel/LectureType';
import CourseSet from './CourseSet';
import CubeType from './CubeType';

export default interface InMyLectureCdo {
  serviceType: LectureType;
  serviceId: string;
  cardId: string;
  category: CardCategory;
  name: string;
  cubeType?: CubeType;
  learningTime: number;
  stampCount: number;
}
