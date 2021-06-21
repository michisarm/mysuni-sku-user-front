import Note from "./Note";

export default interface NoteCdo {
  cardId?: string;
  cubeId?: string;
  cubeType?: string;
  content?: string;
  folderId?: string;
  playTime?: string;
  updateDate?: number;
}


export function convertNoteToNoteCdo(note: Note): NoteCdo {
  return {
    cardId: note.cardId,
    cubeId: note.cubeId,
    cubeType: note.cubeType,
    content: '',
    folderId: note.folderId,
    playTime: note.playTime,
    updateDate: note.updateDate,
  };
}