import { decorate, observable } from 'mobx';
import { LangStrings, IdName } from 'shared/model';

export class DepartmentModel {
  //
  id: string = '';
  code: string = '';
  names: LangStrings = new LangStrings();
  parentCode: string = '';
  chartId: string = '';

  level: number = 0;
  sortOrder: string = '';
  chartDisplayed: boolean = false;
  manager: IdName = new IdName();

  constructor(department?: DepartmentModel) {
    if (department) {
      console.log(111);
      console.log(department);
      const names = new LangStrings(department.names);
      const manager = new IdName(department.manager);
      Object.assign(this, { ...department, names, manager });
    }
  }
}

decorate(DepartmentModel, {
  id: observable,
  code: observable,
  names: observable,
  parentCode: observable,
  chartId: observable,

  level: observable,
  sortOrder: observable,
  chartDisplayed: observable,
  manager: observable,
});
