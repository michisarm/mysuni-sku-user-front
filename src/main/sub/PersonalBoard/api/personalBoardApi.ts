import { axiosApi, NameValueList } from '@nara.platform/accent';
import BadgeFilterRdoModel from 'certification/ui/model/BadgeFilterRdoModel';
import moment from 'moment';
import { LearningGoal } from 'profile/model/LearningGoal';
import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import { AxiosReturn } from '../../../../shared/api/AxiosReturn';
import { CollegePercentData } from '../model/CollegePercent';
import { CountAttendance } from '../model/CountAttendance';
import { MyCompanyPopularCourseItem } from '../model/LectureMyCompanyPopularCourse';
import AttendEvent from '../viewModel/AttendEvent';
import LearningObjectives from '../viewModel/LearningObjectives';
import { findMyLearningSummaryByYearCache } from '../../../../myTraining/present/apiclient/MyLearningSummaryApi';
import { TotalLearningTimeRdo } from '../model/TotalLearningTimeRdo';

// const badgeURl = '/api/badge'
const flowURL = '/api/mytraining/summaries/flow';
const eventURL = '/api/event';

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

//목표설정
export function getBadgeLearningCompanyAvg(companyCode: string, year: number) {
  return axiosApi
    .get<any>(`/api/statistics/companyAverage/${companyCode}/${year}`)
    .then((response) => response && response.data);
}

// export function findTotalMyLearningSummary() {
//   return axiosApi.get<MyLearningSummaryModel>(flowURL)
//     .then(response => response && response.data);
// }

export function findMyLearningSummaryYear() {
  const year = moment().format('YYYY');
  return findMyLearningSummaryByYearCache(year);
}

//우리회사인기코스
export function getPopularCourse(companyCode: string, date: number) {
  return axiosApi
    .get<MyCompanyPopularCourseItem[]>(
      `/api/lecture/personalBoard/companyCardStatistics/${companyCode}/${date}`
    )
    .then((response) => {
      return response && response.data;
    });
}

//최근학습중인 채널
export function getRecentlyLearningChannel() {
  return axiosApi
    .get<any>(`/api/mytraining/mytraining/mytrainings/channel`)
    .then((response) => response && response.data);
}

//목표설정
export function findLearningObjectives() {
  return (
    axiosApi
      // .get<any>(`/api/profile/profiles`)
      .get<any>(`/api/user/users/withAdditionalInfo`)
      .then((response) => response && response.data)
  );
}

//목표설정
// export function updateLearningObjectives(nameValues: NameValueList) {
//   return (
//     axiosApi
//       // .put<any>(`/api/profile/profiles`, {
//       .put<any>(`/api/user/users/additionalInfo`, {
//         learningGoal: {
//           attendance: item.WeekAttendanceGoal,
//           dailyTime: {
//             hours: item.DailyLearningTimeHour,
//             minutes: item.DailyLearningTimeMinute,
//           },
//           hour: item.AnnualLearningObjectives,
//         },
//       })
//       .then((response) => response && response.data)
//   );
// }

//0812 updateAdditionalInfo 수정 추가
export function updateLearningObjectives(
  learningGoal: NameValueList
): Promise<LearningGoal> {
  return axiosApi
    .put<LearningGoal>('/api/user/users/additionalInfo', learningGoal)
    .then((response) => response && response.data);
}

//college별 학습 비중
export function findTotalLearningTime() {
  const year = moment().format('YYYY');
  return axiosApi
    .get<TotalLearningTimeRdo>(`/api/learning/learningTimes/total?year=${year}`)
    .then(AxiosReturn);
}

//이벤트 정보 조회
export function findAttendEvent() {
  return axiosApi.get<AttendEvent>(eventURL + `/attend`).then(AxiosReturn);
}

//출석횟수 조회
export function getAttend(id: string) {
  return axiosApi
    .get<any>(eventURL + `/attend/attendance/${id}`)
    .then((response) => {
      return response && response.data;
    });
}

//출석횟수, 오늘 출석 여부 조회
export function getCountAttendance(id: string) {
  return axiosApi
    .get<CountAttendance>(`${eventURL}/attend/attendance/${id}/count`)
    .then(AxiosReturn);
}

//출석
export function updateAttend(id: string) {
  return axiosApi
    .post<any>(eventURL + `/attend/attendance/${id}`)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      console.log('error', error);
    });
}

//이메일 암호화
export function encryptEmail(eventId: string) {
  return axiosApi
    .get<string>(
      eventURL + `/attend/attendance/${eventId}/encrypt/UNIVtomorrow`
    )
    .then((response) => {
      return response && response.data;
    });
}

// 프로모션 이벤트 저장
export function registerPromotionEvent(eventId: string) {
  return axiosApi
    .post<any>(eventURL + `/promotion/${eventId}`)
    .then((response) => {
      return response && response.data;
    });
}
