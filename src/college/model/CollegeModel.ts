import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName } from 'shared';
import { CollegeType } from './CollegeType';
import { CreatorModel } from './CreatorModel';


export class CollegeModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  collegeId: string = '';
  collegeType: CollegeType = CollegeType.University;
  name: string = '';
  description: string = '';
  iconFileBoxId: string = '';
  channels: IdName[] = [];

  creator: CreatorModel = new CreatorModel();
  openState: string = '';
  time: number = 0;

  constructor(college?: CollegeModel) {
    //
    if (college) {
      const creator = college.creator && new CreatorModel(college.creator) || this.creator;
      Object.assign(this, { ...college, creator });
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
