
import { decorate, observable } from 'mobx';
import { IdName } from '@nara.platform/accent';

import { IdName as IdNameModel } from 'shared/model';


export class ChannelModel implements IdName {
  //
  id: string = '';
  name: string = '';

  channelId : string = '';
  iconfileBoxId : string = '';
  description : string = '';
  time : number = 0;

  checked?: boolean;
  active: boolean = false;

  constructor(channel? : ChannelModel | any) {
    if (channel) {
      Object.assign(this, { ...channel });
      this.id = channel.channelId ? channel.channelId : this.id;
      this.channelId = channel.channelId ? channel.channelId : this.id;
    }
  }

  toIdName() {
    return new IdNameModel({
      id: this.channelId,
      name: this.name,
    });
  }
}

decorate(ChannelModel, {
  id: observable,
  name: observable,
  channelId: observable,
  iconfileBoxId: observable,
  description: observable,
  time: observable,
  checked: observable,
  active: observable,
});


export default ChannelModel;
