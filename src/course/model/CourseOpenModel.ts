import { decorate, observable } from 'mobx';
import { IdName } from 'shared';
import { SearchFilter } from 'personalcube/personalcube';
import { CourseState } from './CourseState';

export class CourseOpenModel {
  //
  courseState: CourseState = CourseState.Created;
  searchFilter: SearchFilter = SearchFilter.SearchOff;
  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  tags: string[] = [];

  constructor(courseOpen?: CourseOpenModel) {
    if (courseOpen) {
      Object.assign(this, { ...courseOpen });
    }
  }
}

decorate(CourseOpenModel, {
  courseState: observable,
  searchFilter: observable,
  subsidiaries: observable,
  requiredSubsidiaries: observable,
  tags: observable,
});
