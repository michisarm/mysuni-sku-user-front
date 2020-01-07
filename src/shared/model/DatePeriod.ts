import { DatePeriod as AccentDatePeriod } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';

export class DatePeriod implements AccentDatePeriod {
  //
  startDateSub: Date = new Date();
  endDateSub: Date = new Date();

  zoneId: string = '';

  startDate: string = DatePeriod.changeDateToString(this.startDateSub);
  endDate: string = DatePeriod.changeDateToString(this.endDateSub);

  startDateNumber: number = 0;
  endDateNumber: number = 0;

  constructor(datePeriod?: DatePeriod) {
    if ( datePeriod ) {
      Object.assign(this, { ...datePeriod });
      let newDate;
      if (datePeriod.startDate.length === 13) {
        newDate = new Date(datePeriod.startDate);
      }
      else {
        newDate = DatePeriod.modifyMToMM(datePeriod.startDate.split('-'));
      }
      this.startDateSub = datePeriod.startDate && new Date(newDate) || new Date();
      this.endDateSub = datePeriod.endDate && new Date(newDate) || new Date();

    }
  }

  @computed
  get getStartDateSub() {
    const dateList = this.startDate && this.startDate.split('-');
    const startDateSub = new Date(Number(dateList[0]), Number(dateList[1]), Number(dateList[2]));
    return startDateSub;
  }

  @computed
  get getEndDateSub() {
    const dateList = this.endDate && this.endDate.split('-');
    const endDateSub = new Date(Number(dateList[0]), Number(dateList[1]), Number(dateList[2]));
    return endDateSub;
  }

  static modifyMToMM(targetList: string[]) {
    //
    let newDate = '';
    if (targetList.length && targetList[1].length === 1) newDate = targetList[0] + '-0' + targetList[1] + '-0' + targetList[2];
    else newDate = targetList[0] + '-' + targetList[1] + '-' + targetList[2];
    return newDate;
  }

  static changeDateToString(date: Date) {
    //
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]);
  }


  static changeDateToStringSupport(date: Date) {
    //
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    return yyyy + '.' + (mm[1] ? mm : '0' + mm[0]) + '.' + (dd[1] ? dd : '0' + dd[0]);
  }

  static changeDateToStringSupportQna(date: Date) {
    //
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    const HH = date.getHours().toString();
    const MM = date.getMinutes().toString();
    const SS = date.getSeconds().toString();
    return yyyy + '.' + (mm[1] ? mm : '0' + mm[0]) + '.' + (dd[1] ? dd : '0' + dd[0]) + '  ' + HH + ':' + MM + ':' + SS;
  }
}

decorate(DatePeriod, {
  zoneId: observable,
  startDate: observable,
  endDate: observable,

  startDateSub: observable,
  endDateSub: observable,
});
