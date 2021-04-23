import { IdNameApproval } from '../../shared/model/IdNameApproval';
import { ProposalState } from './ProposalState';

export class StudentRequestCdoModel {
  //
  studentIds: string[] = [];
  actor: IdNameApproval = new IdNameApproval();
  proposalState: ProposalState = ProposalState.Submitted;
  remark: string = '';
}
