import Note from "../model/Note";
import moment from "moment";
import Folder from "../model/Folder";

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


export function convertNoteToNoteXlsxModel(note: Note, index: number, folder?: Folder): NoteXlsxModel {

  const idNames = folder?.folders.idNames.filter(f => { if (f.id === note.folderId) { return f.name } })

  return {
    No: index + 1,
    폴더: idNames && idNames?.length > 0 && idNames[0].id !== '0000' && idNames[0].name || '',
    Category: note.collegeId,
    Card명: note.cardName,
    Cube명: note.cubeName,
    Playtime: note.playTime,
    작성일자: moment(note.createDate).format('YYYY-MM-DD'),
    상태: note.updateDate !== 0 ? '편집' : '작성',
    내용: note.content
  };
}