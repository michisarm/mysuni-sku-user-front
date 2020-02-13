
import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';


class BoardConfigModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  anonymous: boolean = false;
  repliable: boolean = false;
  notifiable: boolean = false;
  shareable: boolean = false;
  visible: boolean = false;


  constructor(boardConfig?: BoardConfigModel) {
    if (boardConfig) {
      //
      this.anonymous = boardConfig.anonymous || boardConfig.anonymous;
      this.repliable = boardConfig.repliable || boardConfig.repliable;
      this.notifiable = boardConfig.notifiable || boardConfig.notifiable;
      this.shareable = boardConfig.shareable || boardConfig.shareable;
      this.visible = boardConfig.visible || boardConfig.visible;

    }
  }
}

decorate(BoardConfigModel, {
  id: observable,
  entityVersion: observable,

  anonymous: observable,
  repliable: observable,
  notifiable: observable,
  shareable: observable,
  visible: observable,
});

export default BoardConfigModel;
