import { axiosApi } from '@nara.platform/accent';
import BannerModel from '../../model/BannerModel';

class BannerApi {
  //
  static instance: BannerApi;

  baseUrl =
    process.env.REACT_APP_ENVIRONMENT === undefined ||
    process.env.REACT_APP_ENVIRONMENT === 'server' ||
    process.env.REACT_APP_BANNER_API === undefined ||
    process.env.REACT_APP_BANNER_API === ''
      ? '/api/arrange'
      : process.env.REACT_APP_BANNER_API;

  findLatestBannerBundles() {
    return axiosApi
      .get<BannerModel>(this.baseUrl + '/bannerBundles/latest')
      .then(response => response && response.data);
  }
}

BannerApi.instance = new BannerApi();

export default BannerApi;
