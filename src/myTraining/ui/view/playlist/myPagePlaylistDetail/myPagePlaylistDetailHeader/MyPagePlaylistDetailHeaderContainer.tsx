import React from 'react';
import { useMyPagePlaylistDetail } from '../MyPagePlaylistDetail.services';
import {
  usePlaylistLikeInfo,
  useRequestPlaylistLike,
} from './MyPagePlaylistDetailHeader.service';
import MyPagePlaylistDetailHeaderView from './MyPagePlaylistDetailHeaderView';

function MyPagePlaylistDetailHeaderContainer() {
  useRequestPlaylistLike();
  const playlistDetail = useMyPagePlaylistDetail();
  const PlaylistLikeInfo = usePlaylistLikeInfo();

  return (
    <div className="playlist-detail-infobox">
      {playlistDetail && PlaylistLikeInfo && (
        <MyPagePlaylistDetailHeaderView
          playlistDetail={playlistDetail}
          PlaylistLikeInfo={PlaylistLikeInfo}
        />
      )}
    </div>
  );
}

export default MyPagePlaylistDetailHeaderContainer;
