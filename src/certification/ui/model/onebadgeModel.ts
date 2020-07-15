
import { computed, decorate, observable } from 'mobx';


class onebadgeModel {
  //
  id: string = '';
  patronKeyString: string = '';
  badgeId: string = '';
  name: string = '';
  tags: string = '';
  iconUrl: string = '';
  learningTime: number = -1;
  creationTime: number = -1;
  autoIssued: boolean = false;
  additionTermsExist: boolean = false;
  searchable: boolean = false;

  qualification: string = '';
  obtainTerms: string = '';
  description: string = '';

  certiAdminCategory: {
    certiAdminCategory: string,
    certiAdminCategoryName: string,
  } = {
    certiAdminCategory: '',
    certiAdminCategoryName:''
  };

  certiAdminSubcategory: {
    certiAdminSubcategory: string,
    certiAdminSubcategoryName: string,
  } = {
    certiAdminSubcategory: '',
    certiAdminSubcategoryName:''
  };

  badgeOperator: {
    badgeOperatorId: string,
    badgeOperatorName: string,
    badgeOperatorCompany: string,
  } = {
    badgeOperatorId: '',
    badgeOperatorName: '',
    badgeOperatorCompany: '',
  };

  creator: {
    creatorId: string,
    creatorName: string
  } = {
    creatorId: '',
    creatorName: '',
  };

  openRequest: {
    openRequesterId: string,
    openRequestTime: number,
  } = {
    openRequesterId: '',
    openRequestTime: -1,
  };

  openResponseTime: number = -1;
  mainCategoryId: string = '';
  mainCategoryName: string = '';
  badgeType: string = '';
  badgeState: string = '';
  difficultyLevel: string = '';


  constructor(onebadge?: onebadgeModel) {
    //
    if (onebadge) {
      Object.assign(this, { ...onebadge });
    }
  }

  // @computed
  // get getBadgeName() {
  //   return this.name;
  // }
  //
  // @computed
  // get getBadgeType() {
  //   return this.badgeType;
  // }
  //
  // @computed
  // get getIconUrl() {
  //   return this.iconUrl;
  // }
}

decorate(onebadgeModel, {
  id: observable,
  badgeId: observable,
  name: observable,
  iconUrl: observable,
  certiAdminCategory: observable,
  certiAdminSubcategory: observable,
  mainCategoryId: observable,
  mainCategoryName: observable,
  badgeType: observable,
  difficultyLevel: observable,
});

export default onebadgeModel;
