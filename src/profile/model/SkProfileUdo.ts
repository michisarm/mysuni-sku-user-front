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
  // bgImage   : string = '';
  // introduce : string = '';
  // nameFlag  : string = '';    // 닉네임/실명 여부 플래그(R: 실명 ,  N: 닉네임)
  backgroundImagePath   : string = '';
  selfIntroduction : string = '';
  displayNicknameFirst  : boolean = false;    // 닉네임/실명 여부 플래그(F: 실명 / T: 닉네임)

  constructor(
    // currentJobGroupModel?: CurrentJobGroupModel,
    // favoriteJobGroupModel?: FavoriteJobGroupModel,
    pisAgreement?: PisAgreementModel,
    nickName?: string,
    backgroundImagePath?: string,
    selfIntroduction?: string,
    displayNicknameFirst?: boolean,
  ) {
    // if (currentJobGroupModel) {
    //   this.currentJobGroup = currentJobGroupModel;
    // }
    // if (favoriteJobGroupModel) {
    //   this.favoriteJobGroup = favoriteJobGroupModel;
    // }
    if (pisAgreement) {
      this.pisAgreement = pisAgreement;
    }
    if(nickName){
      this.nickName = nickName;
    }
    if(backgroundImagePath){
      this.backgroundImagePath = backgroundImagePath;
    }
    if(selfIntroduction){
      this.selfIntroduction = selfIntroduction;
    }
    if(displayNicknameFirst){
      this.displayNicknameFirst = displayNicknameFirst;
    }
  }

  static fromPisAgreement(pisAgreement: PisAgreementModel) {
    //
    // return new SkProfileUdo({} as any, {} as any, pisAgreement, '' as string);
    return new SkProfileUdo( pisAgreement, '' as string);
  }
}

decorate(SkProfileUdo, {
  currentJobGroup: observable,
  favoriteJobGroup: observable,
  pisAgreement: observable,
  nickName: observable,
  backgroundImagePath: observable,
  selfIntroduction: observable,
  displayNicknameFirst: observable,
});

export default SkProfileUdo;
