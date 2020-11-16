import CourseSetType from './CourseSetType';
import ProgramSet from './ProgramSet';

export default interface CourseSet {
  type: CourseSetType;
  learningCardSet: ProgramSet;
  programSet: ProgramSet;
}
