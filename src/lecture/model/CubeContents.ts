import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import { DifficultyLevel } from './DifficultyLevel';
import { Instructor } from './Instructor';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';

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
    instructorWithIdentity?: InstructorWithIdentity;
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
    reportName: PolyglotString;
    reportQuestion: PolyglotString;
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
