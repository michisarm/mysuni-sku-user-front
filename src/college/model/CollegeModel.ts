import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';

import { IdName } from 'shared/model';
import { CollegeType } from './CollegeType';
import { CreatorModel } from './CreatorModel';
import ChannelModel from './ChannelModel';
import {
  PolyglotString,
  parsePolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { LangSupport } from '../../lecture/model/LangSupport';

export class CollegeModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  collegeId: string = '';
  collegeType: CollegeType = CollegeType.University;
  name: PolyglotString = { ko: '', zh: '', en: '' };
  description: PolyglotString = { ko: '', zh: '', en: '' };
  iconFileBoxId: string = '';
  panoptoFolderId: string = '';

  channels: ChannelModel[] = [];

  creator: CreatorModel = new CreatorModel();
  openState: string = '';
  time: number = 0;
  langSupports: LangSupport[] = [];
  cineroomId: string = '';

  constructor(college?: CollegeModel) {
    //
    if (college) {
      const creator =
        (college.creator && new CreatorModel(college.creator)) || this.creator;
      const channels = college.channels || this.channels;
      Object.assign(this, {
        ...college,
        collegeId: college.id,
        creator,
        channels,
      });
    }
  }

  toIdName() {
    //
    return new IdName({
      id: this.collegeId,
      name: parsePolyglotString(this.name),
    });
  }
}

decorate(CollegeModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  collegeId: observable,
  collegeType: observable,
  name: observable,
  description: observable,
  iconFileBoxId: observable,
  panoptoFolderId: observable,
  channels: observable,
  creator: observable,
});
