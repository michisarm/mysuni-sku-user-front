import { PatronKey } from '@nara.platform/accent';

export default interface Note {
  id: string;
  patronKey: PatronKey;
  cardId: string;
  cubeId: string;
  cubeType: string;
  content: string;
  folderId: string;
  playTime: string;
  createDate: number;
  updateDate: number;
}
