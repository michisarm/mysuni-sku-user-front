import React from 'react';
import {
  useMyPagePlaylistDetail,
  useRequestMyPagePlaylistDetail,
} from './MyPagePlaylistDetail.services';
import { Segment } from 'semantic-ui-react';
import MyPagePlaylistDetailHeaderContainer from './myPagePlaylistDetailHeader/MyPagePlaylistDetailHeaderContainer';
import MyPagePlaylistDetailContentContainer from './myPagePlaylistDetailContent/MyPagePlaylistDetailContentContainer';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import myPageRoutePaths from 'myTraining/routePaths';

function MyPagePlaylistDetailPage() {
  useRequestMyPagePlaylistDetail();
  const playlistDetail = useMyPagePlaylistDetail();
  if (playlistDetail === undefined) {
    return null;
  }

  return (
    <div className="mypage_contents profile-playlist-contents">
      <div className="mypage-title-wrap">
        <strong className="mypage_title">Playlist</strong>
        <a
          href={myPageRoutePaths.myPagePlaylist()}
          className="btn-txt btn-tolist"
        >
          <PolyglotText
            defaultString="목록으로"
            id="mypage-playlist-목록으로"
          />
        </a>
      </div>
      <Segment className="full">
        <div className="group-wrapper">
          <div className="playlist-list detail-list-wrapper">
            <MyPagePlaylistDetailHeaderContainer />
            <MyPagePlaylistDetailContentContainer />
          </div>
        </div>
      </Segment>
    </div>
  );
}

export default MyPagePlaylistDetailPage;
