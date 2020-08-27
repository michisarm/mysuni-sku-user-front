
class MyBadgeModel {
  //
  id: number = -1;
  badgeId: string = '';
  name: string = '';
  iconUrl: string = '';
  autoIssued: boolean = false;
  additionTermsExist: boolean = false;

  certiAdminCategory: {
    certiAdminCategory: string,
    certiAdminCategoryName: string,
  } = {
    certiAdminCategory: '',
    certiAdminCategoryName:'',
  };

  certiAdminSubcategory: {
    certiAdminSubcategory: string,
    certiAdminSubcategoryName: string,
  } = {
    certiAdminSubcategory: '',
    certiAdminSubcategoryName:'',
  };

  mainCategoryId: string = '';
  mainCategoryName: string = '';
  badgeType: string = '';
  difficultyLevel: string = '';
  learningCompleted: boolean = false;
  challengeState: string = '';
  issueState: string = '';

  constructor(badge?: MyBadgeModel) {
    //
    if (badge) {
      Object.assign(this, { ...badge });
    }
  }
}

export default MyBadgeModel;
