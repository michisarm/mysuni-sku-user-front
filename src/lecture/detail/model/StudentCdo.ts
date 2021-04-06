import { DenizenKey } from '@nara.platform/accent';
import ProposalState from './ProposalState';

export default interface StudentCdo {
  denizenKey?: DenizenKey;
  round: number;
  name: string;
  proposalState: ProposalState;
  enClosed?: boolean;
  classroomId: string;
  approvalProcess?: boolean;
}
