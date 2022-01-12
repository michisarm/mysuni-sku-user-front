import React, { useMemo } from 'react';
import { Button, Icon, Modal, Tab } from 'semantic-ui-react';
import { ProfileComponent } from './components/ProfileComponent';
import {
  useCheckedMemberList,
  useIsOpenPlaylistRecommendPopUp,
  useRecommendation,
} from './playlistRecommendPopUp.store';
import { DepartmentMemberTab } from './components/DepartmentMemberTab';
import { MySuniUserTab } from './components/MySuniUserTab';
import { FollowingTab } from './components/FollowingTab';
import {
  onClickAllClearCheckedMember,
  onClosePlaylistRecommendPopUp,
} from './playlistRecommendPopUp.events';

export function RecommendPopUpLeftComponent() {
  const panes = [
    {
      menuItem: '소속 부서 구성원',
      render: () => <DepartmentMemberTab />,
    },
    {
      menuItem: 'mySUNI 사용자',
      render: () => <MySuniUserTab />,
    },
    {
      menuItem: '팔로잉',
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
          <span>Selected</span>
          <strong> {checkedMemberList.length}명</strong>
        </div>
        <div className="h-right">
          <Button
            icon
            className="all-dt"
            onClick={onClickAllClearCheckedMember}
          >
            <Icon className="delete14" />
            전체삭제
          </Button>
        </div>
      </div>
      <div className="sh-list-contents">
        {checkedMemberList.length === 0 ? (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
            <span className="blind">콘텐츠 없음</span>
            <div className="text">
              {' Playlist를 추천할\n학습자를 선택해주세요.'}
            </div>
          </div>
        ) : (
          <div className="sh-user-list">
            {checkedMemberList.map((member) => (
              <div className="user-prf" id={member.id}>
                <ProfileComponent {...member} />
                <Button icon className="img-icon clear" id={member.id}>
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
  const recommendation = useRecommendation();

  return (
    <Modal open={isOpen} className="base w1000 pl-share">
      <Modal.Header className="res xfl">
        <span>Playlist 추천하기</span>
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
            <div className="sh-tit">메시지 내용</div>
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
                placeholder="Playlist와 함께 추천할 메시지 내용을 입력해주세요."
              />
              <span className="validation">최대 50자까지 입력 가능합니다.</span>
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button className="w190 pop p">추천</Button>
      </Modal.Actions>
    </Modal>
  );
}
