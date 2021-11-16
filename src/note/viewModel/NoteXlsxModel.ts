import Note from '../model/Note';
import moment from 'moment';
import Folder from '../model/Folder';
import { CollegeModel } from '../../college/model';
import NoteWithLecture from '../model/NoteWithLecture';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../lecture/model/LangSupport';

export class NoteXlsxModel {
  //
  No: number = 0;
  폴더: string = '';
  Category: string = '';
  Card명: string = '';
  Cube명: string = '';
  학습유형?: string = '';
  Playtime: string = '';
  작성일자: string = '';
  상태: string = '';
  내용: string = '';
}

export function convertNoteToNoteXlsxModel(
  noteWithLecture: NoteWithLecture,
  index: number,
  folder?: Folder,
  collegesName?: CollegeModel[]
): NoteXlsxModel {
  const idNames = folder?.folders.idNames.filter((f) => {
    if (f.id === noteWithLecture.note.folderId) {
      return f.name;
    }
  });
  const collegeName = collegesName?.filter((f) => {
    if (f.id === noteWithLecture.lectureRom.collegeId) {
      return f;
    }
  });
  return {
    No: index + 1,
    폴더:
      (idNames &&
        idNames?.length > 0 &&
        idNames[0].id !== '0000' &&
        idNames[0].name) ||
      '미지정',
    Category:
      (collegeName &&
        collegeName.length > 0 &&
        parsePolyglotString(
          collegeName[0].name,
          getDefaultLang(collegeName[0].langSupports)
        )) ||
      '',
    Card명: parsePolyglotString(noteWithLecture.lectureRom.cardName),
    Cube명: parsePolyglotString(noteWithLecture.lectureRom.cubeName),
    학습유형: noteWithLecture.note.cubeType,
    Playtime: noteWithLecture.note.playTime,
    작성일자: moment(noteWithLecture.note.registeredTime).format('YYYY-MM-DD'),
    상태: noteWithLecture.note.modifiedTime !== 0 ? '편집' : '작성',
    내용: noteWithLecture.note.content,
  };
}
