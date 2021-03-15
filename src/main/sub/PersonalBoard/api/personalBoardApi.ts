import { axiosApi } from "@nara.platform/accent";
import BadgeCountModel from "certification/ui/model/BadgeCountModel";
import BadgeFilterRdoModel from "certification/ui/model/BadgeFilterRdoModel";
import moment from "moment";
import MyLearningSummaryModel from "myTraining/model/MyLearningSummaryModel";
import { CollegePercentData } from "../model/CollegePercent";
import { MyCompanyPopularCourseItem } from "../model/LectureMyCompanyPopularCourse";
import LearningObjectives from "../viewModel/LearningObjectives";

const badgeURl = '/api/badge'
const flowURL = '/api/mytraining/summaries/flow';

export function getCountOfBadges() {
  const params = {
    patronKeyString: BadgeFilterRdoModel.getPatonKey(),
  };

  return axiosApi
    .get<BadgeCountModel>(badgeURl + '/mybadges/flow/tab-count', {
      params,
    })
    .then(response => (response && response.data) || null)
    .catch(error => null);
}

//목표설정
export function getBadgeLearningCompanyAvg(companyCode: string) {
  return axiosApi.get<any>(`/api/mytraining/companyAverage/${companyCode}`)
    .then(response => response && response.data);
}

export function findTotalMyLearningSummary() {
  return axiosApi.get<MyLearningSummaryModel>(flowURL)
    .then(response => response && response.data);
}

export function findMyLearningSummaryYear() {
  const year = moment().format('YYYY');
  return axiosApi.get<any>(flowURL + `/${year}`)
  .then(response => response && response.data);
}

//우리회사인기코스
export function getPopularCourse(companyCode: string, date: number) {
  return axiosApi.get<MyCompanyPopularCourseItem[]>(`/api/lecture/courseStatistics/${companyCode}/${date}`)
    .then(response => {
      return response && response.data
    });
}

//최근학습중인 채널
export function getRecentlyLearningChannel() {
  return axiosApi.get<any>(`/api/mytraining/mytraining/mytrainings/channel`)
    .then(response => response && response.data);
}

//목표설정
export function findLearningObjectives() {
  return axiosApi.get<any>(`/api/profile/profiles`)
    .then(response => response && response.data);
}

//목표설정
export function updateLearningObjectives(item: LearningObjectives) {
  return axiosApi.put<any>(`/api/profile/profiles`,{
    goal: { 
      attendance: item.WeekAttendanceGoal,
      dailyTime: {
        hours: item.DailyLearningTimeHour,
        minutes: item.DailyLearningTimeMinute
      },
      hour: item.AnnualLearningObjectives
    }
  })
    .then(response => response && response.data);
}

//college별 학습 비중
export function getCollegePercent() {
  return axiosApi.get<CollegePercentData[]>(`/api/mytraining/mytraining/mytrainings/learningTime?patronKey=${BadgeFilterRdoModel.getPatonKey()}`)
  .then(response => {
    return response && response.data
  });
}