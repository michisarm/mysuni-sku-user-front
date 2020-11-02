import { axiosApi } from '@nara.platform/accent';
import Watchlog from '../model/Watchlog';

const BASE_URL = '/api/watch-log-collector';

// 결과값 확인 후 any 수정 예정
// 동영상 진도율 등록
export function registerWatchLog(watchlog: Watchlog): Promise<any> {
  const url = `${BASE_URL}/watchLog`;
  return axiosApi
    .post<any>(url, watchlog)
    .then(response => response && response.data);
}

// 동영상 진도율 리스트 조회
export function findWatchLogList(
  patronKeyString: String,
  lectureUsid: String
): Promise<any> {
  const url = `${BASE_URL}/watchLog?patronKeyString=${patronKeyString}&lectureUsid=${lectureUsid}`;
  return axiosApi.get<any>(url).then(response => response && response.data);
}

// 동영상 시청 총 합계 초 조회
export function findSumViewSeconds(
  patronKeyString: String,
  lectureUsid: String
): Promise<any> {
  const url = `${BASE_URL}/watchLog/sumViewSeconds?patronKeyString=${patronKeyString}&lectureUsid=${lectureUsid}`;
  return axiosApi.get<any>(url).then(response => response && response.data);
}
