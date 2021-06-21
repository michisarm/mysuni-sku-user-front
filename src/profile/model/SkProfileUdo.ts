import { decorate, observable } from 'mobx';
import CurrentJobGroupModel from './CurrentJobGroupModel';
import FavoriteJobGroupModel from './FavoriteJobGroupModel';
import PisAgreementModel from './PisAgreementModel';

class SkProfileUdo {
  //
  currentJobGroup: CurrentJobGroupModel = new CurrentJobGroupModel();
  favoriteJobGroup: FavoriteJobGroupModel = new FavoriteJobGroupModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();
  nickName  : string = '';
  bgImage   : string = '';
  introduce : string = '';
  nameFlag  : string = '';    // 닉네임/실명 여부 플래그(R: 실명 ,  N: 닉네임)

  constructor(
    currentJobGroupModel?: CurrentJobGroupModel,
    favoriteJobGroupModel?: FavoriteJobGroupModel,
    pisAgreement?: PisAgreementModel,
    nickName?: string,
    bgImage?: string,
    introduce?: string,
    nameFlag?: string,
  ) {
    if (currentJobGroupModel) {
      this.currentJobGroup = currentJobGroupModel;
    }
    if (favoriteJobGroupModel) {
      this.favoriteJobGroup = favoriteJobGroupModel;
    }
    if (pisAgreement) {
      this.pisAgreement = pisAgreement;
    }
    if(nickName){
      this.nickName = nickName;
    }
    if(bgImage){
      this.bgImage = bgImage;
    }
    if(introduce){
      this.introduce = introduce;
    }
    if(nameFlag){
      this.nameFlag = nameFlag;
    }
  }

  static fromPisAgreement(pisAgreement: PisAgreementModel) {
    //
    return new SkProfileUdo({} as any, {} as any, pisAgreement, '' as string);
  }
}

decorate(SkProfileUdo, {
  currentJobGroup: observable,
  favoriteJobGroup: observable,
  pisAgreement: observable,
  nickName: observable,
  bgImage: observable,
  introduce: observable,
  nameFlag: observable,
});

export default SkProfileUdo;
