import { PlaylistType } from './PlaylistType';

export interface PlaylistDetailSummary {
  cardIds: string[];
  displayNicknameFirst: boolean;
  id: string;
  likeFeedbackId: string;
  name: {
    en: string;
    ko: string;
    zh: string;
  };
  nickname: string;
  photoImagePath: string;
  thumbImagePath: string;
  title: string;
  type: PlaylistType;

  likeCount: number;
  myLike: boolean;
}
