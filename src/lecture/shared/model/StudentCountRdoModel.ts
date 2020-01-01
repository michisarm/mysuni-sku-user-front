import { decorate, observable } from 'mobx';


class StudentCountRdoModel {
  //
  totalCount: number = 0;
  submittedCount: number = 0;
  canceledCount: number = 0;
  approvedCount: number = 0;
  rejectedCount: number = 0;


  constructor(studentCountRdo?: StudentCountRdoModel) {
    //
    if (studentCountRdo) {
      Object.assign(this, { ...studentCountRdo });
    }
  }

}

decorate(StudentCountRdoModel, {
  totalCount: observable,
  submittedCount: observable,
  canceledCount: observable,
  approvedCount: observable,
  rejectedCount: observable,
});

export default StudentCountRdoModel;
