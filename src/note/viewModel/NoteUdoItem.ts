import NoteUdo from "../model/NoteUdo";

export default interface NoteUdoItem {
  index: number;
  noteUdo?: NoteUdo
}

export function getNoteUdoItem(index: number, noteUdo?: NoteUdo): NoteUdoItem {
  return {
    index,
    noteUdo
  };
}
