import { axiosApi } from "@nara.platform/accent";
import BadgeCountModel from "certification/ui/model/BadgeCountModel";
import BadgeFilterRdoModel from "certification/ui/model/BadgeFilterRdoModel";

const badgeURl = '/api/badge'
const flowURL = '/api/mytraining/summaries/flow';

// export function getCountOfBadges() {
//   const params = {
//     patronKeyString: BadgeFilterRdoModel.getPatonKey(),
//   };

//   return axiosApi
//     .get<BadgeCountModel>(badgeURl + '/mybadges/flow/tab-count', {
//       params,
//     })
//     .then(response => (response && response.data) || null)
//     .catch(error => null);
// }

//대쉬보드 문구
export function getDashBoardSentence() {
  console.log('getDashBoardSentence')
  return axiosApi.get<any>(`/api/mytraining/companyAverage/`)
    .then(response => response && response.data);
}
