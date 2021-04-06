import DifficultyLevel from '../../model/DifficultyLevel';
import LectureSummary from './LectureSummary';

export default interface LectureCardSummary extends LectureSummary {
  cardId: string;
  stampCount: number;
  thumbImagePath?: string;
  mytrainingId?: string;
  difficultyLevel: DifficultyLevel;
  hasCommunity?: boolean;
  communityId?: string;
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
  };
}
