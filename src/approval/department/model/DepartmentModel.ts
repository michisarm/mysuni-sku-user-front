import { decorate, observable } from 'mobx';
import { LangStrings, IdName } from 'shared/model';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface DepartmentChartModel {
  chartDisplayed: boolean;
  chartId: string;
  code: string;
  id: string;
  level: number;
  managerId: string;
  name: PolyglotString;
  parentCode: string;
  sortOrder: string;
}

export interface DepartmentApiModel {
  id: string;
  name: PolyglotString;
  companyName: PolyglotString;
  departmentName: PolyglotString;
  email: string;
  photoImagePath: string;
}

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
  // manager: IdName = new IdName();
  managerId: string = '';

  constructor(department?: DepartmentModel) {
    if (department) {
      const names = new LangStrings(department.names);
      // const manager = new IdName(department.manager);
      Object.assign(this, { ...department, names });
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
  managerId: observable,
  // manager: observable,
});
