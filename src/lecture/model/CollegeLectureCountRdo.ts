
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

  @observable
  totalCount: number = 0;


  constructor(collegeLectureCount?: CollegeLectureCountRdo) {
    //
    if (collegeLectureCount) {
      if (collegeLectureCount.channelCounts.length > 0) {
        let totalCount = 0;
        for (let i = 0; i < collegeLectureCount.channelCounts.length; i++) {
          totalCount += collegeLectureCount.channelCounts[i].count;
          collegeLectureCount.totalCount = totalCount;
        }
      }

      Object.assign(this, { ...collegeLectureCount });
    }
  }

  @computed
  get collegeCount() {
    return this.channelCounts.reduce((prev, channelCount) => prev + channelCount.count, 0);
  }
}


export default CollegeLectureCountRdo;

