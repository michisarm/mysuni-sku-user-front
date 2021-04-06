import LearningState from './LearningState';
import ProposalState from './ProposalState';

export default interface StudentJoin {
  studentId: string;
  round: number;
  join: boolean;
  cardId: string;
  cubeId: string;
  learningState: LearningState;
  proposalState: ProposalState;
  updateTime: number;
}
