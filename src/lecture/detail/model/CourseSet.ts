import CourseSetType from './CourseSetType';
import LearningCardSet from './LearningCardSet';
import ProgramSet from './ProgramSet';

export default interface CourseSet {
  type: CourseSetType;
  learningCardSet: LearningCardSet;
  programSet: ProgramSet;
}
