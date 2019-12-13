import { decorate, observable } from 'mobx';

export class ChannelViewModel {
  channelId : string ='';
  name : string ='';
  checked : boolean = false ;

  constructor(channel ? : ChannelViewModel) {
    if (channel) {
      Object.assign(this, { ...channel });
    }
  }
}

decorate(ChannelViewModel, {
  channelId: observable,
  name: observable,
  checked: observable,
});
