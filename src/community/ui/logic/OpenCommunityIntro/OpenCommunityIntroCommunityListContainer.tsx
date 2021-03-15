import React, { useEffect } from 'react';
import { Button, Icon, Radio, Segment } from 'semantic-ui-react';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import { reactConfirm, reactAlert, axiosApi } from '@nara.platform/accent';
import CommunityType from '../../../model/CommunityType';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';
import managerIcon from '../../../../style/media/icon-community-manager.png';
import OpenCommunityPassInputModal from './OpenCommunityPassInputModal';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  requestAppendOpenCommunityList,
  requestOpenCommunityList,
} from '../../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';
import { StreamUtils } from 'xlsx/types';
import { useScrollMove } from 'myTraining/useScrollMove';

interface FieldItemViewProps {}

const OpenCommunityItemView: React.FC<OpenCommunityItem &
  FieldItemViewProps> = function OpenCommunityItemView({
  communityId,
  fieldName,
  approvedState,
  name,
  description,
  managerName,
  managerEmail,
  memberCount,
  thumbnailId,
  type,
}) {
  const history = useHistory();
  const [openModal, setModalWin] = React.useState<{
    passInputModalWin: boolean;
  }>({
    passInputModalWin: false,
  });
  const handleClose = () => {
    setModalWin({
      passInputModalWin: false,
    });
  };
  function handleAlertPassInputWin() {
    setModalWin({
      passInputModalWin: true,
    });
  }
  const handleOk = () => {
    reactAlert({
      title: '확인',
      message:
        '선택한 학습자를 가입 반려 처리하시겠습니까?  입력된 반려 사유는 E-mail과 알림을 통해 전달되며, 등록된 내용은 수정하실 수 없습니다.',
    });
  };
  const onConfirmSecret = async (secret: string) => {
    const url = `/api/community/secretCommunities/existsByCommunity/${communityId}/${secret}`;
    const res = await axiosApi.get(url).then(response => response.data);

    if (res === true) {
      // window.location.href = `/community/${communityId}`;
      history.push(`/community/${communityId}`);
    } else {
      reactAlert({
        title: '확인',
        message: '비밀번호가 맞지 않습니다.',
      });
    }
  };
  return type === 'SECRET' ? (
    <>
      <OpenCommunityPassInputModal
        managerName={managerName}
        managerEmail={managerEmail}
        open={openModal.passInputModalWin}
        handleClose={handleClose}
        onConfirmModal={onConfirmSecret}
      />
      <div
        className="community-open-card lock"
        onClick={handleAlertPassInputWin}
        // onClick={() => passChek(communityId, 'learning')}
      >
        <div className="open-card-top">
          <span className="label">{fieldName}</span>
          {approvedState === 'Wait' && <span className="wait">가입대기</span>}
        </div>
        <div className="open-card-content">
          <p>{name}1</p>
          <div className="thumbnail">
            <img
              src={thumbnailId}
              style={{ height: 72, width: 72, borderRadius: 8 }}
            />
          </div>
          <div className="community-main-left-list">
            <div
              className="community-main-left-h3"
              dangerouslySetInnerHTML={{ __html: description.substring(0, 60) }}
            />
          </div>
        </div>
        <div className="open-card-bottom">
          <div className="title-area">
            <div className="text-list">
              <img src={managerIcon} />
              <span>{managerName}</span>
            </div>
          </div>
          <div className="right-area">
            <span>멤버</span>
            <span>{memberCount}</span>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Link to={`/community/${communityId}`} className="community-open-card">
      <div className="open-card-top">
        <span className="label">{fieldName}</span>
        {approvedState === 'Wait' && <span className="wait">가입대기</span>}
      </div>
      <div className="open-card-content">
        <p>{name}</p>
        <div className="thumbnail">
          <img
            src={thumbnailId}
            style={{ height: 72, width: 72, borderRadius: 8 }}
          />
        </div>
        <div className="community-main-left-list">
          <div
            className="community-main-left-h3"
            dangerouslySetInnerHTML={{ __html: description.substring(0, 60) }}
          />
        </div>
      </div>
      <div className="open-card-bottom">
        <div className="title-area">
          <div className="text-list">
            <img src={managerIcon} />
            <span>{managerName}</span>
          </div>
        </div>
        <div className="right-area">
          <span>멤버</span>
          <span>{memberCount}</span>
        </div>
      </div>
    </Link>
  );
};

