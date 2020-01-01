
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared';



class RollBookModel extends DramaEntityObservableModel {
  //
  round: number = 0;
  name: string = '';
  lectureCardId: string = '';

  constructor(rollBook?: RollBookModel) {
    super();
    if (rollBook) {
      Object.assign(this, rollBook);
    }
  }
}

decorate(RollBookModel, {
  round: observable,
  name: observable,
  lectureCardId: observable,
});

export default RollBookModel;
