import { decorate, observable } from 'mobx';
import { SkProfileRdo } from './SkProfileRdo';
import { DatePeriod } from '../../shared-model/DatePeriod';

export class SkProfileQueryModel implements SkProfileRdo {
  //DatePeriod
    datePeriod : DatePeriod = new DatePeriod();

    offset: number=0;
    limit: number=20;
    startDate : number=this.datePeriod.startDateSub.getTime();
    endDate: number= this.datePeriod.endDateSub.getTime();
    name: string='';
    signed: boolean=false;
    company: string='';


    static asSkProfileRdo(skProfileQuery : SkProfileQueryModel) : SkProfileRdo {
      return (
        {
          offset: skProfileQuery.offset,
          limit: skProfileQuery.limit,
          startDate: skProfileQuery.datePeriod.startDateSub.getTime(),
          endDate: skProfileQuery.datePeriod.endDateSub.getTime(),
          name: skProfileQuery.name,
          signed: skProfileQuery.signed,
          company: skProfileQuery.company,
        }
      );
    }
}

decorate(SkProfileQueryModel, {
  offset: observable,
  limit: observable,
  endDate: observable,
  startDate: observable,
  name: observable,
  signed: observable,
  company: observable,
});
