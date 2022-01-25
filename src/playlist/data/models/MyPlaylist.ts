import { PlaylistType } from './PlaylistType';

export interface MyPlaylist {
  denizenId: string;
  id: string;
  modifiedTime: number;
  playlist: {
    cardIds: string[];
    commentFeedbackId: string;
    denizenId: string;
    description: string;
    expose: boolean;
    id: string;
    likeFeedbackId: string;
    modifiedTime: number;
    registeredTime: number;
    title: string;
  };
  playlistId: string;
  recommendation: string;
  registeredTime: number;
  type: PlaylistType;
}
