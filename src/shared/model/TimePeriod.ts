import { decorate, observable } from 'mobx';

export class TimePeriod{
  //
  zoneId: string = '';
  startTime: number = 0;
  endTime: number = 0;

  constructor(timePeriod?: TimePeriod) {
    if ( timePeriod ) {
      Object.assign(this, timePeriod);
    }
  }
}

decorate(TimePeriod, {
  zoneId: observable,
  startTime: observable,
  endTime: observable,
});
