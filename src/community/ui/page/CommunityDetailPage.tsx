import React, { useEffect, useState, useCallback } from 'react';
import {
  Link,
  matchPath,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  requestNotice,
  requestRecent,
} from '../../service/useCommunityHome/requestCommunityHome';
import {
  getCommunityHome,
  useCommunityHome,
} from '../../store/CommunityHomeStore';
import commentIcon from '../../../style/media/icon-community-comment.png';
import fileIcon from '../../../style/media/icon-community-file-copy-2.png';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import defaultHeader from '../../../style/media/bg-ttl-sample-02.png';
import Post from '../../model/Post';
import moment from 'moment';
import { patronInfo } from '@nara.platform/dock';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { joinCommunity, deleteMember } from 'community/api/communityApi';
import { requestCommunity } from 'community/service/useCommunityHome/requestCommunity';
import { Console } from 'console';
import { addNewBadge } from 'community/utility/communityHelper';
import ReactGA from 'react-ga';
import SkProfileApi from 'profile/present/apiclient/SkProfileApi';
import { SkProfileService } from 'profile/stores';

const NoticeItemView: React.FC<Post> = function NoticeItemView({
  communityId,
  postId,
  title,
  html,
  createdTime,
  replyCount,
}) {
  const createdDate = moment(createdTime).format('YYYY.MM.DD');
  const isNew = addNewBadge(createdTime); //moment().format('YYYY.MM.DD') === createdDate;
  const [text, setText] = useState<string>('');
  const communityHome = useCommunityHome();
  const history = useHistory();
  const approved = communityHome?.community?.approved;

  useEffect(() => {
    const div = document.createElement('div');
    div.innerHTML = html;
    let nextText = div.innerText;
    nextText = nextText
      .split('\n')
      .filter(c => c !== '')
      .join('\n');
    setText(nextText);
  }, []);

  const Alert = useCallback(() => {
    if (approved === null) {
      reactConfirm({
        title: '알림',
        message: '커뮤니티에 가입하시겠습니까?',
        onOk: async () => {
          const communtyHome = getCommunityHome();
          if (
            communtyHome === undefined ||
            communtyHome.community === undefined
          ) {
            return;
          }
          await joinCommunity(communtyHome.community.communityId);
          requestCommunity(communtyHome.community.communityId);
        },
      });
    } else if (approved === false) {
      reactAlert({
        title: '안내',
        message: '지금 가입 승인을 기다리는 중입니다.',
      });
    } else if (approved === true) {
      history.push(`/community/${communityId}/post/${postId}`);
    }
  }, [approved]);

  return (
    <div className="community-home-card">
      <div
        className="ui comments base"
        style={{ display: 'block', cursor: 'pointer' }}
        onClick={Alert}
      >
        <div className="home-card-top">
          <h3>
            {title} {isNew && <span className="new-label">NEW</span>}
          </h3>
          <p>{text}</p>
        </div>
        <div className="home-card-bottom">
          <span>{createdDate}</span>
          <span>
            <img src={commentIcon} />
            {replyCount}
          </span>
        </div>
      </div>
    </div>
  );
};

const RecentItemView: React.FC<Post> = function RecentItemView({
  communityId,
  postId,
  type,
  title,
  html,
  fileBoxId,
  nickName,
  createdTime,
  creatorName,
  profileImg,
  replyCount,
}) {
  const createdDate = moment(createdTime).format('YYYY.MM.DD');
  const isNew = addNewBadge(createdTime); //moment().format('YYYY.MM.DD') === createdDate;
  const [text, setText] = useState<string>('');
  const history = useHistory();
  const communityHome = useCommunityHome();
  const approved = communityHome?.community?.approved;

  useEffect(() => {
    const div = document.createElement('div');
    div.innerHTML = html;
    let nextText = div.innerText;
    nextText = nextText
      .split('\n')
      .filter(c => c !== '')
      .join('\n');
    setText(nextText);
  }, []);

  const Alert = useCallback(() => {
    if (approved === null) {
      reactConfirm({
        title: '알림',
        message: '커뮤니티에 가입하시겠습니까?',
        onOk: async () => {
          const communtyHome = getCommunityHome();
          if (
            communtyHome === undefined ||
            communtyHome.community === undefined
          ) {
            return;
          }
          await joinCommunity(communtyHome.community.communityId);
          requestCommunity(communtyHome.community.communityId);
        },
      });
    } else if (approved === false) {
      reactAlert({
        title: '안내',
        message: '지금 가입 승인을 기다리는 중입니다.',
      });
    } else if (approved === true) {
      if (type === 'ANONYMOUS') {
        history.push(`/community/${communityId}/ANONYMOUS/post/${postId}`);
      } else {
        history.push(`/community/${communityId}/post/${postId}`);
      }
    }
  }, [approved]);

  return (
    <div
      className="new-board-list"
      style={{ display: 'block', cursor: 'pointer' }}
      onClick={Alert}
    >
      <div className="new-board-list-top">
        {/* <img src={BadgeImportant} className="board-badge" /> */}
        {fileBoxId !== undefined && fileBoxId !== null && fileBoxId !== '' && (
          <img src={fileIcon} className="board-file" />
        )}
        <strong>{title}</strong>
        {isNew && <span className="new-label">NEW</span>}
      </div>
      <p>{text}</p>
      <div className="survey-read-side mb0">
        <div className="title-area read-header-left">
          <div className="text-list">
            {type !== 'ANONYMOUS' && (
              <>
                {profileImg ? (
                  <img src={`/files/community/${profileImg}`} />
                ) : (
                  <img src={`${profileIcon}`} />
                )}
              </>
            )}
            {type === 'ANONYMOUS' && <img src={profileIcon} />}
            <span>
              {type === 'ANONYMOUS' ? '익명' : nickName || creatorName}
            </span>
          </div>
          <div className="text-list">
            <span>{createdDate}</span>
          </div>
        </div>
        <div className="right-area">
          <button>
            <img src={commentIcon} />
            {replyCount}
          </button>
        </div>
      </div>
    </div>
  );
};

