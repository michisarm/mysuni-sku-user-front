import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  requestNotice,
  requestRecent,
} from '../../service/useCommunityHome/requestCommunityHome';
import { useCommunityHome } from '../../store/CommunityHomeStore';
import commentIcon from '../../../style/media/icon-community-comment.png';
import fileIcon from '../../../style/media/icon-community-file-copy-2.png';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import Post from '../../model/Post';
import moment from 'moment';

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
  creatorId,
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
            <span>{creatorId}</span>
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
  const { communityId } = useParams<Params>();
  const communityHome = useCommunityHome();
  useEffect(() => {
    requestNotice(communityId);
    requestRecent(communityId);
  }, [communityId]);
  if (communityHome === undefined) {
    return null;
  }
  return (
    <>
      <div className="community-home-contants">
        {/* 배너 */}
        <div className="community-banner-type1">
          {communityHome.home !== undefined && (
            <>
              {communityHome.home.thumbnailId !== undefined && (
                <img
                  src={`/files/community/${communityHome.home.thumbnailId}`}
                />
              )}
              <div className="community-banner-inner">
                <div className="community-banner-title">
                  {communityHome.community?.name}
                </div>
                <div className="community-banner-copy">
                  {communityHome.home.introduce}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 공지사항 */}
        <div className="home-card-container">
          <div className="home-card-title">
            <p>공지사항</p>
            {/* more */}
            <Link
              className="ui icon button right btn-blue btn-more"
              to={`/community/${communityId}/notice`}
            >
              more
              <i aria-hidden="true" className="icon more3" />
            </Link>
          </div>
          {communityHome.notice.map(post => (
            <NoticeItemView key={post.postId} {...post} />
          ))}
        </div>

        {/* 최근 게시글 */}
        <div className="home-card-container">
          <div className="home-card-title">
            <p>최근 게시글</p>
            {/* more */}
            <Link
              className="ui icon button right btn-blue btn-more"
              to={`/community/${communityId}/all`}
            >
              more
              <i aria-hidden="true" className="icon more3" />
            </Link>
          </div>
          <div className="new-board">
            {communityHome.recent.map(post => (
              <RecentItemView key={post.postId} {...post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityHomePage;
