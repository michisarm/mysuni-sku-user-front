import { decorate, observable } from 'mobx';
import { CreatorModel } from '../../personalcube/personalcube/model/CreatorModel';
import { SearchFilter } from '../../personalcube/personalcube/model/SearchFilter';
import { CubeState } from '../../personalcube/personalcube/model/CubeState';
import { CategoryModel } from '../../shared/model/CategoryModel';

export class ApprovalContents {
  serviceId: string = '';
  name: string = '';
  contentsType: string = '';
  category: CategoryModel = new CategoryModel();
  time: number = 0;
  creator: CreatorModel = new CreatorModel();
  cubeState: CubeState = CubeState.Created;
  searchFilter: SearchFilter = SearchFilter.SearchOff;

  constructor(approvalContents?: ApprovalContents) {
    if (approvalContents) {
      const channel = approvalContents.category && new CategoryModel(approvalContents.category) || this.creator;
      const creator = approvalContents.creator && new CreatorModel(approvalContents.creator) || this.creator;

      Object.assign(this, { ...approvalContents, channel, creator });
    }
  }
}

decorate(ApprovalContents, {
  serviceId: observable,
  name: observable,
  contentsType: observable,
  category: observable,
  time: observable,
  creator: observable,
  cubeState: observable,
  searchFilter: observable,
});
