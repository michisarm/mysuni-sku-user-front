import Note from "./Note";

export default interface NoteCdo {
  collegeId?: string;
  channelId?: string;
  cardId?: string;
  cardName?: string;
  cubeId?: string;
  cubeName?: string;
  cubeType?: string;
  content?: string;
  folderId?: string;
  playTime?: string;
  createDate?: number;
  updateDate?: number;

}


export function convertNoteToNoteCdo(note: Note): NoteCdo {
  return {
    collegeId: note.collegeId,
    channelId: note.channelId,
    cardId: note.cardId,
    cardName: note.cardName,
    cubeId: note.cubeId,
    cubeName: note.cubeName,
    cubeType: note.cubeType,
    content: note.content,
    folderId: note.folderId,
    playTime: note.playTime,
    createDate: note.createDate,
    updateDate: note.updateDate,
  };
}