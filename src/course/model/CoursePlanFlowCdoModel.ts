import { CoursePlanCdoModel } from './CoursePlanCdoModel';
import { CoursePlanContentsCdoModel } from './CoursePlanContentsCdoModel';

export class CoursePlanFlowCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  coursePlanCdo: CoursePlanCdoModel = new CoursePlanCdoModel();
  coursePlanContentsCdo: CoursePlanContentsCdoModel = new CoursePlanContentsCdoModel();

  constructor(coursePlanCdo: CoursePlanCdoModel, coursePlanContentsCdo: CoursePlanContentsCdoModel) {
    //
    this.coursePlanCdo = coursePlanCdo;
    this.coursePlanContentsCdo = coursePlanContentsCdo;
  }
}
