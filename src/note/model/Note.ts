import { PatronKey } from '@nara.platform/accent';

export default interface Note {
  id: string;
  patronKey: PatronKey;
  collegeId: string;
  channelId: string;
  cardId: string;
  cardName: string;
  cubeId: string;
  cubeName: string;
  content: string;
  folderId: string;
  playTime: string;
  createDate: number;
  updateDate: number;

}
