import DifficultyLevel from '../../model/DifficultyLevel';
import Instructor from '../../model/Instructor';
import LectureSummary from './LectureSummary';

export default interface LectureCubeSummary extends LectureSummary {
  difficultyLevel: DifficultyLevel;
}
