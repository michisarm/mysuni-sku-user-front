import { getAxios } from '../../../../shared/api/Axios';
import { AxiosReturn } from '../../../../shared/api/AxiosReturn';
import { BannerBundleWithBannerRom } from '../model/BannerBundleWithBannerRom';

const BASE_URL = '/api/arrange';

export function findLatestBannerBundles(
  top: boolean = false
): Promise<BannerBundleWithBannerRom | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/bannerBundles/latest?top=${top}`;
  return axios.get<BannerBundleWithBannerRom>(url).then(AxiosReturn);
}
