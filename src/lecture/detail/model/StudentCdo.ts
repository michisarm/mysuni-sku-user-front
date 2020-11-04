import ProposalState from './ProposalState';

export default interface StudentCdo {
  rollBookId: string;
  name: string;
  email: string;
  company: string;
  department: string;
  proposalState: ProposalState;
  programLectureUsid: string;
  courseLectureUsid: string;
  leaderEmails: string[];
  url: string;
  enClosed?: boolean;
  classroomId: string;
  approvalProcess?: boolean;
}
