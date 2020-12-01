import { ApprovalMemberModel } from '../../../approval/member/model/ApprovalMemberModel';
import { ClassroomModel } from '../../../personalcube/classroom/model';
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
  coreAction?: () => void;
  stateText?: string;
  actionClassName: string;
  stateClassName: string;
  href?: string;
  classroomSubmit?: (
    classroom: ClassroomModel,
    member?: ApprovalMemberModel
  ) => void;
}
