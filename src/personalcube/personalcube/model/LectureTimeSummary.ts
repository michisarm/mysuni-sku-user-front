import { CollegeLectureTime } from "./CollegeLectureTime";
import { CollegeId } from "../../../shared/model/CollegeId";

export interface LectureTimeSummary {
  collegeLectureTimes: CollegeLectureTime[];
  sumOfCurrentYearLectureTime: number;
  totalLectureTime: number;
}

export interface collegeTime {
  aiCollegeTime: number;
  dtCollegeTime: number;
  happyCollegeTime: number;
  svCollegeTime: number;
  designCollegeTime: number;
  globalCollegeTime: number;
  leadershipCollegeTime: number;
  managementCollegeTime: number;
  semiconductorCollegeTime: number;
  energySolutionCollegeTime: number;
  bmDesignerCollegeTime: number;
  skAcademyCollegeTime: number;
  skManagementCollegeTime: number;
  lifeStyleCollegeTime: number;
}

export function getCollegeTime(lectureTimeSummary?: LectureTimeSummary): collegeTime {
  let aiCollegeTime = 0;
  let dtCollegeTime = 0;
  let happyCollegeTime = 0;
  let svCollegeTime = 0;
  let designCollegeTime = 0;
  let globalCollegeTime = 0;
  let leadershipCollegeTime = 0;
  let managementCollegeTime = 0;
  let semiconductorCollegeTime = 0;
  let energySolutionCollegeTime = 0;
  let bmDesignerCollegeTime = 0;
  let skAcademyCollegeTime = 0;
  let skManagementCollegeTime = 0;
  let lifeStyleCollegeTime = 0;

  if (lectureTimeSummary !== undefined) {
    lectureTimeSummary.collegeLectureTimes.forEach(lectureTime => {
      switch (lectureTime.collegeId) {
        case CollegeId.AI:
          aiCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.DT:
          dtCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.HAPPINESS:
          happyCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.SV:
          svCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.DESIGN:
          designCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.GLOBAL:
          globalCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.LEADERSHIP:
          leadershipCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.MANAGEMENT:
          managementCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.SEMICONDUCTOR:
          semiconductorCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.ENERGYSOLUTION:
          energySolutionCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.BM_DESIGNER:
          bmDesignerCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.SKACADEMY:
          skAcademyCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.SKMANAGEMENT:
          skManagementCollegeTime = lectureTime.lectureTime;
          break;
        case CollegeId.LIFESTYLE:
          lifeStyleCollegeTime = lectureTime.lectureTime;
          break;
      }
    });
  }

  return {
    aiCollegeTime,
    dtCollegeTime,
    happyCollegeTime,
    svCollegeTime,
    designCollegeTime,
    globalCollegeTime,
    leadershipCollegeTime,
    managementCollegeTime,
    semiconductorCollegeTime,
    energySolutionCollegeTime,
    bmDesignerCollegeTime,
    skAcademyCollegeTime,
    skManagementCollegeTime,
    lifeStyleCollegeTime
  };
}