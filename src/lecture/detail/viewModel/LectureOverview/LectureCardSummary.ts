import DifficultyLevel from '../../model/DifficultyLevel';
import LectureSummary from './LectureSummary';
import { LearningState } from '../../../../shared/model';

export default interface LectureCardSummary extends LectureSummary {
  cardId: string;
  stampCount: number;
  thumbImagePath?: string;
  difficultyLevel: DifficultyLevel;
  hasCommunity?: boolean;
  communityId?: string;
  hasClassroomCube?: boolean;
  validLearningDate: number;
  learningStartDate: number;
  learningEndDate: number;
  restrictLearningPeriod: boolean;
  complete: boolean;
  learningState: string;
}

export function getEmptyLectureCardSummary(): LectureCardSummary {
  return {
    name: '',
    category: {
      channelId: '',
      collegeId: '',
    },
    learningTime: '',
    operator: {
      name: '',
      companyName: '',
      email: '',
    },
    passedStudentCount: 0,
    studentCount: 0,
    cardId: '',
    stampCount: 0,
    difficultyLevel: 'Basic',
    validLearningDate: 0,
    learningStartDate: 0,
    learningEndDate: 0,
    restrictLearningPeriod: false,
    complete: false,
    learningState: '',
  };
}
