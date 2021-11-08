import Note from './Note';
import { PolyglotString } from '../../shared/viewmodel/PolyglotString';

export default interface NoteCdo {
  // cardId?: string;
  // cubeId?: string;
  // cubeType?: string;
  // content?: string;
  // folderId?: string;
  // playTime?: string;
  cardId: string;
  cardName: PolyglotString;
  cubeId: string;
  cubeName: PolyglotString;
  collegeId: string;
  content: string;
  playSecond: number;
}

export function convertNoteToNoteCdo(note: Note): NoteCdo {
  return {
    // cardId: note.cardId,
    // cubeId: note.cubeId,
    // cubeType: note.cubeType,
    // content: '',
    // folderId: note.folderId,
    // playTime: note.playTime,
    cardId: note.cardId,
    cardName: note.cardName,
    collegeId: note.collegeId,
    content: '',
    cubeId: note.cubeId,
    cubeName: note.cubeName,
    // playSecond: note.playSecond,
    playSecond: 0,
  };
}
