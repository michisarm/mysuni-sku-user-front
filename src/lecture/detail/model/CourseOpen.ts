import CourseState from './CourseState';
import IdName from './IdName';
import SearchFilter from './SearchFilter';

export default interface CourseOpen {
  courseState: CourseState;
  searchFilter: SearchFilter;
  subsidiaries: IdName[];
  requiredSubsidiaries: IdName[];
  tags: string[];
}
