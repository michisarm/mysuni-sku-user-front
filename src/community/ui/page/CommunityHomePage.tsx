import React, { useEffect } from 'react';
import { Link, matchPath, useLocation, useParams } from 'react-router-dom';
import {
  requestNotice,
  requestRecent,
} from '../../service/useCommunityHome/requestCommunityHome';
import { useCommunityHome } from '../../store/CommunityHomeStore';
import commentIcon from '../../../style/media/icon-community-comment.png';
import fileIcon from '../../../style/media/icon-community-file-copy-2.png';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import defaultHeader from '../../../style/media/bg-ttl-sample-02.png';
import Post from '../../model/Post';
import moment from 'moment';
import { patronInfo } from '@nara.platform/dock';

const NoticeItemView: React.FC<Post> = function NoticeItemView({
  title,
  html,
  createdTime,
}) {
  const createdDate = moment(createdTime).format('YYYY.MM.DD');
  const isNew = moment().format('YYYY.MM.DD') === createdDate;
  return (
    <div className="community-home-card">
      <div className="ui comments base">
        <div className="home-card-top">
          <h3>
            {title} {isNew && <span className="new-label">NEW</span>}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className="home-card-bottom">
          <span>{createdDate}</span>
          <span>
            <img src={commentIcon} />0
          </span>
        </div>
      </div>
    </div>
  );
};

const RecentItemView: React.FC<Post> = function RecentItemView({
  title,
  html,
  fileBoxId,
  createdTime,
  creatorName,
}) {
  const createdDate = moment(createdTime).format('YYYY.MM.DD');
  const isNew = moment().format('YYYY.MM.DD') === createdDate;
  return (
    <div className="new-board-list">
      <div className="new-board-list-top">
        {/* <img src={BadgeImportant} className="board-badge" /> */}
        {fileBoxId !== undefined && fileBoxId !== null && fileBoxId !== '' && (
          <img src={fileIcon} className="board-file" />
        )}
        <strong>{title}</strong>
        {isNew && <span className="new-label">NEW</span>}
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="survey-read-side mb0">
        <div className="title-area read-header-left">
          <div className="text-list">
            <img src={profileIcon} />
            <span>{creatorName}</span>
          </div>
          <div className="text-list">
            <span>{createdDate}</span>
          </div>
        </div>
        <div className="right-area">
          <button>
            <img src={commentIcon} />0
          </button>
        </div>
      </div>
    </div>
  );
};

interface Params {
  communityId: string;
}

function CommunityHomePage() {
  const { pathname } = useLocation();
  const { communityId } = useParams<Params>();
  const communityHome = useCommunityHome();
  useEffect(() => {
    const match = matchPath<Params>(pathname, {
      path: '/community/:communityId',
      exact: true,
    });
    if (match === null) {
      return;
    }
    const { communityId } = match.params;

    requestNotice(communityId);
    requestRecent(communityId);
  }, [pathname]);
  if (communityHome === undefined || communityHome.community === undefined) {
    return null;
  }
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
                <div className="community-banner-title">
                  {communityHome.community.name}
                </div>
                <div className="community-banner-copy">
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
                <div className="community-banner-title">
                  {communityHome.community.name}
                </div>
                <div className="community-banner-copy" />
              </div>
            </>
          )}
        </div>

        {/* 공지사항 */}
        <div className="home-card-container">
          <div className="home-card-title">
            <p>공지사항</p>
            {communityHome.community.approved === true &&
              communityHome.notice.length > 0 && (
                <Link
                  className="ui icon button right btn-blue btn-more"
                  to={`/community/${communityId}/notice`}
                >
                  more
                  <i aria-hidden="true" className="icon more3" />
                </Link>
              )}
          </div>
          {communityHome.notice.length > 0 &&
            communityHome.notice.map(post => (
              <NoticeItemView key={post.postId} {...post} />
            ))}
          {communityHome.noticeRequested && communityHome.notice.length === 0 && (
            <div className="no-cont-wrap">
              <i aria-hidden="true" className="icon no-contents80" />
              <div className="text">등록된 게시물이 없습니다.</div>
            </div>
          )}
        </div>

        {/* 최근 게시글 */}
        <div className="home-card-container">
          <div className="home-card-title">
            <p>최근 게시글</p>
            {communityHome.community.approved === true &&
              communityHome.recent.length > 0 && (
                <Link
                  className="ui icon button right btn-blue btn-more"
                  to={`/community/${communityId}/all`}
                >
                  more
                  <i aria-hidden="true" className="icon more3" />
                </Link>
              )}
          </div>
          <div className="new-board">
            {communityHome.recent.length > 0 &&
              communityHome.recent.map(post => (
                <RecentItemView key={post.postId} {...post} />
              ))}
          </div>
          {communityHome.recentRequested && communityHome.recent.length === 0 && (
            <div className="no-cont-wrap">
              <i aria-hidden="true" className="icon no-contents80" />
              <div className="text">등록된 게시물이 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommunityHomePage;
