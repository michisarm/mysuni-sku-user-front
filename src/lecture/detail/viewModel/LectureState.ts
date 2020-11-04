import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import ProposalState from '../model/ProposalState';

export type State = 'None' | 'Progress' | 'Completed';

export default interface LectureState {
  state: State;
  learningState: LearningState;
  proposalState: ProposalState;
  type: CubeType;
  hideAction?: boolean;
  hideState?: boolean;
  canAction?: boolean;
  actionText?: string;
  action?: () => void;
  stateText?: string;
  classroomSubmit?: (round: number, classroomId: string) => void;
}
