import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import NoteContent from './NoteContent';

export default interface Note {
  // id: string;
  // patronKey: PatronKey;
  cubeType: string;
  content: string;
  playTime: string;
  cardId: string;
  cardName: PolyglotString;
  collegeId: string;
  cubeId: string;
  cubeName: PolyglotString;
  denizenId: string;
  folderId: string;
  id: string;
  modifiedTime: number;
  noteContents: NoteContent[];
  registeredTime: number;
}

export function getConvertEnter(content: string): string {
  let convertString: string = '';

  const stringArr = content.split('\n');
  stringArr.map((splitItem: string) => {
    convertString += '<p>' + splitItem + '</p>';
  });
  if (stringArr.length === 0) {
    convertString = content;
  }
  return convertString;
}
