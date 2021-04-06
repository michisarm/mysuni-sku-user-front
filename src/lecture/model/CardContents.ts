import Test from 'lecture/detail/model/Test';
import { DatePeriod } from 'shared/model/DatePeriod';
import { Instructor } from './Instructor';
import { LearningContent } from './LearningContent';
import { Member } from './Member';
import OpenRequest from './OpenRequest';
import { PrerequisiteCard } from './PrerequisiteCard';
import { RelatedCard } from './RelatedCard';
import ReportFileBox from './ReportFileBox';

export interface CardContents {
  creatorName: string;
  learningPeriod: DatePeriod;
  surveyId: string;
  surveyCaseId: string;

  instructors: Instructor[];
  // admin 에서만 사용
  tests: Test[];

  relatedCards: RelatedCard[];
  cardOperator: Member;
  reportFileBox: ReportFileBox;

  learningContents: LearningContent[];
  prerequisiteCards: PrerequisiteCard[];

  communityId: string;
  openRequests: OpenRequest[];

  reviewFeedbackId: string;
  commentFeedbackId: string;
  validLearningDate: number;
  fileBoxId: string;

  time: number;
}
