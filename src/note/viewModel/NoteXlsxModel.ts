import Note from '../model/Note';
import moment from 'moment';
import Folder from '../model/Folder';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import NoteContent from '../model/NoteContent';
import { playSecondToString } from '../ui/logic/NoteHelper';

export class NoteXlsxModel {
  //
  No: number = 0;
  폴더: string = '';
  Category: string = '';
  Card명: string = '';
  Cube명: string = '';
  학습유형?: string = '';
  PlaySecond: string = '';
  작성일자: string = '';
  상태: string = '';
  내용: string = '';
}

export function convertNoteToNoteXlsxModel(
  note: Note,
  index: number,
  folder?: Folder
): NoteXlsxModel[] {
  const idNames = folder?.folders.idNames.filter((f) => {
    if (f.id === note.folderId) {
      return f.name;
    }
  });

  return note.noteContents.map((noteContent: NoteContent, contentIndex) => {
    return {
      No: index + contentIndex + 1,
      폴더:
        (idNames &&
          idNames?.length > 0 &&
          (idNames[0].id !== '' || idNames[0].id !== null) &&
          idNames[0].name) ||
        '미지정',
      Category: getCollgeName(note.collegeId),
      Card명: parsePolyglotString(note.cardName),
      Cube명: parsePolyglotString(note.cubeName),
      학습유형: note.cubeType,
      PlaySecond:
        noteContent.playSecond === 0
          ? ''
          : playSecondToString(noteContent.playSecond),
      작성일자: moment(noteContent.registeredTime).format('YYYY-MM-DD'),
      상태: noteContent.modifiedTime !== 0 ? '편집' : '작성',
      내용: noteContent.content,
    };
  });
}
