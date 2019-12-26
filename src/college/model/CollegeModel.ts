import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
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
  channels: observable,
  creator: observable,
});
