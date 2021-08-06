import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName } from 'shared/model';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { CreatorModel } from './CreatorModel';
import { JobGroupType } from './JobGroupType';

export class JobGroupModel implements DramaEntity {
  entityVersion: number = 0;
  id: string = '';
  patronKey: PatronKey = {} as PatronKey;

  jobGroupId: string = '';
  jobGroupType: JobGroupType = JobGroupType.Line;
  name: PolyglotString = { ko: '', en: '', zh: '' };
  jobDuties: { id: string; name: PolyglotString }[] = [];

  creator: CreatorModel = new CreatorModel();
  time: number = 0;

  constructor(jobGroup?: JobGroupModel) {
    if (jobGroup) {
      const creator =
        (jobGroup.creator && new CreatorModel(jobGroup.creator)) ||
        this.creator;

      Object.assign(this, { ...jobGroup, creator });
    }
  }
}

decorate(JobGroupModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  jobGroupId: observable,
  jobGroupType: observable,
  name: observable,
  jobDuties: observable,
  creator: observable,
  time: observable,
});
