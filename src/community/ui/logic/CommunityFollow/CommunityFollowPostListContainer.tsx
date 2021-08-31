import React, { useCallback, useState, useEffect } from 'react';
import { Icon, Button, Comment, Popup } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';
import { useHistory, useLocation } from 'react-router-dom';
import { useFollowCommunityIntro } from '../../../store/CommunityMainStore';
import FollowPostItem from '../../../viewModel/CommunityFollowIntro/FollowPostItem';
import { followList, removeBookmark } from '../../../api/communityApi';
import { requestFollowCommunityPostList } from '../../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import FollowCommunityIntro from 'community/viewModel/CommunityFollowIntro/FollowCommunityIntro';
import { off } from 'process';
import { registerBookmark } from '../../../api/communityApi';
import {
  getFollowCommunityIntro,
  setFollowCommunityIntro,
} from '../../../store/CommunityMainStore';
import { Link } from 'react-router-dom';
import { Area } from 'tracker/model';
import ProfileImagePath from '../../../../../src/shared/components/Image/ProfileImagePath';

//default imgage
import DefaultImg from '../../../../style/media/img-profile-80-px.png';
import { useScrollMove } from 'myTraining/useScrollMove';
import { getPostDetailInPreview } from '../../../service/useCommunityPostCreate/utility/getPostDetail';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

function copyUrl(url: string) {
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  reactAlert({
    title: getPolyglotText('알림', 'cicl-학상본문-알림'),
    message: getPolyglotText('URL이 복사되었습니다.', 'mypage-유저모달-url'),
  });
}

