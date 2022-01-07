import React from 'react';
import { Button, Checkbox, Icon, Modal, Tab } from 'semantic-ui-react';
import {
  MemberList,
  useCheckedMemberList,
  useMemberList,
} from './playlistRecommendPopUp.store';

export function MemberListComponent(memberList: MemberList[]) {}

export function RecommendPopUpRightComponent(memberList: MemberList[]) {
  return (
    <Tab.Pane className="left-inner">
      <div className="sh-left-top">
        <div className="ui h38 search input">
          <input type="text" placeholder="이름 또는 이메일을 검색해주세요." />
          <Icon className="search link" />
        </div>
      </div>
      <div className="sh-left-bottom">
        {memberList.length === 0 ? (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
            <span className="blind">콘텐츠 없음</span>
            <div className="text">
              <strong className="s-word">박써니</strong>에 대한 검색결과가
              없어요! <br />
               Playlist를 추천할 다른 학습자를 검색해주세요.
            </div>
          </div>
        ) : (
          <div className="sh-left-slct">
            <div className="sh-sl-top">
              <Checkbox className="base" label="전체 선택" />
            </div>
            <div className="sh-user-list">
              {
                <div className="user-prf">
                  <div className="user-check">
                    <Checkbox className="base" />
                  </div>
                  <div className="ui profile">
                    <div className="pic s48">
                      {/* <Image src={prf1} alt='프로필사진'/> */}
                    </div>
                    <div className="prf-info">
                      <div className="info-top">
                        <strong className="prf-name">홍*동</strong>
                        <span className="prf-comp">CV Digital 그룹</span>
                      </div>
                      <span className="prf-email">abc**@sk.com</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        )}
      </div>
    </Tab.Pane>
  );
}

export function RecommendPopUpLeftComponent(checkedMemberList: MemberList[]) {
  if (checkedMemberList.length === 0) {
    return (
      <div className="no-cont-wrap">
        <Icon className="no-contents80" />
        <span className="blind">콘텐츠 없음</span>
        <div className="text">{` Playlist를 추천할\n학습자를 선택해주세요.`}</div>
      </div>
    );
  }
  return (
    <div className="sh-user-list">
      {checkedMemberList.map((member) => (
        <div className="user-prf">
          <div className="ui profile">
            <div className="pic s48">
              {/* <Image src={prf1} alt='프로필사진'/> */}
            </div>
            <div className="prf-info">
              <div className="info-top">
                <strong className="prf-name">{member.name}</strong>
                <span className="prf-comp">{member.departmentName}</span>
              </div>
              <span className="prf-email">{member.email}</span>
            </div>
          </div>
          <Button icon className="img-icon clear">
            <Icon className="clear2" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export function PlaylistRecommendPopUpView() {
  const memberList = useMemberList();
  const checkedMemberList = useCheckedMemberList();

  return (
    <Modal
      // open={isOpen}
      className="base w1000 pl-share"
    >
      <Modal.Header className="res xfl">
        <span>Playlist 추천하기</span>
        <Button
          className="close24"
          // onClick={this.close}
        >
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="inner scrolling-80vh">
          <div className="sh-left">
            {/* tab-menu */}
            {/* <Left /> */}
          </div>
          <div className="sh-right">
            {/* right - header */}
            <div className="sh-header">
              <div className="h-left">
                <span>Selected</span>
                <strong> 0명</strong>
              </div>
              <div className="h-right">
                <Button icon className="all-dt">
                  <Icon className="delete14" />
                  전체삭제
                </Button>
              </div>
            </div>
            <div className="sh-list-contents">
              {/* <RecommendPopUpLeftComponent /> */}
            </div>
          </div>
          <div className="sh-bottom">
            <div className="sh-tit">메시지 내용</div>
            <div className="ui right-top-count input">
              {/* class : error > validation */}
              <span className="count">
                <span className="now">0</span>/<span className="max">50</span>
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
