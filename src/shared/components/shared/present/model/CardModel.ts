
import { decorate, observable } from 'mobx';
import CubeType from './CubeType';


class CardModel {
  //
  title: string = '';

  description: string = '';

  lengthInMinute: number = 0;

  countOfComplete: number = 0;

  cubeType?: CubeType;

  required?: boolean = false;

  stampReady?: boolean  = false;


  constructor(card?: any) {
    //
    if (!card) {
      return;
    }
    Object.assign(this, card);
  }

  splitLengthInMinute() {
    //
    const hour = Math.floor(this.lengthInMinute / 60);
    const minute = this.lengthInMinute % 60;

    return { hour, minute };
  }
}

decorate(CardModel, {
  title: observable,
  description: observable,
  lengthInMinute: observable,
  countOfComplete: observable,
  cubeType: observable,
  required: observable,
  stampReady: observable,
});
export default CardModel;
