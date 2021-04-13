import { axiosApi as axios } from '@nara.platform/accent';
import { ChannelModel } from '../../model/ChannelModel';

const BASE_URL = '/api/college/channels';

export function findChannel(channelId: string): Promise<ChannelModel | undefined> {
  const url = `${BASE_URL}/${channelId}`;
  return axios.get<ChannelModel>(url).then(response => (response && response.data) || null);
}

export default class ChannelApi {
  URL = '/api/college/channels';

  static instance: ChannelApi;


  findChannel(channelId: string) {
    //
    return axios.get<ChannelModel>(this.URL + `/${channelId}`)
      .then(response => response && response.data || null);
  }

  findAllChannel() {
    //
    return axios.get<ChannelModel[]>(this.URL)
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  findChannelByName(name: string) {
    //이름으로 채널 검색
    return axios.get<ChannelModel[]>(this.URL + `/byName?name=${name}`)
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }
}

Object.defineProperty(ChannelApi, 'instance', {
  value: new ChannelApi(),
  writable: false,
  configurable: false,
});
