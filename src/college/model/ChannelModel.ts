
import { IdName } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';


export class ChannelModel implements IdName {
  //
  id: string = '';
  name: string = '';

  channelId : string = '';
  checked?: boolean;
  iconfileBoxId : string = '';
  description : string = '';
  time : number =0;

  constructor(channel? : ChannelModel | any) {
    if (channel) {
      Object.assign(this, { ...channel });
      this.id = channel.channelId ? channel.channelId : this.id;
      this.channelId = channel.channelId ? channel.channelId : this.id;
    }
  }

}

decorate(ChannelModel, {
  id: observable,
  name: observable,
  channelId: observable,
  checked: observable,
  iconfileBoxId: observable,
  description: observable,
  time: observable,
});


export default ChannelModel;
