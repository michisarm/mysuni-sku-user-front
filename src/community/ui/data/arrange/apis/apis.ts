import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { getAxios } from '../../../../packages/api/getAxios';
import { BannerBundleWithBannerRom } from '../models/BannerBundleWithBannerRom';
import { PageElement } from '../models/PageElement';

const BASE_URL = '/api/arrange';

export function findLatestBannerBundles(top: boolean = false) {
  const axios = getAxios();
  const url = `${BASE_URL}/bannerBundles/latest?top=${top}`;
  return axios.get<BannerBundleWithBannerRom>(url).then(AxiosReturn);
}

export function findAvailablePageElements() {
  const axios = getAxios();
  const url = `${BASE_URL}/pageElements/available`;
  return axios.get<PageElement[]>(url).then(AxiosReturn);
}
