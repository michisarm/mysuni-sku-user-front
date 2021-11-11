import { LangSupport } from 'lecture/model/LangSupport';
import { decorate, observable } from 'mobx';

class BannerModel {
  // id: string = '';
  // language: number = 0;
  // area: number = 0;
  intervalTime: number = 0;
  // creationTime: number = 0;
  // state: string = '';
  // name: string = '';
  creatorId: string = '';
  // creatorName: string = '';
  banners: {
    id: string;
    creationTime: number;
    creatorName: string;
    imageAlt: string;
    imageUrl: string;
    imageVersion: number;
    language: number;
    name: string;
    bgColor: string;
    patronKey: {
      keyString: string;
    };
    langSupports: LangSupport[];
    target: string;
    targetUrl: string;
    version: number;
  }[] = [];
  // groupBasedAccessRule: {
  //   accessRules?: [
  //     {
  //       groupSequences: [
  //         0
  //       ]
  //     }
  //   ],
  //   useWhitelistPolicy: true
  // }

  constructor(banner?: BannerModel) {
    if (banner) {
      Object.assign(this, banner);
    }
  }
}

decorate(BannerModel, {
  // totalCount: observable,
  banners: observable,
});

export default BannerModel;
