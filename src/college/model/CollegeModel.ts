
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';

import { IdName } from 'shared';
import { CollegeType } from './CollegeType';
import { CreatorModel } from './CreatorModel';
import ChannelModel from './ChannelModel';


export class CollegeModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  collegeId: string = '';
  collegeType: CollegeType = CollegeType.University;
  name: string = '';
  description: string = '';
  iconFileBoxId: string = '';
  panoptoFolderId: string = '';

  channels: ChannelModel[] = [];

  creator: CreatorModel = new CreatorModel();
  openState: string = '';
  time: number = 0;

  constructor(college?: CollegeModel) {
    //
    if (college) {
      const creator = college.creator && new CreatorModel(college.creator) || this.creator;
      const channels = college.channels || this.channels;
      Object.assign(this, { ...college, creator, channels });
    }
  }

  toIdName() {
    //
    return new IdName({
      id: this.collegeId,
      name: this.name,
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
