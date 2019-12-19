
import { decorate, observable } from 'mobx';
import { IdName } from 'shared';


class ChannelCountRdo {
  //
  channel: IdName = new IdName();
  lectureCount: number = 0;

  constructor(channelCountRdo?: ChannelCountRdo) {
    //
    if (channelCountRdo) {
      Object.assign(this, channelCountRdo);
    }
  }
}

decorate(ChannelCountRdo, {
  channel: observable,
  lectureCount: observable,
});

export default ChannelCountRdo;

