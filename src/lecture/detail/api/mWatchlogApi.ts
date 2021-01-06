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

// 멀티시청 제한 param = patronKeyString, state, lectureId
// state = start:시작, 중간 end:종료
// lectureId = 시청중인 ID
// return = false:중복시청, true:시청가능
export function multiVideoOverlap(
  patronKeyString: String | undefined,
  viewState: String,
  usid: String
): Promise<string> {
  const url = `${BASE_URL}/videoOverlap?patronKeyString=${patronKeyString}&state=${viewState}&usid=${usid}`;
  const rtn = axiosApi
    .get<string>(url)
    .then(response => response && response.data);
  return rtn;
}
