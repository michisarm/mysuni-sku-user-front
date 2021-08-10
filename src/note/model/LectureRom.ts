import { PolyglotString } from '../../shared/viewmodel/PolyglotString';

export default interface LectureRom {
  collegeId: string;
  channelId: string;
  cardId: string;
  cardName: PolyglotString;
  cubeId: string;
  cubeName: PolyglotString;
}
