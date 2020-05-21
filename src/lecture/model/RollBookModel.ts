
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared/model';


class RollBookModel extends DramaEntityObservableModel {
  //
  id: string = '';
  round: number = 0;
  name: string = '';
  studentCount: number = 0;
  passedStudentCount: number = 0;
  lectureCardId: string = '';

  constructor(rollBook?: RollBookModel) {
    super();
    if (rollBook) {
      Object.assign(this, rollBook);
    }
  }
}

decorate(RollBookModel, {
  id: observable,
  round: observable,
  name: observable,
  studentCount: observable,
  passedStudentCount: observable,
  lectureCardId: observable,
});

export default RollBookModel;