async function bookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);

  if (bookmarkId !== undefined) {
    const followCommunityIntro = getFollowCommunityIntro();
    if (followCommunityIntro === undefined) {
      return;
    }
    setFollowCommunityIntro({
      ...followCommunityIntro,
      posts: followCommunityIntro.posts.map((c) => {
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
    posts: followCommunityIntro.posts.map((c) => {
      if (c.postId !== postId) {
        return c;
      }
      return { ...c, bookmarked: false };
    }),
  });
}

const FollowPostItemView: React.FC<FollowPostItem> =
  function CommunityFollowItemView({
    communityId,
    postId,
    communityName,
    profileImage,
    profileId,
    createdTime,
    name,
    contents,
    bookmarked,
    likeCount,
    replyCount,
  }) {
    const [text, setText] = useState<string>('');
    const [more, setMore] = useState<boolean>(false);
    const { pathname } = useLocation();
    const history = useHistory();
    const { scrollOnceMove, scrollSave } = useScrollMove();

    useEffect(() => {
      setTimeout(() => {
        scrollOnceMove();
      }, 100);
    }, [scrollOnceMove]);

    useEffect(() => {
      const listen = history.listen(scrollSave);
      return () => listen();
    }, [pathname]);

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
        .filter((c) => c !== '')
        .join('\n');
      setText(nextText);
    }, []);

    const contentsView = () => {
      return (
        <>
          <Contents />
        </>
      );
    };

    const Contents: React.FC<any> = function Contents() {
      const [detail, setDetail] = useState<string>('');

      useEffect(() => {
        const postDetail = getPostDetailInPreview(postId);
        if (postDetail !== undefined) {
          postDetail.then((result) => {
            setDetail(result.html);
          });
        }
      }, []);

      return (
        <>
          <div className="ql-snow">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: detail }}
            />
          </div>
        </>
      );
    };

    return (
      <>
        <div className="sub-info-box">
          {/* 컨텐츠 영역 */}
          <div className="community-main-contants">
            <div className="comment-area community-main-card commu-sub-card">
              {/* comments */}
              <Comment.Group className="base">
                {/*comment : 2줄이상 말줄임, 대댓글*/}
                <Comment>
                  <Comment.Avatar
                    src={
                      profileImage === '' || profileImage === null
                        ? `${DefaultImg}`
                        : // : `/files/community/${profileImage}`
                          ProfileImagePath(profileImage)
                    }
                    alt="profile"
                  />
                  <Comment.Content>
                    <Comment.Author>
                      <Link to={`/community/${communityId}/post/${postId}`}>
                        {communityName}
                      </Link>
                    </Comment.Author>
                    <Comment.Text>
                      <div className="ellipsis">
                        <span className="id">{profileId}</span>
                        <span className="date">{createdTime}</span>
                        <span className="like">
                          좋아요 <strong>{likeCount}</strong>
                        </span>
                        <span className="comt">
                          댓글수 <strong>{replyCount}</strong>
                        </span>
                      </div>
                      {/* <Button>+ View more</Button> */}
                    </Comment.Text>
                    <Comment.Actions>
                      <Popup
                        className="balloon-pop myCumu_btn"
                        trigger={
                          <div className="right top sub-menu">
                            <Button icon className="img-icon">
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAAAlUlEQVRYCWNgGAWjITAaAiMsBBgp9W9capXnP4a/s0DmMDEwpy2a3badEjOZKNEM0gtyzP//DDIgDHMYJWZS7CBKLMeml2IHgaKJkZHhCQiD2NgsGRUbDYERHQKjBSOh6Ke4HCJkAanyFDtotGAkNchH1Y+4EBgtGAlFOcXlECELSJWn2EGjBSOpQT6qfjQERkMALQQAIac5FltQmtUAAAAASUVORK5CYII=" />
                              <span className="blind">북마크</span>
                            </Button>
                          </div>
                        }
                        position="bottom right"
                        on="click"
                      >
                        <Popup.Content>
                          <ul>
                            <li className="community-profile">
                              <a href="#" onClick={shareUrl}>
                                <i className="balloon icon popupUrl" />
                                <span>URL 복사</span>
                              </a>
                            </li>
                            <li>
                              {!bookmarked && (
                                <a href="#" onClick={bookmarkClick}>
                                  <i className="balloon icon popupBook" />
                                  <span>북마크</span>
                                </a>
                              )}
                              {bookmarked && (
                                <a href="#" onClick={unbookmarkClick}>
                                  <i className="balloon icon popupBookRemove" />
                                  <span>북마크</span>
                                </a>
                              )}
                            </li>
                          </ul>
                        </Popup.Content>
                      </Popup>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
                <div className="card-bottom">
                  <div className="card-header-line">
                    {!more && (
                      <h3 className="ellipsis cmt_tit">
                        <span className="ico_feed board">게시물</span>
                        <Link to={`/community/${communityId}/post/${postId}`}>
                          {name}
                        </Link>
                      </h3>
                    )}
                    {more && (
                      <h3 className="cmt_tit">
                        <span className="ico_feed board">게시물</span>
                        <Link to={`/community/${communityId}/post/${postId}`}>
                          {name}
                        </Link>
                      </h3>
                    )}
                    <div className="text-right">
                      {!more && (
                        <button
                          className="ui icon button right more-bttn"
                          onClick={viewMore}
                        >
                          <i aria-hidden="true" className="drop_down icon" />
                        </button>
                      )}
                      {more && (
                        <button
                          className="ui icon button right more-bttn"
                          onClick={hideMore}
                        >
                          <i aria-hidden="true" className="drop_down up icon" />
                        </button>
                      )}
                    </div>
                  </div>
                  {more && contentsView()}
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

  const [offsetPage, setOffsetPage] = useState<number>(0);

  if (communityFollowPostList === undefined) {
    return null;
  }

  const addList = (offset: number) => {
    requestFollowCommunityPostList(offset, 5);
  };

  return (
    <div
      className="community-main-contants"
      data-area={Area.COMMUNITY_FOLLOWPOST}
    >
      {communityFollowPostList !== undefined &&
        communityFollowPostList.posts.map((postItem) => (
          <FollowPostItemView key={postItem.postId} {...postItem} />
        ))}
      <div className="more-comments">
        {communityFollowPostList.postsTotalCount >
          communityFollowPostList.postsOffset && (
          <Button
            icon
            className="left moreview"
            onClick={() => addList(communityFollowPostList.postsOffset)}
          >
            <Icon className="moreview" /> list more
          </Button>
        )}
        {communityFollowPostList.postsTotalCount <=
          communityFollowPostList.postsOffset && (
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
