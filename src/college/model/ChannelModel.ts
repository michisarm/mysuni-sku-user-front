
import { IdName } from 'shared';
import { decorate, observable } from 'mobx';


export class ChannelModel extends IdName {
  //
  id: string = '';
  name: string = '';

  channelId : string = '';
  checked?: boolean;
  iconfileBoxId : string = '';
  description : string = '';
  time : number =0;

  constructor(channel? : ChannelModel | any) {
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
  iconfileBoxId: observable,
  description: observable,
  time: observable,
});


export default ChannelModel;
