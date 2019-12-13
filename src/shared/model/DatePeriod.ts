import { DatePeriod as AccentDatePeriod } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class DatePeriod implements AccentDatePeriod {
  //
  startDateSub: Date = new Date();
  endDateSub: Date = new Date();

  zoneId: string = '';
  startDate: string = this.startDateSub
    .toLocaleDateString()
    .replace('. ', '-')
    .replace('. ', '-')
    .replace('.', '');

  endDate: string = this.endDateSub
    .toLocaleDateString()
    .replace('. ', '-')
    .replace('. ', '-')
    .replace('.', '');

  startDateNumber: number = 0;
  endDateNumber: number = 0;

  constructor(datePeriod?: DatePeriod) {
    if ( datePeriod ) {
      Object.assign(this, { ...datePeriod });
      this.startDateSub = datePeriod.startDate && new Date(datePeriod.startDate) || new Date();
      this.endDateSub = datePeriod.endDate && new Date(datePeriod.endDate) || new Date();
    }
  }
}

decorate(DatePeriod, {
  zoneId: observable,
  startDate: observable,
  endDate: observable,

  startDateSub: observable,
  endDateSub: observable,
});
