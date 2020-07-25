
class BadgeModel {
  //
  id: string = '';
  cineroomId: string = '';
  badgeId: string = '';
  name: string = '';
  badgeType: string = '';

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

  mainCategoryId: string = '';
  mainCategoryName: string = '';
  difficultyLevel: string = '';
  autoIssued: boolean = false;
  additionTermsExist: boolean = false;
  iconUrl: string = '';
  learningTime: number = -1;
  qualification: string = '';
  obtainTerms: string = '';
  description: string = '';

  badgeOperator: {
    badgeOperatorId: string,
    badgeOperatorName: string,
    badgeOperatorCompany: string,
  } = {
    badgeOperatorId: '',
    badgeOperatorName: '',
    badgeOperatorCompany: '',
  };

  tags: string = '';
  searchable: boolean = false;

  designAdmin: {
    designAdminId: string,
    designAdminName: string,
    designAdminType: string,
  } = {
    designAdminId: '',
    designAdminName: '',
    designAdminType: '',
  };

  openRequest: {
    openRequesterId: string,
    openRequestTime: number,
  } = {
    openRequesterId: '',
    openRequestTime: -1,
  };

  openResponseTime: number = -1;
  badgeState: string = '';

  creator: {
    creatorId: string,
    creatorName: string,
  } = {
    creatorId: '',
    creatorName: '',
  };

  creationTime: number = -1;

  constructor(onebadge?: BadgeModel) {
    //
    if (onebadge) {
      Object.assign(this, {...onebadge});
    }
  }
}

export default BadgeModel;
