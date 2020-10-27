import IconBox from 'lecture/detail/model/IconBox';
import LectureSummary from './LectureSummary';

export default interface LectureCourseSummary extends LectureSummary {
  stampCount: number;
  iconBox: IconBox;
}
