
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { DatePeriod } from 'shared';

export class OfficeWebModel implements DramaEntity {

  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  name: string = '';
  fileBoxId: string = '';               // Document
  webPageUrl: string = '';              // webPage/Experiential url
  learningPeriod: DatePeriod = new DatePeriod();          // 학습시작일 - 학습종료일
  time: number = 0;

  constructor(officeWeb?: OfficeWebModel) {
    if (officeWeb) {
      const learningPeriod = officeWeb.learningPeriod && new DatePeriod(officeWeb.learningPeriod) || this.learningPeriod;
      Object.assign(this, { ...officeWeb, learningPeriod });
    }
  }
}

decorate(OfficeWebModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  name: observable,
  fileBoxId: observable,
  webPageUrl: observable,
  learningPeriod: observable,
  time: observable,
});



