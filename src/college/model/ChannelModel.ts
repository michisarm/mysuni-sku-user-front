import { decorate, observable } from 'mobx';
import { IdName } from '@nara.platform/accent';

import { IdName as IdNameModel } from 'shared/model';
import {
  PolyglotString,
  parsePolyglotString,
} from 'shared/viewmodel/PolyglotString';

export class ChannelModel {
  //
  id: string = '';
  name: PolyglotString = { ko: '', cn: '', en: '' };

  channelId: string = '';
  iconfileBoxId: string = '';
  description: PolyglotString = { ko: '', cn: '', en: '' };
  time: number = 0;

  checked?: boolean;
  active: boolean = false;

  constructor(channel?: ChannelModel | any) {
    if (channel) {
      Object.assign(this, { ...channel });
      this.id = channel.channelId ? channel.channelId : this.id;
      this.channelId = channel.channelId ? channel.channelId : this.id;
    }
  }

  toIdName() {
    return new IdNameModel({
      id: this.channelId,
      name: parsePolyglotString(this.name),
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
