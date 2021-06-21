export default interface Note {
  empty: boolean;
  results: noteItem[];
  totalCount: number;
}

interface noteItem {
  cardId: string;
  cardName: string;
  channelId: string;
  collegeId: string;
  content: string;
  createDate: number;
  cubeId: string;
  cubeName: string;
  cubeType: string;
  folderId: string;
  id: string;
  partronKey: {
    keyString: string;
  };
  playTime: string;
  updateDate: number;
}
