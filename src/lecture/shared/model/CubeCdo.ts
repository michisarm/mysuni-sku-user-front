import { CubeType } from '../../../shared/model';
import { CardCategory } from '../../../shared/model/CardCategory';
import DifficultyLevel from '../LectureSubInfo/model/Level';

export interface CubeCdo {
  id: string;
  patronKey: {
    keyString: string;
  };
  // cubeTerm: [  사용하게 될지 몰라 일단 주석으로 남겨둠(4/12)
  //   {
  //     displaySort: number;
  //     id: string;
  //     name: string;
  //     terms: [
  //       {
  //         concept: {
  //           displaySort: number;
  //           id: string;
  //           name: string;
  //           terms: [null];
  //         };
  //         createdTime: number;
  //         creatorName: string;
  //         id: string;
  //         modifiedTime: number;
  //         modifierName: string;
  //         name: string;
  //         synonymTag: string;
  //         value: {
  //           nameValues: [
  //             {
  //               name: string;
  //               value: string;
  //             }
  //           ];
  //         };
  //       }
  //     ];
  //   }
  // ];
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
  name: string;

  enabled: boolean;
  categories: CardCategory[];
  learningTime: number;
  time: number;
  defaultLanguage: null;
  hasTest: boolean;
  reportName: string | null;
  surveyCaseId: string | null;

  reportFileBox: {
    report: boolean;
    reportName: string;
    reportQuestion: string;
  };

  operator: { keyString: string };

  otherOrganizerName: string;
  sharingCineroomIds: string[];
  surveyId: string;
  tags: string;
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
