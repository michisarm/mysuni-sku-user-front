import {DatePeriod} from '../../../shared/model';

class BadgeCompModel {
  //
  'id': string = '';
  'entityVersion': number = 0;
  'patronKey': {
    'keyString': string,
    'patronType': string,
    'pavilionKey': boolean,
    'denizenKey': boolean,
    'cineroomKey': boolean,
    'audienceKey': boolean
  };

  'serviceType': string = '';
  'serviceId': string = '';
  'cubeId': string = '';
  'coursePlanId': string = '';
  'name': string = '';
  'cubeType': string = '';
  'category': {
    'college': {
      'id': string,
      'name': string
    },
    'channel': {
      'id': string,
      'name': string
    }
  };

  'iconBox': {
    'iconType': string,
    'iconUrl': string,
    'baseUrl': string
  };

  'creationDate': number = 0;
  'learningTime': number = 0;
  'learningPeriod': DatePeriod = new DatePeriod();
  'lectureCardUsids': string[] = [];
  'learningCardId': string = '';
  'sumViewSeconds': number = 0;
  'learningState': string = '';

  constructor(badgeComp?: BadgeCompModel) {
    //
    if (badgeComp) {
      Object.assign(this, {...badgeComp});
    }
  }
}

export default BadgeCompModel;
