import DifficultyLevel from 'lecture/detail/model/DifficultyLevel';
import IconBox from 'lecture/detail/model/IconBox';
import Operation from 'lecture/detail/model/Operation';
import LectureCategory from './LectureCategory';

export default interface LectureSummary {
  name: string;
  category: LectureCategory;
  difficultyLevel?: DifficultyLevel;
  learningTime: string;
  operation: Operation;
  stampCount?: number;
  passedCount: number;
  iconBox: IconBox;
}