function deleteOffset() {
  sessionStorage.removeItem('communityOffset');
  sessionStorage.removeItem('openCommunityOffset');
}

function sortCreatedTime() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  sessionStorage.setItem('sortName', 'createdTime');
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'createdTime',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function sortMemberCount() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  sessionStorage.setItem('sortName', 'memberCount');
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'memberCount',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function sortName() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  sessionStorage.setItem('sortName', 'name');
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'name',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function sortApproved() {
  const openCommunityIntro = getOpenCommunityIntro();
  if (openCommunityIntro === undefined) {
    return;
  }
  sessionStorage.setItem('sortName', 'approved');
  setOpenCommunityIntro({
    ...openCommunityIntro,
    communitiesSort: 'approved',
    communitiesOffset: 0,
  });
  deleteOffset();
  requestOpenCommunityList();
}

function OpenCommunityIntroCommunityListContainer() {
  const openCommunityIntro = useOpenCommunityIntro();
  const sessionSortName = sessionStorage.getItem('sortName');
  if (openCommunityIntro === undefined) {
    return null;
  }

  return (
    <>
      <div className="open-tab-radio">
        <Radio
          className="base"
          label="최신순"
          name="sort"
          value="createdTime"
          checked={
            sessionSortName === 'createdTime' ||
            openCommunityIntro.communitiesSort === 'createdTime'
          }
          onClick={sortCreatedTime}
        />
        <Radio
          className="base"
          label="멤버순"
          name="sort"
          value="memberCount"
          checked={
            sessionSortName === 'memberCount' ||
            openCommunityIntro.communitiesSort === 'memberCount'
          }
          onClick={sortMemberCount}
        />
        <Radio
          className="base"
          label="가나다순"
          name="sort"
          value="name"
          checked={
            sessionSortName === 'name' ||
            openCommunityIntro.communitiesSort === 'name'
          }
          onClick={sortName}
        />
        <Radio
          className="base"
          label="가입대기"
          name="sort"
          value="approved"
          checked={
            sessionSortName === 'approved' ||
            openCommunityIntro.communitiesSort === 'approved'
          }
          onClick={sortApproved}
        />
      </div>
      <div className="course-detail-center community-containter padding-none">
        <div className="community-open-contants">
          {openCommunityIntro &&
            openCommunityIntro.communities.length > 0 &&
            openCommunityIntro.communities.map(communityItem => (
              <OpenCommunityItemView
                key={communityItem.communityId}
                {...communityItem}
              />
            ))}
          {openCommunityIntro && openCommunityIntro.communities.length === 0 && (
            <section className="content community">
              <Segment className="full">
                <div className="no-cont-wrap">
                  <Icon className="no-contents80" />
                  <span className="blind">콘텐츠 없음</span>
                  <div className="text lms-color-type1">
                    모든 Community에 가입되었습니다.
                  </div>
                  <div className="sub-text">
                    My Community 탭에서 커뮤니티 활동을 해보세요~!
                  </div>
                  <Link to="/community/main">
                    <Button icon className="right btn-blue2">
                      My Community 바로가기
                      <Icon className="morelink" />
                    </Button>
                  </Link>
                </div>
              </Segment>
            </section>
          )}
        </div>
      </div>
      <div className="more-comments community-side">
        {openCommunityIntro.communitiesTotalCount >
          openCommunityIntro.communitiesOffset && (
          <Button
            icon
            className="left moreview"
            onClick={requestAppendOpenCommunityList}
          >
            <Icon className="moreview" /> list more
          </Button>
        )}
        {openCommunityIntro.communitiesTotalCount <=
          openCommunityIntro.communitiesOffset && (
          <Button
            icon
            className="left moreview"
            style={{ cursor: 'default' }}
          />
        )}
      </div>{' '}
    </>
  );
}

export default OpenCommunityIntroCommunityListContainer;
