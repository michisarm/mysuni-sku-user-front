import { computed, decorate, observable } from 'mobx';
import moment, { Moment } from 'moment';

export class NewDatePeriod {
  //
  DEFAULT_FORMAT = 'YYYY-MM-DD';

  zoneId: string = '';
  startDateMoment: Moment = moment();
  startDate: string = this.startDateMoment.format(this.DEFAULT_FORMAT);

  endDateMoment: Moment = moment();
  endDate: string =  this.endDateMoment.format(this.DEFAULT_FORMAT);

  constructor(newDatePeriod?: NewDatePeriod) {
    if ( newDatePeriod ) {

      Object.assign(this, { ...newDatePeriod });
      this.startDateMoment = newDatePeriod.startDate && moment(newDatePeriod.startDate) || moment();
      this.endDateMoment = newDatePeriod.endDate && moment(newDatePeriod.endDate) || moment();
    }
  }

  set startDateObj(date: Date) {
    //
    const momentDate = moment(date);

    this.startDateMoment = momentDate;
    this.startDate = momentDate.format(this.DEFAULT_FORMAT);
  }

  set endDateObj(date: Date) {
    //
    const momentDate = moment(date);

    this.endDateMoment = momentDate;
    this.endDate = momentDate.format(this.DEFAULT_FORMAT);
  }

  setEndOfYearFrom(date: Date) {
    const startMomentDate = moment(date);
    const endMomentDate = moment(date);

    this.startDateMoment = startMomentDate;
    this.startDate = startMomentDate.format(this.DEFAULT_FORMAT);
    this.endDateMoment = endMomentDate.endOf('year');
    this.endDate = endMomentDate.format(this.DEFAULT_FORMAT);
  }

  @computed
  get startDateObj() {
    return this.startDateMoment.toDate();
  }

  @computed
  get startDateDot() {
    return this.startDateMoment.format('YYYY.MM.DD');
  }

  @computed
  get startDateLong() {
    return this.startDateMoment.toDate().getTime();
  }

  @computed
  get endDateObj() {
    return this.endDateMoment.toDate();
  }

  @computed
  get endDateDot() {
    return this.endDateMoment.format('YYYY.MM.DD');
  }

  @computed
  get endDateLong() {
    return this.endDateMoment.toDate().getTime();
  }

  @computed
  get startDateDotWithTime() {
    return this.startDateMoment.format('YYYY.MM.DD hh:mm');
  }

  @computed
  get endDateDotWithTime() {
    return this.startDateMoment.format('YYYY.MM.DD hh:mm');
  }

}

decorate(NewDatePeriod, {
  zoneId: observable,
  startDateMoment: observable,
  startDate: observable,
  endDateMoment: observable,
  endDate: observable,
});
