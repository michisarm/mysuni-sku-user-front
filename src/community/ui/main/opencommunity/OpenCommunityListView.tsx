import { useMainOpenCommunities } from './opencommunity.services';
import React, { useCallback } from 'react';
import { Area } from '../../../../tracker/model/ActionType';
import { OpenCommunityItem } from './opencommunity.model';
import { useHistory, Link } from 'react-router-dom';
import { Modal, Form, Button, Icon, Image } from 'semantic-ui-react';
import { useInput } from '../../../packages/hooks/useInput';
import { existsBySecretCommunity } from '../../data/community/apis/secretCommunitiesApi';
import { COMMUNITY_MAIN_PARAM_COMMUNITYID } from '../../page/CommunityRoutes';
import { showAlert } from '../../../packages/alert/Alert';

import managerIcon from '../../assets/icon-community-manager.png';
import { requestFindAllOpenCommunities } from './opencommunity.request.services';
import _ from 'lodash';
import { COMMUNITY_HOME_PATH } from '../../page/CommunityRoutes';
import {
  onClickOpenCommunityBookmark,
  onClickOpenCommunityUnBookmark,
} from './opencommunity.events';

interface SecretModalProps {
  communityId: string;
  open?: boolean;
  onClose: () => void;
  managerEmail: string;
}

const remarkPlaceholder = `비밀번호를 입력해주세요.`;

function SecretModal(props: SecretModalProps) {
  const { open, onClose, managerEmail, communityId } = props;
  const [secret, onChangeSecret] = useInput();

  const onConfirmModal = useCallback(async () => {
    if (secret === undefined) {
      return;
    }
    const match = await existsBySecretCommunity(communityId, secret);
    if (match === true) {
      window.open(`/suni-community/community/${communityId}/home`);
    } else {
      showAlert({
        title: '확인',
        message:
          '잘못된 비밀번호 입니다. 커뮤니티 비밀번호를 다시 확인해주세요.',
      });
    }
    onClose();
  }, [communityId, onClose, secret]);

  return (
    <Modal open={open} onClose={onClose} className="base w380">
      <Modal.Header>
        <span>비밀번호</span>
      </Modal.Header>
      <Modal.Content className="admin_popup_reject">
        <h4>
          해당 커뮤니티에 입장하기 위해서는 <br />
          비밀번호가 필요합니다.
        </h4>
        <Form>
          <Form.Field>
            <input
              type="password"
              className="commu_pw_form"
              placeholder={remarkPlaceholder}
              onChange={onChangeSecret}
              maxLength={4}
            />
          </Form.Field>
        </Form>
        <a href={`mailto:${managerEmail}`} target="_blank" rel="noreferrer">
          {/*임시로 김동구과장 메일 주소 기입*/}
          관리자에게 문의하기
        </a>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d" onClick={onClose}>
          취소
        </Button>
        <Button className="pop2 p" onClick={onConfirmModal}>
          확인
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function ItemView(props: OpenCommunityItem) {
  const {
    communityId,
    fieldName,
    approvedState,
    name,
    description,
    managerNickName,
    memberCount,
    thumbnailId,
    type,
    managerEmail,
    bookmarked,
  } = props;

  const [openModal, setOpenModal] = React.useState<boolean>();

  const onModalClose = () => {
    setOpenModal(false);
  };

  const showModal = () => {
    if (type === 'SECRET') {
      setOpenModal(true);
    }
  };

  return (
    <>
      {type === 'SECRET' && (
        <SecretModal
          open={openModal}
          onClose={onModalClose}
          managerEmail={managerEmail}
          communityId={communityId}
        />
      )}
      <div className="community-open-card coc_v2" onClick={showModal}>
        <div className="open-card-top">
          <span
            className="label"
            style={{ visibility: _.isEmpty(fieldName) ? 'hidden' : 'visible' }}
          >
            {fieldName}
          </span>
          <div className="iconbox">
            <span
              className={`${
                approvedState === 'WAITING' ? 'waiton' : 'waitoff'
              }`}
            >
              가입대기
            </span>
            {type === 'SECRET' && (
              <span className="lockon">
                <Icon>
                  <Image
                    src="/suni-community/images/all/icon-card-lock.png"
                    alt="비공개"
                  />
                </Icon>
              </span>
            )}
            <div className="favorites_btn">
              <Button
                id={communityId}
                className={`${bookmarked ? 'on' : 'off'}`}
                onClick={
                  bookmarked
                    ? onClickOpenCommunityUnBookmark
                    : onClickOpenCommunityBookmark
                }
              >
                <Icon className="favoff">
                  <Image
                    src="/suni-community/images/all/icon-favorite-off-18-px.svg"
                    alt="즐겨찾기 제거"
                  />
                </Icon>
                <Icon className="favon">
                  <Image
                    src="/suni-community/images/all/icon-favorite-on-18-px.svg"
                    alt="즐겨찾기 추가"
                  />
                </Icon>
              </Button>
            </div>
          </div>
        </div>
        {/* {type === 'COHORT' && (
        <div>
          <span className="label">{fieldName}</span>
          {approvedState === 'WAITING' && (
            <span className="wait">가입대기</span>
          )}
        </div>
      )} */}
        {type === 'SECRET' && (
          <div>
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
                  dangerouslySetInnerHTML={{
                    __html: description.substring(0, 60),
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {type !== 'SECRET' && (
          <Link
            to={COMMUNITY_HOME_PATH.replace(
              COMMUNITY_MAIN_PARAM_COMMUNITYID,
              communityId
            )}
            target="_blank"
          >
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
                  dangerouslySetInnerHTML={{
                    __html: description.substring(0, 60),
                  }}
                />
              </div>
            </div>
          </Link>
        )}
        <div className="open-card-bottom">
          <div className="title-area">
            <div className="text-list">
              <img src={managerIcon} />
              <span>{managerNickName}</span>
            </div>
          </div>
          <div className="right-area">
            <span>멤버</span>
            <span>{memberCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function OpenCommunityListView() {
  const openCommunities = useMainOpenCommunities();

  if (openCommunities === undefined) {
    return null;
  }
  if (openCommunities.ingRequest === true || openCommunities.totalCount === 0) {
    return null;
  }

  const { items, totalCount, index } = openCommunities;

  return (
    <>
      <div
        className="course-detail-center community-containter padding-none"
        data-area={Area.COMMUNITY_LIST}
      >
        <div className="community-open-contants">
          {items.map((communityItem) => (
            <ItemView key={communityItem.communityId} {...communityItem} />
          ))}
        </div>
      </div>
      <div className="more-comments community-side">
        {totalCount > index && (
          <Button
            icon
            className="left moreview"
            onClick={requestFindAllOpenCommunities}
          >
            <Icon className="moreview" /> list more
          </Button>
        )}
        {totalCount <= index && (
          <Button
            icon
            className="left moreview"
            style={{ cursor: 'default' }}
          />
        )}
      </div>
    </>
  );
}
