import { IdNameApproval } from '../../shared/model/IdNameApproval';
import { ProposalState } from './ProposalState';

export class StudentRequestCdoModel {
  //
  students: string[] = [];
  actor: IdNameApproval = new IdNameApproval();
  proposalState: ProposalState = ProposalState.Submitted;
  remark: string = '';
}
