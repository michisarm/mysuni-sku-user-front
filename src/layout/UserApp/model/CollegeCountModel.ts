
import { decorate, observable } from 'mobx';
import ChannelCountRdo from './ChannelCountRdo';


class CollegeCountModel {
  //
  collegeId: string = '';
  name: string = '';
  lectureCount: number = 0;
  channelCountList: ChannelCountRdo[] = [];

  constructor(collegeCount?: CollegeCountModel) {
    //
    if (collegeCount) {
      Object.assign(this, collegeCount);
    }
  }
}

decorate(CollegeCountModel, {
  collegeId: observable,
  name: observable,
  lectureCount: observable,
  channelCountList: observable,
});

export default CollegeCountModel;

