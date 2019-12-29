import { decorate, observable } from 'mobx';


class InstructorRdoModel {
  //
  instructorId: string = '';
  limit: number = 0;
  offset: number = 0;


  constructor(instructorRdo?: InstructorRdoModel) {
    //
    if (instructorRdo) {
      Object.assign(this, { ...instructorRdo });
    }
  }

  static new(instructorId: string, limit: number, offset: number) {
    //
    return new InstructorRdoModel({
      instructorId,
      limit,
      offset,
    });
  }
}

decorate(InstructorRdoModel, {
  instructorId: observable,
  limit: observable,
  offset: observable,
});

export default InstructorRdoModel;

