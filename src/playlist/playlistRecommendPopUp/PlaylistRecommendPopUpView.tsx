import React, { useCallback, useState } from 'react';
import { Button, Icon, Modal, Tab } from 'semantic-ui-react';
import { ProfileComponent } from './components/ProfileComponent';
import {
  useCheckedMemberList,
  useIsOpenPlaylistRecommendPopUp,
} from './playlistRecommendPopUp.store';
import { DepartmentMemberTab } from './components/DepartmentMemberTab';
import { MySuniUserTab } from './components/MySuniUserTab';
import { FollowingTab } from './components/FollowingTab';
import {
  onClearCheckedMember,
  onClickAllClearCheckedMember,
  onRecommendPlaylist,
  onClosePlaylistRecommendPopUp,
} from './playlistRecommendPopUp.events';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

export function RecommendPopUpLeftComponent() {
  const panes = [
    {
      menuItem: getPolyglotText('소속 부서 구성원', 'playlist-popup-구성원'),
      render: () => <DepartmentMemberTab />,
    },
    {
      menuItem: getPolyglotText('mySUNI 사용자', 'playlist-popup-사용자'),
      render: () => <MySuniUserTab />,
    },
    {
      menuItem: getPolyglotText('팔로워', 'playlist-popup-팔로워'),
      render: () => <FollowingTab />,
    },
  ];

  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}

export function RecommendPopUpRightComponent() {
  const checkedMemberList = useCheckedMemberList();

  return (
    <>
      <div className="sh-header">
        <div className="h-left">
          <span>Selected</span>{' '}
          <strong>
            {checkedMemberList.length}
            <PolyglotText defaultString="명" id="playlist-popup-선택명수" />
          </strong>
        </div>
        <div className="h-right">
          <Button
            icon
            className="all-dt"
            onClick={onClickAllClearCheckedMember}
          >
            <Icon className="delete14" />
            <PolyglotText
              defaultString="전체삭제"
              id="playlist-popup-전체삭제"
            />
          </Button>
        </div>
      </div>
      <div className="sh-list-contents">
        {checkedMemberList.length === 0 ? (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
            <span className="blind">콘텐츠 없음</span>
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `Playlist를 추천할\n학습자를 선택해주세요.`,
                  'playlist-popup-추천구성원'
                ),
              }}
            />
          </div>
        ) : (
          <div className="sh-user-list">
            {checkedMemberList.map((member) => (
              <div className="user-prf" id={member.id}>
                <ProfileComponent {...member} />
                <Button
                  icon
                  className="img-icon clear"
                  id={member.id}
                  onClick={onClearCheckedMember}
                >
                  <Icon className="clear2" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function PlaylistRecommendPopUpView() {
  const isOpen = useIsOpenPlaylistRecommendPopUp();
  const [recommendation, setRecommendation] = useState('');

  const onChangeRecommendation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecommendation(e.target.value);
    },
    []
  );

  const onClickRecommend = useCallback(() => {
    onRecommendPlaylist(recommendation);
  }, [recommendation]);

  return (
    <Modal open={isOpen} className="base w1000 pl-share">
      <Modal.Header className="res xfl">
        <span>
          <PolyglotText
            defaultString="Playlist 추천하기"
            id="playlist-popup-추천하기"
          />
        </span>
        <Button className="close24" onClick={onClosePlaylistRecommendPopUp}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="inner scrolling-80vh">
          <div className="sh-left">
            <RecommendPopUpLeftComponent />
          </div>
          <div className="sh-right">
            <RecommendPopUpRightComponent />
          </div>
          <div className="sh-bottom">
            <div className="sh-tit">
              <PolyglotText
                defaultString="메시지 내용"
                id="playlist-popup-메세지내용"
              />
            </div>
            <div
              className={`ui right-top-count input ${
                recommendation.length > 50 ? 'error' : ''
              }`}
            >
              <span className="count">
                <span className="now">{recommendation.length}</span>/
                <span className="max">50</span>
              </span>
              <input
                type="text"
                placeholder={getPolyglotText(
                  'Playlist와 함께 추천할 메시지 내용을 입력해주세요.',
                  'playlist-popup-추천메세지'
                )}
                onChange={onChangeRecommendation}
              />
              <span className="validation">
                <PolyglotText
                  defaultString="최대 50자까지 입력 가능합니다."
                  id="playlist-popup-최대50"
                />
              </span>
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button className="w190 pop p" onClick={onClickRecommend}>
          <PolyglotText defaultString="추천" id="playlist-popup-추천버튼" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
