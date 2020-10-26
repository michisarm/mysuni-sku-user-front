import EnrolledState from './EnrolledState';
import JoinRequest from './JoinRequest';
import LearningState from './LearningState';
import ProposalState from './ProposalState';
import ServiceType from './ServiceType';
import StudentScore from './StudentScore';

export default interface Student {
  name: string;
  email: string;
  company: string;
  department: string;
  proposalState: ProposalState;
  learningState: LearningState;
  sessionId: string;
  isFinishMedia: boolean;
  studentScore: StudentScore;
  creationTime: number;
  updateTime: number;
  programLectureUsid: string;
  courseLectureUsid: string;
  joinRequests: JoinRequest[];
  markComplete: boolean;
  rollBookId: string;
  examAttendance: boolean;
  updateTimeForTest: number;
  homeworkFileBoxId?: string;
  homeworkContent: string | null;
  homeworkOperatorComment: string | null;
  homeworkOperatorFileBoxId: string | null;
  durationViewSeconds: string;
  stamped: boolean;
  lectureUsid: string;
  serviceType: ServiceType;
  phaseCount: number;
  completePhaseCount: number;
  leaderEmails: string[];
  url: string;
  enrolledState: EnrolledState;
}
