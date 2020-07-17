
class BadgeDetailModel {
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
    certiAdminCategoryName: ''
  };

  certiAdminSubcategory: {
    certiAdminSubcategory: string,
    certiAdminSubcategoryName: string,
  } = {
    certiAdminSubcategory: '',
    certiAdminSubcategoryName: ''
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

  constructor(onebadge?: BadgeDetailModel) {
    //
    if (onebadge) {
      Object.assign(this, {...onebadge});
    }
  }
}

export default BadgeDetailModel;
