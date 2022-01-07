import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

export interface LectureNote {
  results: noteItem[];
  totalCount: any;
}
export interface LectureNoteItem {
  cardId: string;
  channelId: string;
  collegeId: string;
  id: string;
  patronKey: object;
  cubeId: string;
  folderId: string;
  registeredTime: number;
  content: string;
  convertContent?: string;
  playTime: string;
  modifiedTime: number;
  type: string;
}

export interface noteItem {
  LectureNoteItemRom: LectureNoteItemRom;
  note: LectureNoteItemNote | any;
  type: string;
  convertContent?: string;
}

export function initNoteItem() {
  return {
    LectureNoteItemRom: initLectureNoteItemRom(),
    note: initLectureNoteItemNote(),
    type: '',
    convertContent: '',
  };
}

export interface LectureNoteItemRom {
  cardId: string;
  cardName: PolyglotString;
  channelId: string;
  collegeId: string;
  cubeId: string;
  cubeName: PolyglotString;
}

export function initLectureNoteItemRom(): LectureNoteItemRom {
  //
  return {
    cardId: '',
    cardName: { ko: '', en: '', zh: '' },
    channelId: '',
    collegeId: '',
    cubeId: '',
    cubeName: { ko: '', en: '', zh: '' },
  };
}

export interface LectureNoteItemNote {
  cardId: string;
  channelId: string;
  collegeId: string;
  content: string;
  registeredTime: number;
  cubeId: string;
  cubeType: string;
  folderId: string;
  id: string;
  patronKey: object;
  playTime: number;
  modifiedTime: number;
  type?: string;
}

export function initLectureNoteItemNote(): LectureNoteItemNote {
  //
  return {
    cardId: '',
    channelId: '',
    collegeId: '',
    content: '',
    registeredTime: 0,
    cubeId: '',
    cubeType: '',
    folderId: '',
    id: '',
    patronKey: {},
    playTime: 0,
    modifiedTime: 0,
    type: '',
  };
}
