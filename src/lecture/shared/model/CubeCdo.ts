import { CubeType } from '../../../shared/model';
import { CardCategory } from '../../../shared/model/CardCategory';
import DifficultyLevel from '../LectureSubInfo/model/Level';
import { CubeMaterial } from '../../model/CubeMaterial';

export interface CubeCdo {
  id: string;
  patronKey: {
    keyString: string;
  };
  personalCubeId: string;
  categories: CardCategory[];
  description: {
    applicants: string;
    completionTerms: string;
    description: string;
    goal: string;
    guide: string;
  };
  difficultyLevel: DifficultyLevel;
  fileBoxId: string;
  instructors: [
    {
      instructorId: string;
      instructorLearningTime: number;
      lectureTime: number;
      representative: true;
      round: number;
    }
  ];
  learningTime: number;
  materialSdo: CubeMaterial;
  name: string;
  operator: { keyString: string };
  organizerId: string;
  otherOrganizerName: string;
  reportFileBox: {
    report: boolean;
    reportName: string;
    reportQuestion: string;
  };
  sharingCineroomIds: string[];
  surveyId: string | null;
  tags: string[];
  tests: [
    {
      examTitle: string;
      paperId: string;
      successPoint: number;
      testId: string;
    }
  ];
  type: CubeType;
}
