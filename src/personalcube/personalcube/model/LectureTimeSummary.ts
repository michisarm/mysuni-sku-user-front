import { decorate, observable } from "mobx";

class LectureTimeSummary {
  //
  totalCollegeTime: number = 0;
  aiCollegeTime: number = 0;
  dtCollegeTime: number = 0;
  happyCollegeTime: number = 0;
  svCollegeTime: number = 0;
  designCollegeTime: number = 0;
  globalCollegeTime: number = 0;
  leadershipCollegeTime: number = 0;
  managementCollegeTime: number = 0;
  energySolutionCollegeTime: number = 0;
  semiconductorCollegeTime: number = 0;
  skManagementCollegeTime: number = 0;
  skAcademyCollegeTime: number = 0;
  lifeStyleCollegeTime: number = 0;

  constructor(lectureTimeSummary?: LectureTimeSummary) {
    if (lectureTimeSummary) {
      Object.assign(this, lectureTimeSummary);
    }
  }
}

export default LectureTimeSummary;

decorate(LectureTimeSummary, {
  totalCollegeTime: observable,
  aiCollegeTime: observable,
  dtCollegeTime: observable,
  happyCollegeTime: observable,
  svCollegeTime: observable,
  designCollegeTime: observable,
  globalCollegeTime: observable,
  leadershipCollegeTime: observable,
  managementCollegeTime: observable,
  energySolutionCollegeTime: observable,
  semiconductorCollegeTime: observable,
  skManagementCollegeTime: observable,
  skAcademyCollegeTime: observable,
  lifeStyleCollegeTime: observable
});