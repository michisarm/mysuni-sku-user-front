
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { DatePeriod, NameValueList } from 'shared';
import { OfficeWebCdoModel } from './OfficeWebCdoModel';

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

  static asNameValues(officeWeb: OfficeWebModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'name',
          value: officeWeb.name,
        },
        {
          name: 'webPageUrl',
          value: officeWeb.webPageUrl,
        },
        {
          name: 'learningPeriod',
          value: JSON.stringify(officeWeb.learningPeriod),
        },
      ],
    };

    return asNameValues;
  }

  static asCdo(officeWeb: OfficeWebModel): OfficeWebCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        name: officeWeb.name,
        fileBoxId: officeWeb.fileBoxId,
        webPageUrl: officeWeb.webPageUrl,
        learningPeriod: officeWeb.learningPeriod,
      }
    );
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
