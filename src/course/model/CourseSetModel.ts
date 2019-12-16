import { decorate, observable } from 'mobx';
import { CourseSetType } from './CourseSetType';
import { LearningCardSetModel } from './LearningCardSetModel';
import { ProgramSetModel } from './ProgramSetModel';


export class CourseSetModel {
  //
  type: CourseSetType = CourseSetType.Card;
  learningCardSet: LearningCardSetModel = new LearningCardSetModel();
  programSet: ProgramSetModel = new ProgramSetModel();

  constructor(courseSet?: CourseSetModel) {
    if (courseSet) {
      const learningCardSet = courseSet.learningCardSet && new LearningCardSetModel(courseSet.learningCardSet) || this.learningCardSet;
      const programSet = courseSet.programSet && new ProgramSetModel(courseSet.programSet) || this.programSet;

      Object.assign(this, { ...courseSet, learningCardSet, programSet });
    }

  }
}

decorate(CourseSetModel, {
  type: observable,
  learningCardSet: observable,
  programSet: observable,
});
