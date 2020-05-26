
import { decorate, observable } from 'mobx';


class LectureApprovalRdo {
  //
  id: string = '';
  name: string = '';

  constructor(lectureApprovalRdo?: LectureApprovalRdo) {
    //
    if (lectureApprovalRdo) {
      Object.assign(this, lectureApprovalRdo);
    }
  }
}

decorate(LectureApprovalRdo, {
  id: observable,
  name: observable,
});

export default LectureApprovalRdo;

