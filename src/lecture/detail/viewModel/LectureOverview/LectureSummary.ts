import { Member } from '../../../model/Member';
import LectureCategory from './LectureCategory';

export default interface LectureSummary {
  name: string;
  category: LectureCategory;
  learningTime: string;
  operator: Member;
  passedStudentCount: number;
  studentCount: number;
}
