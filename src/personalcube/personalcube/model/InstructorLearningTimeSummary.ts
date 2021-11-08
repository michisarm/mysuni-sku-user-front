import { CollegeId } from 'shared/model/CollegeId';
import { InstructorTime } from './InstructorTime';

export interface InstructorLearningTimeSummary {
  currentYearCollegeInstructorLearningTimes: InstructorTime[];
  sumOfCurrentYearInstructorLearningTime: number;
  totalInstructorLearningTime: number;
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

export function getCollegeTime(
  instructorLearningTimeSummary?: InstructorLearningTimeSummary
): collegeTime {
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

  if (instructorLearningTimeSummary !== undefined) {
    instructorLearningTimeSummary.currentYearCollegeInstructorLearningTimes.forEach(
      (learning) => {
        switch (learning.collegeId) {
          case CollegeId.AI:
            aiCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.DT:
            dtCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.HAPPINESS:
            happyCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.SV:
            svCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.DESIGN:
            designCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.GLOBAL:
            globalCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.LEADERSHIP:
            leadershipCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.MANAGEMENT:
            managementCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.SEMICONDUCTOR:
            semiconductorCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.ENERGYSOLUTION:
            energySolutionCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.BM_DESIGNER:
            bmDesignerCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.SKACADEMY:
            skAcademyCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.SKMANAGEMENT:
            skManagementCollegeTime = learning.instructorLearningTime;
            break;
          case CollegeId.LIFESTYLE:
            lifeStyleCollegeTime = learning.instructorLearningTime;
            break;
        }
      }
    );
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
    lifeStyleCollegeTime,
  };
}
