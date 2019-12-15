import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class PostConfigModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  replyable: boolean = false;
  notifiable: boolean = false;
  shareable: boolean = false;
  answered: boolean = false;

  constructor(postConfig?: PostConfigModel) {
    if (postConfig) {
      //
      this.replyable = postConfig.replyable || postConfig.replyable;
      this.notifiable = postConfig.notifiable || postConfig.notifiable;
      this.shareable = postConfig.shareable || postConfig.shareable;
      this.answered = postConfig.answered || postConfig.answered;

    }
  }
}

decorate(PostConfigModel, {
  id: observable,
  entityVersion: observable,

  replyable: observable,
  notifiable: observable,
  shareable: observable,
  answered: observable,

});
