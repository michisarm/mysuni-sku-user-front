import { decorate, observable } from 'mobx';
import { LectureApproval } from './LectureApproval';

export class MenuControlAuthModel {
  id: string = '';
  useApl: boolean = false;
  lectureApproval: LectureApproval = new LectureApproval();

  constructor(menuControlAuthModel?: MenuControlAuthModel) {
    if (menuControlAuthModel) {
      const lectureApproval = new LectureApproval(
        menuControlAuthModel.lectureApproval
      );

      Object.assign(this, { ...menuControlAuthModel, lectureApproval });
    }
  }
}

decorate(MenuControlAuthModel, {
  useApl: observable,
});
