import { axiosApi } from "@nara.platform/accent";

//대쉬보드 문구
export function getDashBoardSentence() {
  console.log('getDashBoardSentence')
  return axiosApi.get<any>(`/api/arrange/dashboardMessage/latelyDashboardMessage`)
    .then(response => response && response.data);
}
