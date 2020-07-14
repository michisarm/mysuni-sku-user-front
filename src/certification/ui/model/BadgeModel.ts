
import { computed, decorate, observable } from 'mobx';
import {CategoryModel} from "../../../shared/model";
import {patronInfo} from "@nara.platform/dock/src/snap/snap";


class BadgeModel {
  //
  id: number = -1;
  badgeId: string = '';
  name: string = '';
  iconUrl: string = '';
  autoIssued: boolean = false;
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

  mainCategoryId: string = '';
  mainCategoryName: string = '';
  badgeType: string = '';
  difficultyLevel: string = '';
  learningCompleted: boolean = false;
  challengeState: string = '';
  issueState: string = '';

  constructor(badge?: BadgeModel) {
    //
    if (badge) {
      Object.assign(this, { ...badge });
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

decorate(BadgeModel, {
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

export default BadgeModel;
