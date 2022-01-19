import React, { useCallback, useState } from 'react';
import { Icon, Label, Menu } from 'semantic-ui-react';
import { useMyPagePlaylistDetail } from '../MyPagePlaylistDetail.services';
import MyPagePlaylistDetailNoCardList from './MyPagePlaylistDetailNoCardList';
import MyPagePlaylistDetailCardList from '../myPagePlaylistDetailCardList/MyPagePlaylistDetailCardList';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import MyPagePlaylistDetailCommentView from './MyPagePlaylistDetailCommentView';
import { onOpenRecommendMemberPopUp } from 'playlist/recommendMemberPopUp/recommendMemberPopUp.events';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { RecommendMemberPopUpView } from 'playlist/recommendMemberPopUp/RecommendMemberPopUpView';

function MyPagePlaylistDetailContentContainer() {
  const [activatedTab, setActivatedTab] = useState<string>('overview');
  const overviewHashClick = useCallback(() => {
    setActivatedTab('overview');
  }, []);

  const commentHashClick = useCallback(() => {
    setActivatedTab('comment');
  }, []);
  const playlistDetail = useMyPagePlaylistDetail();
  const [playlistType, setPlaylistType] = useState<PlaylistType>('');

  const onOpenRecommenedMemberPopUp = useCallback(() => {
    setPlaylistType('Recommended');
    onOpenRecommendMemberPopUp();
  }, []);

  const onOpenMadeByOthersPopUp = useCallback(() => {
    setPlaylistType('MadeByOthers');
    onOpenRecommendMemberPopUp();
  }, []);

  if (playlistDetail === undefined) {
    return null;
  }

  const { sharedUserCount, recommendedUserCount, cardIds, type } =
    playlistDetail;
  return (
    <div className="playlist-detail-content">
      <Menu className="playlist-view-tab">
        <Menu.Item
          onClick={overviewHashClick}
          to=""
          active={activatedTab === 'overview'}
        >
          View All
        </Menu.Item>
        <Menu.Item
          onClick={commentHashClick}
          to=""
          active={activatedTab === 'comment'}
        >
          Comments
        </Menu.Item>
        <div className="playlist-view-right">
          <Label
            as="button"
            className="onlytext"
            onClick={
              recommendedUserCount !== 0
                ? onOpenRecommenedMemberPopUp
                : () => {}
            }
          >
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
          <Label
            as="button"
            className="onlytext"
            onClick={sharedUserCount !== 0 ? onOpenMadeByOthersPopUp : () => {}}
          >
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
      <RecommendMemberPopUpView playlistType={playlistType} />
      {cardIds.length !== 0
        ? activatedTab === 'overview' && (
            <MyPagePlaylistDetailCardList type={type} />
          )
        : activatedTab === 'overview' && <MyPagePlaylistDetailNoCardList />}
      {activatedTab === 'comment' && <MyPagePlaylistDetailCommentView />}
    </div>
  );
}

export default MyPagePlaylistDetailContentContainer;
