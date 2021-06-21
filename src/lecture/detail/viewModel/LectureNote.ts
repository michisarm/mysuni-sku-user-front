export interface LectureNote {
  results: noteItem[];
  totalCount: any;
}
export interface LectureNoteItem {
  cardId: string;
  cardName: string;
  channelId: string;
  collegeId: string;
  cubeName: string;
  id: string;
  patronKey: object;
  cubeId: string;
  folderId: string;
  createDate: number;
  content: string;
  convertContent?: string;
  playTime: string;
  updateDate: number;
  type: string;
}

export interface noteItem {
  LectureNoteItemRom: LectureNoteItemRom,
  note: LectureNoteItemNote | any,
  type: string,
  convertContent?: string;
}

export interface LectureNoteItemRom {
  cardId: string;
  cardName: string;
  channelId: string;
  collegeId: string;
  cubeId: string;
  cubeName: string;
}

export interface LectureNoteItemNote {
  cardId: string;
  channelId: string;
  collegeId: string;
  content: string;
  createDate: number;
  cubeId: string;
  cubeType: string;
  folderId: string;
  id: string;
  patronKey: object;
  playTime: string;
  updateDate: number;
  type?: string;
}