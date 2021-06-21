import { OffsetElementList } from "@nara.platform/accent";
import Note from "../model/Note";

export default interface NoteListItem {
  index: number;
  noteList: OffsetElementList<Note>
}



export function getNoteListItem(index: number, noteList: OffsetElementList<Note>): NoteListItem {
  return {
    index,
    noteList
  };
}