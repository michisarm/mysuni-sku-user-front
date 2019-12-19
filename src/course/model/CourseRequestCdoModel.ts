import { decorate, observable } from 'mobx';
import { IdName } from 'shared';
import { CourseState } from '../../shared/model/CourseState';

export class CourseRequestCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  course: IdName = new IdName();
  actor: IdName = new IdName();
  courseState: CourseState = CourseState.OpenApproval;
  remark: string = '';
}

decorate(CourseRequestCdoModel, {
  audienceKey: observable,
  course: observable,
  actor: observable,
  courseState: observable,
  remark: observable,
});
