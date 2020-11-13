import Description from './Description';
import DifficultyLevel from './DifficultyLevel';
import Instructor from './Instructor';
import Operation from './Operation';
import ReportFileBox from './ReportFileBox';

export default interface CubeIntro {
  id: string;
  learningTime: number;
  difficultyLevel: DifficultyLevel;
  description: Description;
  operation: Operation;
  feedbackId: string;
  reportFileBox: ReportFileBox;
  instructor: Instructor[];
}
