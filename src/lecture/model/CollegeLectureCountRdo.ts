import { observable, computed } from 'mobx';
import { IdNameCount } from 'shared/model';
import { CollegeType } from 'college/model';
import { IdName } from '@nara.platform/accent';

class CollegeLectureCountRdo {
  //
  @observable
  id: string = '';

  @observable
  collegeType: CollegeType = CollegeType.University;

  @observable
  name: string = '';

  @observable
  description: string = '';

  @observable
  channels: IdName[] = [];
}

export default CollegeLectureCountRdo;
