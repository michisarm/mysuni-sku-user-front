import { decorate, observable } from 'mobx';
import { DatePeriod } from './ObservableDatePeriod';

export class QueryModel {
  period: DatePeriod = new DatePeriod();
  college: string = '';
  channel: string = '';
  searchPart: string = '';
  searchWord: string = '';

  offset: number = 0;
  limit: number = 20;
}

decorate(QueryModel, {
  period: observable,
  college: observable,
  channel: observable,
  searchPart: observable,
  searchWord: observable,

  offset: observable,
  limit: observable,
});
