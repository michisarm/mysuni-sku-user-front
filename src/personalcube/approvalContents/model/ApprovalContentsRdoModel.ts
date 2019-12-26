import { decorate, observable } from 'mobx';
import { CubeType, CubeState } from 'shared';

export class ApprovalContentsRdoModel {

  serviceType?: string;                     // PersonalCube | Course
  cubeType?: CubeType;          // cube 일 경우
  college?: string;
  channel?: string;
  cubeState?: CubeState;
  name?: string;
  creatorName?: string;
  startDate?: number;
  endDate?: number;
  limit?: number = 20;
  offset?: number = 0;

  constructor(approvalContents?: ApprovalContentsRdoModel) {
    if (approvalContents) {
      Object.assign(this, { ...approvalContents });
    }
  }
}

decorate(ApprovalContentsRdoModel, {
  serviceType: observable,
  cubeType: observable,
  college: observable,
  channel: observable,
  cubeState: observable,
  name: observable,
  creatorName: observable,
  startDate: observable,
  endDate: observable,
  limit: observable,
  offset: observable,
});

