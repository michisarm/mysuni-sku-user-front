import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import { DifficultyLevel } from './DifficultyLevel';
import { Instructor } from './Instructor';

export interface CubeContents {
  commentFeedbackId: string;
  creatorName: string;
  description: {
    applicants: PolyglotString;
    completionTerms: PolyglotString;
    description: PolyglotString;
    goal: PolyglotString;
    guide: PolyglotString;
  };
  difficultyLevel: DifficultyLevel;
  fileBoxId: string;
  id: string;
  instructors: {
    instructorId: string;
    representative: boolean;
    round: number;
    name?: string;
    memberSummary?: {
      employeeId: string;
      department: string;
      email: string;
      name: string;
      photoId: string;
    };
  }[];
  operator: { keyString: string };
  organizerId: string;
  otherOrganizerName: string;
  patronKey: {
    keyString: string;
  };
  reportFileBox: {
    report: boolean;
    fileBoxId: string;
    reportName: string;
    reportQuestion: string;
  };
  reviewFeedbackId: string;
  surveyId: string;
  tags: PolyglotString | null;
  terms: [
    {
      displaySort: number;
      id: string;
      name: string;
      terms: [
        {
          concept: {
            displaySort: number;
            id: string;
            name: string;
            terms: [null];
          };
          createdTime: number;
          creatorName: string;
          id: string;
          modifiedTime: number;
          modifierName: string;
          name: string;
          synonymTag: string;
          value: {
            nameValues: [
              {
                name: string;
                value: string;
              }
            ];
          };
        }
      ];
    }
  ];
  tests: [
    {
      examTitle: string;
      id: string;
      paperId: string;
      successPoint: number;
      testId: string;
    }
  ];
}
