
import { decorate, observable } from 'mobx';
import { IdName } from 'shared';


class ChannelModel extends IdName {
  //
  checked?: boolean;

  constructor(channel?: ChannelModel) {
    //
    super();

    if (channel) {
      Object.assign(this, channel);
    }
  }
}

decorate(ChannelModel, {
  id: observable,
  name: observable,
  checked: observable,
});

export default ChannelModel;
