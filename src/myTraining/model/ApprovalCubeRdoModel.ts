import { decorate, observable } from 'mobx';
import { ProposalState } from '../../shared/model';

class ApprovalCubeRdoModel {
  //
  offset: number = 0;
  limit: number = 0;
  orderBy: string = '';
  proposalState: ProposalState = ProposalState.Submitted;
  lectureCardId: string = '';
  endDate: number = 0;
  startDate: number = 0;

  constructor(approvalCubeRdo?: ApprovalCubeRdoModel) {
    //
    if (approvalCubeRdo) {
      Object.assign(this, { ...approvalCubeRdo });
    }
  }

  static new(offset: number,
    limit: number,
    orderBy: string,
    proposalState: ProposalState,
    lectureCardId: string,
    endDate: number) {
    //
    return new ApprovalCubeRdoModel({
      offset,
      limit,
      orderBy,
      proposalState,
      lectureCardId,
      endDate,
      startDate: 0,
    });
  }

  static newDefault(limit: number, offset: number) {
    //
    const orderBy: string = '';
    const proposalState: ProposalState = ProposalState.Submitted;
    const lectureCardId: string = '';
    const endDate: number = 0;
    return new ApprovalCubeRdoModel({
      offset,
      limit,
      orderBy,
      proposalState,
      lectureCardId,
      endDate,
      startDate: 0,
    });
  }
}

decorate(ApprovalCubeRdoModel, {
  offset: observable,
  limit: observable,
  orderBy: observable,
  proposalState: observable,
  lectureCardId: observable,
  endDate: observable,
});

export default ApprovalCubeRdoModel;
