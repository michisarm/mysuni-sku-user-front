import Note from './Note';
import { PolyglotString } from '../../shared/viewmodel/PolyglotString';

export default interface NoteCdo {
  cardId: string;
  cubeId: string;
  collegeId: string;
  content: string;
  playSecond: number;
}

export function convertNoteToNoteCdo(note: Note): NoteCdo {
  return {
    cardId: note.cardId,
    collegeId: note.collegeId,
    content: '',
    cubeId: note.cubeId,
    playSecond: 0,
  };
}
