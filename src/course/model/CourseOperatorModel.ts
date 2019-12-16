import { decorate, observable } from 'mobx';

export class CourseOperatorModel {
  //
  employeeId: string = '';
  email: string = '';
  name: string = '';
  company : string = '';

  constructor(courseOperator?: CourseOperatorModel) {
    if (courseOperator) {
      Object.assign(this, { ...courseOperator });
    }
  }
}

decorate(CourseOperatorModel, {
  employeeId: observable,
  email: observable,
  name: observable,
  company: observable,
});
