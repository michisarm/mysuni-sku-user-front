import { EnrolledState } from './EnrolledState';
import { JoinRequest } from './JoinRequest';
import { LearningState } from './LearningState';
import { ProposalState } from './ProposalState';
import { StudentScore } from './StudentScore';
import { StudentType } from './StudentType';
import { ExtraTask } from './ExtraTask';

export default interface Student {
  id: string;
  name: string;
  proposalState: ProposalState;
  learningState: LearningState;
  sessionId: string;
  isFinishMedia: boolean;
  studentScore: StudentScore;
  creationTime: number;
  updateTime: number;
  lectureId: string;
  cardId: string;
  joinRequests: JoinRequest[];
  complete: boolean;
  round: number;
  examAttendance: boolean;
  updateTimeForTest: number;
  homeworkFileBoxId?: string;

  sumViewSeconds: string;
  durationViewSeconds: string;
  stamped: boolean;
  studentType: StudentType;
  phaseCount: number;
  completePhaseCount: number;
  enrolledState: EnrolledState;
  homeworkContent: string | null;
  homeworkOperatorComment: string | null;
  homeworkOperatorFileBoxId: string | null;
  hideYn: boolean;
  extraWork: ExtraTask;
}
