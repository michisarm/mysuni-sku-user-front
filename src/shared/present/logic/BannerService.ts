import {
  IObservableArray,
  observable,
  action,
  computed,
  runInAction,
} from 'mobx';
import { autobind } from '@nara.platform/accent';
import BannerApi from '../apiclient/BannerApi';
import BannerModel from '../../model/BannerModel';
import { LangSupport } from 'lecture/model/LangSupport';

@autobind
class BannerService {
  //
  static instance: BannerService;

  private bannerApi: BannerApi;

  constructor(bannerApi: BannerApi) {
    this.bannerApi = bannerApi;
  }

  @observable
  _bannerInfo: BannerModel = new BannerModel();

  @observable
  _banners: {
    id: string; // 배너 고유 식별 ID
    language: number; // 적용되어 있는 배너의 언어
    // originId: number; // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
    name: string; // 배너의 제목
    imageUrl: string; // 배너 이미지 주소
    imageAlt: string; // 배너의 ALT 내용
    target: string; // _self, _blank, ...
    targetUrl: string; // 배너 클릭 시 이동될 주소
    langSupports: LangSupport[];
    // isUse: string; // 사용 유무 0: 사용안함, 1: 사용
    // creatorId: string; // 생성자 이메일
    imageVersion: number; // 이미지 버전 0: base64, 1: url
    creatorName: string; // 생성
    creationTime: number; // 생성일
    bgColor: string;
    patronKey: {
      keyString: string;
    };
    version: number;
  }[] = [];

  @observable
  _intervalTime: number = 7;

  @computed
  get bannerInfo(): BannerModel {
    return this._bannerInfo;
  }

  @computed
  get banners() {
    //
    return (this._bannerInfo.banners as IObservableArray).peek();
  }

  @computed
  get bannersCount() {
    //
    return this._bannerInfo.banners.length;
  }

  @computed
  get intervalTime() {
    return this._intervalTime;
  }

  @action
  clear() {
    this._bannerInfo.banners = [];
    // this._bannerInfo.code = '';
    // this._bannerInfo.message = '';
    // this._bannerInfo.totalCount = 0;
    this._bannerInfo.intervalTime = 7;
  }

  @action
  async findLatestBannerBundles() {
    const bannerList = await this.bannerApi.findLatestBannerBundles();

    if (bannerList && bannerList.banners && bannerList.banners.length > 0) {
      runInAction(() => {
        this._bannerInfo = Object.assign(
          Object.create(Object.getPrototypeOf(bannerList)),
          bannerList
        );

        this._banners = this.bannerInfo.banners;
        this._intervalTime = this._bannerInfo.intervalTime;
      });
    } else {
      this.clear();
    }

    return this._bannerInfo;
  }
}

BannerService.instance = new BannerService(BannerApi.instance);

export default BannerService;
