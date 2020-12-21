import { axiosApi } from '@nara.platform/accent';
import WatchLog from '../model/Watchlog';

const BASE_URL = '/api/watch-log-collector';

// 결과값 확인 후 any 수정 예정
// 동영상 진도율 등록
export function registerWatchLog(watchlog: WatchLog): Promise<void> {
  const url = `${BASE_URL}/watchLog`;
  return axiosApi
    .post<void>(url, watchlog)
    .then(response => response && response.data);
}

// 동영상 진도율 리스트 조회
export function findWatchLogList(
  patronKeyString: String,
  lectureUsid: String
): Promise<WatchLog[]> {
  const url = `${BASE_URL}/watchLog?patronKeyString=${patronKeyString}&lectureUsid=${lectureUsid}`;
  return axiosApi
    .get<WatchLog[]>(url)
    .then(response => response && response.data);
}

// 동영상 시청 총 합계 초 조회
export function findSumViewSeconds(
  patronKeyString: String,
  lectureUsid: String
): Promise<number> {
  const url = `${BASE_URL}/watchLog/sumViewSeconds?patronKeyString=${patronKeyString}&lectureUsid=${lectureUsid}`;
  return axiosApi.get<number>(url).then(response => response && response.data);
}

// 동영상 중복 시청불가
// viewState : start=시작시 end=종료시 view=시청중
export function multiVideoOverlap(
  patronKeyString: String,
  viewState: String
): Promise<string> {
  const url = `${BASE_URL}/videoOverlap?patronKeyString=${patronKeyString}&state=${viewState}`;
  const rtn = axiosApi.get<string>(url).then(response => response && response.data);
  console.log('2222222222222222222222222222222222222222222222222222:',rtn)
  return rtn;
}
