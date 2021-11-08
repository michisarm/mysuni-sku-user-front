import { InstructorTime } from './InstructorTime';

export interface InstructorLearningTimeSummary {
  currentYearCollegeInstructorLearningTimes: InstructorTime[];
  sumOfCurrentYearInstructorLearningTime: number;
  totalInstructorLearningTime: number;
}
