import IconBox from 'lecture/detail/model/IconBox';
import DifficultyLevel from '../../model/DifficultyLevel';
import LectureSummary from './LectureSummary';

export default interface LectureCourseSummary extends LectureSummary {
  stampCount: number;
  iconBox?: IconBox;
  mytrainingId?: string;
  difficultyLevel: DifficultyLevel;
  hasCommunity?: boolean;
  communityId?: string;
}
