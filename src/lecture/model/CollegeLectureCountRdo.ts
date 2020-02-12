
import { observable, computed } from 'mobx';
import { IdNameCount } from 'shared/model';
import { CollegeType } from 'college/model';


class CollegeLectureCountRdo {
  //
  @observable
  collegeId: string = '';

  @observable
  collegeType: CollegeType = CollegeType.University;

  @observable
  name: string = '';

  @observable
  description: string = '';

  @observable
  channelCounts: IdNameCount[] = [];


  constructor(collegeLectureCount?: CollegeLectureCountRdo) {
    //
    if (collegeLectureCount) {
      Object.assign(this, { ...collegeLectureCount });
    }
  }

  @computed
  get collegeCount() {
    return this.channelCounts.reduce((prev, channelCount) => prev + channelCount.count, 0);
  }
}


export default CollegeLectureCountRdo;

