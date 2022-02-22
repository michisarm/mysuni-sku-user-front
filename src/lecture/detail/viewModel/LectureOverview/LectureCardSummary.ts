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
  // validLearningDate: number;
  learningStartDate: number;
  learningEndDate: number;
  validStartDate: number;
  validEndDate: number;
  restrictLearningPeriod: boolean;
  complete: boolean;
  learningState: string;
  patronKey: { keyString: string };
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
      id: '',
      name: '',
      companyName: '',
      email: '',
    },
    passedStudentCount: 0,
    studentCount: 0,
    cardId: '',
    stampCount: 0,
    difficultyLevel: 'Basic',
    learningStartDate: 0,
    learningEndDate: 0,
    validStartDate: 0,
    validEndDate: 0,
    restrictLearningPeriod: false,
    complete: false,
    learningState: '',
    patronKey: { keyString: '' },
  };
}
