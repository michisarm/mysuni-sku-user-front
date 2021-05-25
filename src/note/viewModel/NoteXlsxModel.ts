import Note from "../model/Note";
import moment from "moment";
import Folder from "../model/Folder";
import { CollegeModel } from "../../college/model";

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


export function convertNoteToNoteXlsxModel(note: Note, index: number, folder?: Folder, collegesName?: CollegeModel[]): NoteXlsxModel {

  const idNames = folder?.folders.idNames.filter(f => { if (f.id === note.folderId) { return f.name } })
  const collegeName = collegesName?.filter(f => { if (f.id === note.collegeId) { return f } });
  return {
    No: index + 1,
    폴더: idNames && idNames?.length > 0 && idNames[0].id !== '0000' && idNames[0].name || '미지정',
    Category: collegeName && collegeName.length > 0 && collegeName[0].name || '',
    Card명: note.cardName,
    Cube명: note.cubeName,
    Playtime: note.playTime,
    작성일자: moment(note.createDate).format('YYYY-MM-DD'),
    상태: note.updateDate !== 0 ? '편집' : '작성',
    내용: note.content
  };
}