import { decorate, observable } from 'mobx';
import { IdName } from '../../shared/model/IdName';

export class ChannelModel {
  college: IdName = new IdName();
  channel: IdName = new IdName();

  constructor(channel?: ChannelModel) {
    if (channel) {
      const college = channel.college && new IdName(channel.college) || this.college;
      const newChannel = channel.channel && new IdName(channel.channel) || this.channel;
      Object.assign(this, { college, newChannel });
    }
  }
}

decorate(ChannelModel, {
  college: observable,
  channel: observable,
});