interface Params {
  communityId: string;
}

const CommunityDetailPage: React.FC<Post> = function CommunityDetailPage({
  communityId,
  postId,
  type,
  title,
  html,
  fileBoxId,
  nickName,
  createdTime,
  creatorName,
  profileImg,
  replyCount,
}) {
  const createdDate = moment(createdTime).format('YYYY.MM.DD');
  const isNew = addNewBadge(createdTime); //moment().format('YYYY.MM.DD') === createdDate;
  const [text, setText] = useState<string>('');
  const history = useHistory();
  const communityHome = useCommunityHome();
  const approved = communityHome?.community?.approved;

  if (communityHome === undefined || communityHome.community === undefined) {
    return null;
  } else {
    ReactGA.event({
      category: 'Community',
      action: 'Click',
      label: `${communityHome!.community!.name}`,
    });
  }
  const drawCommunity = () => {
    reactConfirm({
      title: '알림',
      message:
        '커뮤니트를 탈퇴하시겠습니까? 작성하신 게시글은 해당 커뮤니티에 남겨 집니다.',
      onOk: async () => {
        const communtyHome = getCommunityHome();
        if (
          communtyHome === undefined ||
          communtyHome.community === undefined
        ) {
          return;
        }
        await deleteMember(communityId, SkProfileService.instance.skProfile.id);
        history.goBack();
      },
    });
    // reactConfirm({
    //   title: '확인',
    //   message: `${name} 커뮤니트를 탈퇴하시겠습니까? 작성하신 게시글은 해당 커뮤니티에 남겨 집니다.`,
    //   onOk: async () => {
    //     delMember(communityId);
    //   },
    // });
  };
  return (
    <>
      <div className="community-home-contants">
        {/* 배너 */}
        <div className="community-banner-type1">
          {communityHome.community.homeType === 'BASIC' && (
            <>
              {communityHome.community.homeThumbnailId !== null && (
                <img
                  src={`/files/community/${communityHome.community.homeThumbnailId}`}
                />
              )}
              {communityHome.community.homeThumbnailId === null && (
                <img src={defaultHeader} />
              )}
              <div className="community-banner-inner">
                <div
                  className="community-banner-title"
                  style={{
                    color: communityHome.community.color
                      ? communityHome.community.color
                      : '#FFFFFF',
                  }}
                >
                  {communityHome.community.name}
                </div>
                <div
                  className="community-banner-copy"
                  style={{
                    color: communityHome.community.color
                      ? communityHome.community.color
                      : '#FFFFFF',
                  }}
                >
                  {communityHome.community.introduce}
                </div>
              </div>
            </>
          )}
          {communityHome.community.homeType === 'HTML' && (
            <div
              className="community-banner-type2"
              dangerouslySetInnerHTML={{
                __html: communityHome.community.html || '',
              }}
            />
          )}
          {communityHome.community.homeType === null && (
            <>
              <img src={defaultHeader} />
              <div className="community-banner-inner">
                <div
                  className="community-banner-title"
                  style={{
                    color: communityHome.community.color
                      ? communityHome.community.color
                      : '#FFFFFF',
                  }}
                >
                  {communityHome.community.name}
                </div>
                <div className="community-banner-copy" />
              </div>
            </>
          )}
        </div>

        {/* 공지사항 */}

        {/* 최근 게시글 */}

        <div className="my-commu-table">
          <table>
            <tbody>
              <tr>
                <th>커뮤니티명</th>
                <td>{communityHome.community.name}</td>
              </tr>
              <tr>
                <th>커뮤니티 설명</th>
                <td>{communityHome.community.description}</td>
              </tr>
              <tr>
                <th>관리자 정보</th>
                <td>
                  <div className="profile home-detail-profile">
                    <div className="pic">{/* <img src={profile} /> */}</div>
                    <span className="crown">
                      {communityHome.community.managerName}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>개설 일자</th>
                <td>{createdDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="ui button sece_btn"
          onClick={drawCommunity}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAABdUlEQVRIDe2UMU7DQBBF568pECdAgYJbUBIKmiAOQMENEpN0WEIiBSJ0GOyKhoqWjtARuAQSBYcgQpFAiYe1hezs2uu1TMpESjQ7f/z+7qwzRMuPpQPQ9WPP354xHxKhAXCqM4NJ8F140XvSnylbr8yLHe9mZ8bRCIQfAn0wE2e65JPYyNbVIsUAFB0R8RetOptB3x1XQ5RXKQbMvC6b8h5WgHc8/1nW7wJOMxi4ryYbYRJseXknCZQpGsatNdXXNkiBzGtlJkqL0ofmgrbnPxJzay71F0ZZKjZBcpKW3i77CQrhGTuNDCexG6SECkGByWINCvawWANgAhLKPdgNgGHBxvKpAnhcZH2LwkF3P08jap9cnxFF/UQzwGPNfoKEUPJTAv+XgZy0yb9X77m+lXQcx4KcL7dygh6gIbYC1/3Wi+usFYPu6VVzOqURgLEc1G95oAiDS/c+nzdnlDvwz3svIGdPwh/kVP3Uv3B4YkYtlZod+AX115HSsSePVgAAAABJRU5ErkJggg==" />
          <span>탈퇴하기</span>
        </button>
      </div>
    </>
  );
};

export default CommunityDetailPage;
