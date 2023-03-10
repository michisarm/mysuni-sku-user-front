
import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';


class PostConfigModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  replyable: boolean = false;
  notifiable: boolean = false;
  shareable: boolean = false;
  answered: boolean = false;

  sourceType: String = '';
  sourceId: String = '';


  constructor(postConfig?: PostConfigModel) {
    if (postConfig) {
      //
      this.replyable = postConfig.replyable || postConfig.replyable;
      this.notifiable = postConfig.notifiable || postConfig.notifiable;
      this.shareable = postConfig.shareable || postConfig.shareable;
      this.answered = postConfig.answered || postConfig.answered;
      this.sourceType = postConfig.sourceType || postConfig.sourceType;
      this.sourceId = postConfig.sourceId || postConfig.sourceId;
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
  sourceType: observable,
  sourceId: observable,
});

export default PostConfigModel;
