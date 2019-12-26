import { decorate, observable } from 'mobx';
import { CategoryModel, CreatorModel } from 'shared';
import { DramaEntity, PatronKey } from '@nara.platform/accent';

export class ApprovalContentsModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  serviceId: string = '';
  name: string = '';
  contentsType: string = '';
  category: CategoryModel = new CategoryModel();
  time: number = 0;
  creator: CreatorModel = new CreatorModel();
  openState: string = '';
  searchFilter: string = '';

  constructor(approvalContents?: ApprovalContentsModel) {
    if (approvalContents) {
      const category = approvalContents.category && new CategoryModel(approvalContents.category) || this.category;
      const creator = approvalContents.creator && new CreatorModel(approvalContents.creator) || this.creator;
      Object.assign(this, { ...approvalContents, category, creator });
    }
  }
}

decorate(ApprovalContentsModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  serviceId: observable,
  name: observable,
  contentsType: observable,
  category: observable,
  time: observable,
  creator: observable,
  openState: observable,
  searchFilter: observable,
});

