import React, { useCallback, useState, useEffect } from 'react';
import { Icon, Button, Comment } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';
import { useLocation } from 'react-router-dom';
import { useFollowCommunityIntro } from '../../../store/CommunityMainStore';
import FollowPostItem from '../../../viewModel/CommunityFollowIntro/FollowPostItem';
import { followList, removeBookmark } from '../../../api/communityApi';
import { requestFollowCommunityPostList } from '../../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import FollowCommunityIntro from 'community/viewModel/CommunityFollowIntro/FollowCommunityIntro';
import { off } from 'process';
import { registerBookmark } from '../../../api/communityApi';
import { getFollowCommunityIntro, setFollowCommunityIntro } from '../../../store/CommunityMainStore';

//default imgage
import DefaultImg from '../../../../style/media/img-profile-80-px.png';

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
  console.log('bookmarkId', bookmarkId);

  if (bookmarkId !== undefined) {
    const followCommunityIntro = getFollowCommunityIntro();
    if (followCommunityIntro === undefined) {
      return;
    }
    setFollowCommunityIntro({
      ...followCommunityIntro,
      posts: followCommunityIntro.posts.map(c => {
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
  const followCommunityIntro = getFollowCommunityIntro();
  if (followCommunityIntro === undefined) {
    return;
  }
  setFollowCommunityIntro({
    ...followCommunityIntro,
    posts: followCommunityIntro.posts.map(c => {
      if (c.postId !== postId) {
        return c;
      }
      return { ...c, bookmarked: false };
    }),
  });
}

const FollowPostItemView: React.FC<FollowPostItem> = function CommunityFollowItemView({
  communityId,
  postId,
  communityName,
  profileImage,
  profileId,
  createdTime,
  name,
  contents,
  bookmarked
}) {

  const [text, setText] = useState<string>('');
  const [more, setMore] = useState<boolean>(false);

  const { pathname } = useLocation();
  const shareUrl = useCallback(() => {
    const hostLength = window.location.href.indexOf(pathname);
    if (hostLength === -1) {
      return;
    }
    const host = window.location.href.substring(0, hostLength);
    const url = `${host}/community/${communityId}/post/${postId}`;
    copyUrl(url);
  }, [pathname, communityId, postId]);

  const viewMore = useCallback(() => {
    setMore(true);
  }, []);
  const hideMore = useCallback(() => {
    setMore(false);
  }, []);

  const bookmarkClick = useCallback(() => {
    bookmark(postId);
  }, [postId]);
  const unbookmarkClick = useCallback(() => {
    unbookmark(postId);
  }, [postId]);

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
  
  return (
    <>
      <div className="sub-info-box">
        {/* 컨텐츠 영역 */}
        <div className="community-main-contants">
          <div className="comment-area community-main-card">
            {/* comments */}
            <Comment.Group className="base">
              {/*comment : 2줄이상 말줄임, 대댓글*/}
              <Comment>
                <Comment.Avatar
                  src={profileImage === '' || profileImage === null ? `${DefaultImg}` : `/files/community/${profileImage}`}
                  alt="profile"
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    자동차의 핵심은 인공지능 (커뮤니티명)
                  </Comment.Author>
                  <Comment.Text>
                    <div className="ellipsis">
                      <span className="id">{name}</span>
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
                  <span className="ico_feed board">게시물</span>
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
      </div>
    </>
  );
};


function CommunityFollowPostListContainer() {
  const communityFollowPostList = useFollowCommunityIntro();
  // console.log('container', communityFollowPostList);

  const [offsetPage, setOffsetPage] = useState<number>(0);

  if (communityFollowPostList === undefined) {
    return null;
  }

  const addList = (offset:number) => {
    console.log('offset ' , offset);
    
    requestFollowCommunityPostList(offset, 5);
  }

  return (
    <div className="community-main-contants">
      {communityFollowPostList !== undefined &&
        communityFollowPostList.posts.map(postItem => (
          <FollowPostItemView key={postItem.postId} {...postItem} />
        ))}
      <div className="more-comments">
        {communityFollowPostList.postsTotalCount > communityFollowPostList.postsOffset && (
          <Button
            icon
            className="left moreview"
            onClick={()=>addList(communityFollowPostList.postsOffset)}
          >
            <Icon className="moreview" /> list more
          </Button>
        )}
        {communityFollowPostList.postsTotalCount <= communityFollowPostList.postsOffset && (
          <Button
            icon
            className="left moreview"
            style={{ cursor: 'default' }}
          />
        )}
      </div>
    </div>
  );
}

export default CommunityFollowPostListContainer;
