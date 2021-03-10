import { axiosApi } from "@nara.platform/accent";

//대쉬보드 문구
export function getRecentlyStudyChannel() {
  return axiosApi.get<any>(`/api/mytraining/mytraining/mytrainings/channel?patronKey=r57s%40ne1-m2`)
    .then(response => response && response.data);
}
