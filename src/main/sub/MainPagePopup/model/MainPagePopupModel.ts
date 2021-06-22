import {decorate, observable} from 'mobx';
import {NewDatePeriod} from "shared/model/NewDatePeriod";

export class MainPagePopupModel {
  //
  id          : string = '';
  title       : string = '';
  contents    : string = ''; //본문내용
  open        : boolean = false; //게시 플레그(Y,N)
  time        : string = ''; //생성시간
  modifier    : string = '';
  modifiedTime: string = '';

  period: NewDatePeriod = new NewDatePeriod();//게시 시간

  constructor(model?: MainPagePopupModel) {
    //
    if (model) {
      const period = (model.period && new NewDatePeriod(model.period)) || new NewDatePeriod();

      Object.assign(this, {
        ...model,
        period,
      });
    }
  }

}

decorate(MainPagePopupModel, {
  id          : observable,
  title       : observable,
  contents    : observable,
  open        : observable,
  time        : observable,
  modifier    : observable,
  modifiedTime: observable,
  period      : observable,
});

export default MainPagePopupModel;
