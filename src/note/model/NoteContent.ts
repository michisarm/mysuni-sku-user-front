export default interface NoteContent {
  //
  id: string;
  content: string;
  modifiedTime: number;
  noteId: string;
  playSecond: number;
  registeredTime: number;
}

export function getInitNoteContent(): NoteContent {
  //
  return {
    id: '',
    content: '',
    modifiedTime: 0,
    noteId: '',
    playSecond: 0,
    registeredTime: 0,
  };
}
