
import { decorate, observable } from 'mobx';


class ChannelCountRdo {
  //
  channelId: string = '';
  lectureCount: number = 0;

  constructor(channelCountRdo?: ChannelCountRdo) {
    //
    if (channelCountRdo) {
      Object.assign(this, channelCountRdo);
    }
  }
}

decorate(ChannelCountRdo, {
  channelId: observable,
  lectureCount: observable,
});

export default ChannelCountRdo;

