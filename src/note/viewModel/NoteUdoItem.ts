import NoteUdo from "../model/NoteUdo";

export default interface NoteUdoItem {
  index: number;
  cubeId?: string;
  noteUdo?: NoteUdo
}

export function getNoteUdoItem(index: number, cubeId?: string, noteUdo?: NoteUdo): NoteUdoItem {
  return {
    index,
    cubeId,
    noteUdo
  };
}
