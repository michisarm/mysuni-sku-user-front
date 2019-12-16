import { NameValueList } from '../../shared/model/NameValueList';
import { CoursePlanModel } from './CoursePlanModel';
import { CoursePlanContentsModel } from './CoursePlanContentsModel';

export class CoursePlanFlowUdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  coursePlanValues: NameValueList = new NameValueList();
  coursePlanContentsValues: NameValueList = new NameValueList();

  constructor(course: CoursePlanModel, courseContents: CoursePlanContentsModel) {
    //
    const coursePlanValues = CoursePlanModel.asNameValues(course);
    const coursePlanContentsValues = CoursePlanContentsModel.asNameValues(courseContents);

    Object.assign(this, { coursePlanValues, coursePlanContentsValues });
  }
}
