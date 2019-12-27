
import { decorate, observable } from 'mobx';


class MyTrainingRdoModel {
  //
  limit: number = 0;
  offset: number = 0;


  constructor(myTrainingRdo?: MyTrainingRdoModel) {
    //
    if (myTrainingRdo) {
      Object.assign(this, { ...myTrainingRdo });
    }
  }

  static new(limit: number, offset: number) {
    //
    return new MyTrainingRdoModel({
      limit,
      offset,
    });
  }
}

decorate(MyTrainingRdoModel, {
  limit: observable,
  offset: observable,
});

export default MyTrainingRdoModel;
