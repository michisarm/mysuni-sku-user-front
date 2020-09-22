
class BadgeDetailModel {
  //
  id: string = '';
  cineroomId: string = '';
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
  mainCategoryId: string = '';
  mainCategoryName: string = '';
  badgeType: string = '';
  badgeState: string = '';
  difficultyLevel: string = '';

  subCategories: {
    id: number,
    categoryId: string,
    name: string,
    parentId: string,
    parentName: string,
    iconUrl: string,
  } = {
    id: -1,
    categoryId: '',
    name: '',
    parentId: '',
    parentName: '',
    iconUrl: '',
  };

  constructor(onebadge?: BadgeDetailModel | null) {
    //
    if (onebadge) {
      Object.assign(this, {...onebadge});
    }
  }
}

export default BadgeDetailModel;
