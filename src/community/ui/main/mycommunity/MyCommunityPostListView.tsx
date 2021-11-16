import { Area } from '../../../../tracker/model/ActionType';
import React, { useState, useCallback, useEffect } from 'react';
import { Comment, Popup, Button, Segment, Icon } from 'semantic-ui-react';
import {
  setMainMyCommunityPost,
  getMainMyCommunityPost,
  useMainMyCommunityPost,
} from './services/mycommunity.services';
import { MainMyCommunitiesPostItem } from './mycommunity.model';
import { Link, useLocation } from 'react-router-dom';
import { copyUrl } from '../../../packages/services/html.services';
import {
  bookmark,
  unbookmark,
  requestMainMyCommunityPostItems,
  useRequestMainMyCommunityPostItems,
} from './services/mycommunity.request.services';
import { clearFindPostViewCache } from '../../data/community/apis/postviewsApi';
import { LoadingView } from '../../components/LoadingView';
import { Content } from '../components/Content';
import { MAIN_OPENCOMMUNITIES_PATH } from '../../page/MainRoutes';
import { checkExternalInstructor } from '../../app.services';

function ItemView(props: MainMyCommunitiesPostItem) {
  const {
    communityId,
    type,
    postId,
    communityName,
    profileImage,
    profileId,
    nickName,
    createdTime,
    name,
    contents,
    menuType,
    bookmarked,
    likeCount,
    replyCount,
  } = props;

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
      <div className="comment-area community-main-card  commu-sub-card">
        {/* comments */}

        <Comment.Group className="base">
          {/*comment : 2줄이상 말줄임, 대댓글*/}
          <Comment>
            <Comment.Avatar src={profileImage} />
            <Comment.Content>
              <Comment.Author>
                <Link
                  to="#"
                  onClick={() =>
                    window.open(
                      `${window.location.origin}/suni-community/community/${communityId}`
                    )
                  }
                >
                  {communityName}
                </Link>
              </Comment.Author>
              <Comment.Text>
                <div className="ellipsis">
                  <span className="id">
                    {type === 'ANONYMOUS' ? '익명' : nickName || profileId}
                  </span>
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
              <h3 className="ellipsis cmt_tit">
                <span className={`ico_feed ${icon}`}>게시물</span>
                <Link
                  to="#"
                  onClick={() =>
                    window.open(
                      `${window.location.origin}/suni-community/community/${communityId}/post/${postId}`
                    )
                  }
                >
                  {name}
                </Link>
              </h3>
              {/*!more && (
                <div>
                  <p
                    className="summary"
                    dangerouslySetInnerHTML={{ __html: contents }}
                  />
                </div>
              )*/}
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
            {more && <Content postId={postId} />}
          </div>
        </Comment.Group>
      </div>
    </div>
  );
}

export function MyCommunityPostListView() {
  useEffect(() => {
    return () => {
      clearFindPostViewCache();
      const value = getMainMyCommunityPost();
      if (value !== undefined) {
        setMainMyCommunityPost({
          postItems: [],
          postIndex: 0,
          postTotalCount: 0,
          isPostRequesting: false,
        });
      }
    };
  }, []);

  useRequestMainMyCommunityPostItems();
  const mainMyCommunityPost = useMainMyCommunityPost();

  if (mainMyCommunityPost === undefined) {
    return null;
  }

  if (mainMyCommunityPost.postItems.length === 0) {
    if (checkExternalInstructor()) {
      return null;
    }
    return (
      <div
        className="no-cont-wrap"
        data-area={Area.COMMUNITY_NOCONTENT}
        style={{ width: '100%' }}
      >
        <i aria-hidden="true" className="icon no-contents80" />
        <span className="blind">콘텐츠 없음</span>
        <div className="text lms-color-type1">
          현재 가입된 커뮤니티가 없습니다.
        </div>
        <div className="sub-text">
          다양한 분야로 만들어진 Community List에서
          <br />
          관심 있는 커뮤니티를 찾아 Social Learning을 할 수 있습니다.
        </div>
        <Link
          to={MAIN_OPENCOMMUNITIES_PATH}
          className="ui icon button right btn-blue2"
        >
          Community List 바로가기
          <i aria-hidden="true" className="icon morelink" />
        </Link>
      </div>
    );
  }

  const { postItems, postIndex, postTotalCount, isPostRequesting } =
    mainMyCommunityPost;
  return (
    <div className="community-main-contants" data-area={Area.COMMUNITY_MYPOST}>
      {isPostRequesting ? (
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 550,
            width: '48.5rem',
            boxShadow: '0 0 0 0',
            border: 0,
          }}
        >
          <LoadingView />
        </Segment>
      ) : (
        <>
          {postItems.map((postItem) => (
            <ItemView key={postItem.postId} {...postItem} />
          ))}
          <div className="more-comments community-side">
            {postTotalCount > postIndex && (
              <Button
                icon
                className="left moreview"
                onClick={requestMainMyCommunityPostItems}
              >
                <Icon className="moreview" /> list more
              </Button>
            )}
            {postTotalCount <= postIndex && (
              <Button
                icon
                className="left moreview"
                style={{ cursor: 'default' }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
