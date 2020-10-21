import LearningState from './LearningState';
import ProposalState from './ProposalState';

export default interface StudentJoin {
  rollBookId: string;
  studentId: string;
  round: number;
  join: boolean;
  learningState: LearningState;
  proposalState: ProposalState;
  updateTime: number;
}
