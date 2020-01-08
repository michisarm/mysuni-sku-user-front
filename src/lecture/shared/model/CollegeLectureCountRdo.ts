
import { observable, computed } from 'mobx';
import { IdNameCount } from 'shared';
import { CollegeType } from 'college';


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

