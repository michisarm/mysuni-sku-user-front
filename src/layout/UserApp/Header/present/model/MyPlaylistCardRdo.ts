import { PolyglotString } from '../../../../../shared/viewmodel/PolyglotString';

export default class MyPlaylistCardRdo {
  //
  cardId: string = '';
  cardName: PolyglotString = { ko: '', en: '', zh: '' };
  cubeCount: number = 0;
  learningTime: number = 0;

  constructor(rdo?: MyPlaylistCardRdo) {
    if (rdo) {
      Object.assign(this, { ...rdo });
    }
  }
}
