import React, {
  Component,
  createRef,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  Segment,
  Sticky,
  Icon,
  Menu,
  Button,
  Comment,
  Popup,
} from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
// import "../../style.css"
import ContentsMoreView from './ContentsMoreView';
import { CommunityProfileBookmark } from 'community/viewModel/CommunityProfile';
import moment from 'moment';
import ProfileCommunityItem from '../../../viewModel/CommunityProfile/ProfileCommunityItem';
import CommunityType from '../../../model/CommunityType';
import { requestAppendProfileCommunities } from '../../../service/useCommunityProfile/utility/requestProfileCommunities';
import MyCommunityListContainer from 'community/ui/logic/MyCommunityIntro/MyCommunityListContainer';
import MyCommunityPostListContainer from 'community/ui/logic/MyCommunityIntro/MyCommunityPostListContainer';
import { requestAppendMyCommunityPostList } from 'community/service/useMyCommunityIntro/utility/requestMyCommunityIntro';

import { reactAlert } from '@nara.platform/accent';
import { registerBookmark, removeBookmark } from 'community/api/communityApi';
import { getMyProfile } from 'community/store/MyProfileStore';
import PostItem from 'community/viewModel/CommunityProfileBookmark/PostItem';
import {
  getCommunityProfileBookmark,
  setCommunityProfileBookmark,
} from 'community/store/CommunityProfileBookmarkStore';
import { requestAppendProfileBookmarkPostList } from 'community/service/useCommunityProfile/utility/requestProfileBookmarks';
import DefaultImg from '../../../../style/media/img-profile-80-px.png';
import { Area } from 'tracker/model';
import ReactGA from 'react-ga';
import ProfileImagePath from '../../../../../src/shared/components/Image/ProfileImagePath';
import { getPostDetailInPreview } from '../../../service/useCommunityPostCreate/utility/getPostDetail';
import { isExternalInstructor } from '../../../../shared/helper/findUserRole';

interface ContentsBookmarkViewProps {
  communityProfileBookmark: CommunityProfileBookmark;
}

const ContentsBookmarkView: React.FC<ContentsBookmarkViewProps> =
  function ContentsBookmarkView({ communityProfileBookmark }) {
    const contextRef = useRef(null);
    const history = useHistory();
    const isExternal = isExternalInstructor();

    // 북마크 해제시 화면에서 제거
    const result = communityProfileBookmark.posts.filter((x) => {
      return x.bookmarked === true;
    });
    const gaOnClick = (name: string) => {
      // react-ga
      ReactGA.event({
        category: 'Community',
        action: 'Click',
        label: `Community-${name}`,
      });
      window.scrollTo(0, 0);
      sessionStorage.removeItem('communityOffset');
      sessionStorage.removeItem('openCommunityOffset');
      if (name === 'MyCommunity') {
        history.replace('/community/main');
      }
      if (name === 'CommunityList') {
        history.replace('/community/main/open-communities');
      }
      if (name === 'Follow') {
        history.replace('/community/main/follow');
      }
      if (name === 'MyFeed') {
        history.replace('/community/main/feed');
      }
      if (name === 'Bookmark') {
        history.replace('/community/main/bookmark');
      }
    };
    /* eslint-disable */
    return (
      <div ref={contextRef}>
        <Sticky context={contextRef} className="tab-menu offset0">
          <div className="cont-inner">
            <Menu className="sku">
              <Menu.Item
                name="MyCommunity"
                active={false}
                as={Link}
                // to="/community/main"
                onClick={() => gaOnClick('MyCommunity')}
              >
                My Community
                <span className="count" />
              </Menu.Item>
              {!isExternal && (
                <Menu.Item
                  name="MyCreatedCommunity"
                  active={false}
                  as={Link}
                  // to="/community/main/open-communities"
                  onClick={() => gaOnClick('CommunityList')}
                >
                  Community List
                </Menu.Item>
              )}
              <Menu.Item
                name="MyFeed"
                active={false}
                as={Link}
                onClick={() => gaOnClick('MyFeed')}
              >
                My Feed
              </Menu.Item>
              {!isExternal && (
                <Menu.Item
                  name="Follow"
                  active={false}
                  as={Link}
                  // to="/community/main/follow"
                  onClick={() => gaOnClick('Follow')}
                >
                  Follower Feed
                </Menu.Item>
              )}
              <Menu.Item
                name="Bookmark"
                active={true}
                as={Link}
                onClick={() => gaOnClick('Bookmark')}
              >
                Bookmark
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>
        <Segment className="full">
          <div
            className="course-detail-center community-containter"
            style={{ display: 'block' }}
            data-area={Area.COMMUNITY_BOOKMARK}
          >
            <div
              className="community-main-contants"
              style={{ marginRight: '0px' }}
            >
              {result !== undefined &&
                result.map((postItem) => (
                  <PostItemView key={postItem.postId} {...postItem} />
                ))}
            </div>
            <div className="more-comments">
              {communityProfileBookmark.postsTotalCount >
                communityProfileBookmark.postsOffset && (
                <Button
                  icon
                  className="left moreview"
                  onClick={requestAppendProfileBookmarkPostList}
                >
                  <Icon className="moreview" /> list more
                </Button>
              )}
              {communityProfileBookmark.postsTotalCount <=
                communityProfileBookmark.postsOffset && (
                <Button
                  icon
                  className="left moreview"
                  style={{ cursor: 'default' }}
                />
              )}
            </div>
          </div>
        </Segment>
      </div>
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
  likeCount,
  replyCount,
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
      .filter((c) => c !== '')
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
    reactAlert({ title: '알림', message: '북마크가 해제되었습니다.' });
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
    <div className="sub-info-box" style={{ width: '100%' }}>
      <div className="comment-area community-main-card commu-sub-card">
        {/* comments */}
        <Comment.Group className="base">
          {/*comment : 2줄이상 말줄임, 대댓글*/}
          <Comment>
            {profileImage !== undefined &&
            profileImage !== '' &&
            profileImage !== null ? (
              <Comment.Avatar
                // src={`/files/community/${profileImage}`}
                src={ProfileImagePath(profileImage)}
              />
            ) : (
              <Comment.Avatar src={`${DefaultImg}`} />
            )}
            <Comment.Content>
              <Comment.Author as="a">
                <Link to={`/community/${communityId}`}>{communityName}</Link>
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
                  <span className={`ico_feed ${icon}`}>게시물</span>
                  <Link to={`/community/${communityId}/post/${postId}`}>
                    {name}
                  </Link>
                </h3>
              )}
              {more && (
                <h3 className="cmt_tit">
                  <span className={`ico_feed ${icon}`}>게시물</span>
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
    const communityProfileBookmark = getCommunityProfileBookmark();
    if (communityProfileBookmark === undefined) {
      return;
    }
    setCommunityProfileBookmark({
      ...communityProfileBookmark,
      posts: communityProfileBookmark.posts.map((c) => {
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
  const communityProfileBookmark = getCommunityProfileBookmark();
  if (communityProfileBookmark === undefined) {
    return;
  }
  setCommunityProfileBookmark({
    ...communityProfileBookmark,
    posts: communityProfileBookmark.posts.map((c) => {
      if (c.postId !== postId) {
        return c;
      }
      return { ...c, bookmarked: false };
    }),
  });
}

export default ContentsBookmarkView;
