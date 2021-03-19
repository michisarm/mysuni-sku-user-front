import { axiosApi } from "@nara.platform/accent";
import { patronInfo } from "@nara.platform/dock";

//대쉬보드 문구
export function getRecentlyStudyChannel() {
  return axiosApi.get<any>(`/api/mytraining/mytraining/mytrainings/channel`)
    .then(response => {
      return response && response.data
    });
}
