import React from 'react';
import { Icon, Label, Menu } from 'semantic-ui-react';
import { useMyPagePlaylistDetail } from '../MyPagePlaylistDetail.services';

import { Link } from 'react-router-dom';
import MyPagePlaylistDetailNoCardList from './MyPagePlaylistDetailNoCardList';
import MyPagePlaylistDetailCardList from '../myPagePlaylistDetailCardList/MyPagePlaylistDetailCardList';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

function MyPagePlaylistDetailContentContainer() {
  const playlistDetail = useMyPagePlaylistDetail();
  if (playlistDetail === undefined) {
    return null;
  }
  const { sharedUserCount, recommendedUserCount, cardIds, type } =
    playlistDetail;

  return (
    <div className="playlist-detail-content">
      <Menu className="playlist-view-tab">
        <Menu.Item
          as={Link}
          //  onClick={this.handleItemClick}
          to=""
          className="active"
        >
          View All
        </Menu.Item>
        <Menu.Item
          as={Link} //onClick={this.handleItemClick}
          to=""
        >
          Comments
        </Menu.Item>
        <div className="playlist-view-right">
          <Label as="button" className="onlytext">
            {' '}
            <Icon className="list-recommended" />
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `추천받은 구성원 <strong>{recommendedUserCount}명</strong>`,
                  'mypage-playlist-추천받은수',
                  {
                    recommendedUserCount: recommendedUserCount.toString(),
                  }
                ),
              }}
            />
          </Label>
          <Label as="button" className="onlytext">
            {' '}
            <Icon className="list-like" />
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `담아간 구성원 <strong>{sharedUserCount}명</strong>`,
                  'mypage-playlist-담아간수',
                  {
                    sharedUserCount: sharedUserCount.toString(),
                  }
                ),
              }}
            />
          </Label>
        </div>
      </Menu>
      {cardIds.length !== 0 ? (
        <MyPagePlaylistDetailCardList type={type} />
      ) : (
        <MyPagePlaylistDetailNoCardList />
      )}
    </div>
  );
}

export default MyPagePlaylistDetailContentContainer;
