import { decorate, observable } from 'mobx';
import { ProposalState } from '../../shared/model';

class ApprovalCubeRdoModel {
  //
  offset: number = 0;
  limit: number = 0;
  sortOrder: string = 'ModifiedTimeDesc';
  proposalState: ProposalState = ProposalState.Submitted;
  cubeId: string = '';
  endDate: number = 9999999999999;
  startDate: number = 0;

  constructor(approvalCubeRdo?: ApprovalCubeRdoModel) {
    //
    if (approvalCubeRdo) {
      Object.assign(this, { ...approvalCubeRdo });
    }
  }

  static new(
    offset: number,
    limit: number,
    sortOrder: string,
    proposalState: ProposalState,
    cubeId: string,
    endDate: number
  ) {
    //
    return new ApprovalCubeRdoModel({
      offset,
      limit,
      sortOrder,
      proposalState,
      cubeId,
      endDate,
      startDate: 0,
    });
  }

  static newDefault(limit: number, offset: number) {
    //
    const sortOrder: string = 'ModifiedTimeDesc';
    const proposalState: ProposalState = ProposalState.Submitted;
    const cubeId: string = '';
    const endDate: number = 0;
    return new ApprovalCubeRdoModel({
      offset,
      limit,
      sortOrder,
      proposalState,
      cubeId,
      endDate,
      startDate: 0,
    });
  }
}

decorate(ApprovalCubeRdoModel, {
  offset: observable,
  limit: observable,
  sortOrder: observable,
  proposalState: observable,
  cubeId: observable,
  endDate: observable,
});

export default ApprovalCubeRdoModel;
