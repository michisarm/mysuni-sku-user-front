
import { IdName } from 'shared';
import { decorate, observable } from 'mobx';


export class ChannelModel extends IdName {
  //
  channelId : string = '';
  checked?: boolean;

  constructor(channel? : ChannelModel) {
    super();
    if (channel) {
      Object.assign(this, { ...channel });
      this.id = channel.channelId ? channel.channelId : this.id;
      this.channelId = channel.channelId ? channel.channelId : this.id;
    }
  }
}

decorate(ChannelModel, {
  channelId: observable,
  checked: observable,
});


export default ChannelModel;
