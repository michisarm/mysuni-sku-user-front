import React, { Component, createRef, useState, useEffect, useCallback } from 'react';
import { Segment, Sticky, Icon, Menu, Button ,Comment } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
// import "../../style.css"
import ContentsMoreView from './ContentsMoreView';
import { CommunityProfileFeed } from 'community/viewModel/CommunityProfile';
import moment from 'moment';
import ProfileCommunityItem from '../../../viewModel/CommunityProfile/ProfileCommunityItem';
import CommunityType from '../../../model/CommunityType';
import { requestAppendProfileCommunities } from '../../../service/useCommunityProfile/utility/requestProfileCommunities';
import MyCommunityListContainer from 'community/ui/logic/MyCommunityIntro/MyCommunityListContainer';
import MyCommunityPostListContainer from 'community/ui/logic/MyCommunityIntro/MyCommunityPostListContainer';
import { requestAppendMyCommunityPostList } from 'community/service/useMyCommunityIntro/utility/requestMyCommunityIntro';
import PostItem from 'community/viewModel/CommunityProfileFeed/PostItem';
import { reactAlert } from '@nara.platform/accent';
import { registerBookmark, removeBookmark } from 'community/api/communityApi';
import { getMyProfile } from 'community/store/MyProfileStore';
import { getCommunityProfileFeed, setCommunityProfileFeed } from 'community/store/CommunityProfileFeedStore';
import { requestAppendProfileFeedPostList } from 'community/service/useCommunityProfile/utility/requestProfileFeeds';

interface ContentsFeedViewProps {
  communityProfileFeed: CommunityProfileFeed;
  profileId:string;
}

const ContentsFeedView: React.FC<ContentsFeedViewProps> = function ContentsFeedView({
  communityProfileFeed,
  profileId
}) {

  // console.log('communityProfileFeed',communityProfileFeed);

  /* eslint-disable */
  return (
    <Segment className="full">
    <div className="course-detail-center community-containter">
      <div className="community-main-contants">
        {communityProfileFeed !== undefined &&
          communityProfileFeed.posts.map(postItem => (
            <PostItemView key={postItem.postId} {...postItem} />
        ))}
      </div>
        <div className="more-comments">
          {communityProfileFeed.postsTotalCount > communityProfileFeed.postsOffset && (
            <Button
              icon
              className="left moreview"
              onClick={()=>requestAppendProfileFeedPostList(profileId)}
            >
              <Icon className="moreview" /> list more
            </Button>
          )}
          {communityProfileFeed.postsTotalCount <= communityProfileFeed.postsOffset && (
            <Button
              icon
              className="left moreview"
              style={{ cursor: 'default' }}
            />
          )}
        </div>   
    </div>
  </Segment>    
  );
};

const PostItemView: React.FC<PostItem> = function CommunityItemView({
  communityId,
  postId,
  communityName,
  profileImage,
  profileId,
  createdTime,
  name,
  contents,
  menuType,
  bookmarked,
}) {
  const { pathname } = useLocation();
  const [text, setText] = useState<string>('');
  const [more, setMore] = useState<boolean>(false);
  useEffect(() => {
    const div = document.createElement('div');
    div.innerHTML = contents;
    let nextText = div.innerText;
    nextText = nextText
      .split('\n')
      .filter(c => c !== '')
      .join('\n');
    setText(nextText);
  }, []);
  const shareUrl = useCallback(() => {
    const hostLength = window.location.href.indexOf(pathname);
    if (hostLength === -1) {
      return;
    }
    const host = window.location.href.substring(0, hostLength);
    const url = `${host}/community/${communityId}/post/${postId}`;
    copyUrl(url);
  }, [pathname, communityId, postId]);
  const bookmarkClick = useCallback(() => {
    bookmark(postId);
  }, [postId]);
  const unbookmarkClick = useCallback(() => {
    unbookmark(postId);
  }, [postId]);
  let icon = 'board';
  switch (menuType) {
    case 'STORE':
      icon = 'attach';
      break;
    default:
      break;
  }
  const viewMore = useCallback(() => {
    setMore(true);
  }, []);
  const hideMore = useCallback(() => {
    setMore(false);
  }, []);
  return (
    <div className="sub-info-box">
      <div className="comment-area community-main-card">
        {/* comments */}
        <Comment.Group className="base">
          {/*comment : 2줄이상 말줄임, 대댓글*/}
          <Comment>
            {profileImage !== undefined && profileImage !== '' && (
              <Comment.Avatar src={`/files/community/${profileImage}`} />
            )}
            <Comment.Content>
              <Comment.Author as="a">{communityName}</Comment.Author>
              <Comment.Text>
                <div className="ellipsis">
                  <span className="id">{profileId}</span>
                  <span className="date">{createdTime}</span>
                </div>
                {/* <Button>+ View more</Button> */}
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  {!bookmarked && (
                    <Button icon className="img-icon" onClick={bookmarkClick}>
                      <Icon className="bookmark2" />
                      <span className="blind">북마크</span>
                    </Button>
                  )}
                  {bookmarked && (
                    <Button icon className="img-icon" onClick={unbookmarkClick}>
                      <Icon className="remove3" />
                      <span className="blind">북마크</span>
                    </Button>
                  )}
                  <Button icon className="img-icon" onClick={shareUrl}>
                    <Icon className="share2" />
                    <span className="blind">공유</span>
                  </Button>
                </div>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <div className="card-bottom">
            <h3>
              <span className={`ico_feed ${icon}`}>게시물</span>
              {name}
            </h3>
            {more && (
              <div className="ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: contents }}
                />
              </div>
            )}
            {!more && (
              <div>
                <p>{text}</p>
              </div>
            )}
            <div className="text-right">
              {!more && (
                <button
                  className="ui icon button right btn-blue btn-more"
                  onClick={viewMore}
                >
                  more
                  <i aria-hidden="true" className="icon more2" />
                </button>
              )}
              {more && (
                <button
                  className="ui icon button right btn-blue fn-more-toggle"
                  onClick={hideMore}
                >
                  hide
                  <i aria-hidden="true" className="icon hide2" />
                </button>
              )}
            </div>
          </div>
        </Comment.Group>
      </div>
    </div>
  );
};



function copyUrl(url: string) {
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  reactAlert({ title: '알림', message: 'URL이 복사되었습니다.' });
}

async function bookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);
  if (bookmarkId !== undefined) {
    const communityProfileFeed = getCommunityProfileFeed();
    if (communityProfileFeed === undefined) {
      return;
    }
    setCommunityProfileFeed({
      ...communityProfileFeed,
      posts: communityProfileFeed.posts.map(c => {
        if (c.postId !== postId) {
          return c;
        }
        return { ...c, bookmarked: true };
      }),
    });
  }
}

async function unbookmark(postId: string) {
  await removeBookmark(postId);
  const communityProfileFeed = getCommunityProfileFeed();
  if (communityProfileFeed === undefined) {
    return;
  }
  setCommunityProfileFeed({
    ...communityProfileFeed,
    posts: communityProfileFeed.posts.map(c => {
      if (c.postId !== postId) {
        return c;
      }
      return { ...c, bookmarked: false };
    }),
  });
}


export default ContentsFeedView;
