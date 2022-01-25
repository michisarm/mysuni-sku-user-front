import { MyPlaylist } from './MyPlaylist';
import { Playlist } from './Playlist';
import { Registrant } from './Registrant';

export interface PlaylistDetail {
  myPlaylist: MyPlaylist;
  playlist: Playlist;
  recommendedUserCount: number;
  registrant: Registrant;
  sharedUserCount: number;
}
