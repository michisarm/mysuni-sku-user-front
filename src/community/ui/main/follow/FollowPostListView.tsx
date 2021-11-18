import React, { useCallback, useState } from 'react';
import { Button, Comment, Popup, Icon } from 'semantic-ui-react';
import { useMainFollow } from './follow.services';
import { MainFollowPostItem } from './follow.model';
import { Link, useLocation } from 'react-router-dom';
import { copyUrl } from '../../../packages/services/html.services';
import {
  bookmark,
  unbookmark,
  requestMainFollowPostItems,
} from './follow.request.services';
import { Content } from '../components/Content';
import { Area } from '../../../../tracker/model/ActionType';

function ItemView(props: MainFollowPostItem) {
  const {
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
  } = props;
  const [more, setMore] = useState<boolean>(false);
  const { pathname } = useLocation();

  const shareUrl = useCallback(() => {
    const hostLength = window.location.href.indexOf(pathname);
    if (hostLength === -1) {
      return;
    }

    const url = `${window.location.origin}/community/${communityId}/post/${postId}`;
    copyUrl(url);
  }, [pathname, communityId, postId]);
  const bookmarkClick = useCallback(() => {
    bookmark(postId);
  }, [postId]);
  const unbookmarkClick = useCallback(() => {
    unbookmark(postId);
  }, [postId]);
  const viewMore = useCallback(() => {
    setMore(true);
  }, []);
  const hideMore = useCallback(() => {
    setMore(false);
  }, []);

  return (
    <div className="sub-info-box">
      <div className="community-main-contants">
        <div className="comment-area community-main-card commu-sub-card">
          <Comment.Group className="base">
            <Comment>
              <Comment.Avatar src={profileImage} alt="profile" />
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
                <h3 className="ellipsis cmt_tit">
                  <span className="ico_feed board">게시물</span>
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
                <div className="text-right" style={{ float: 'none' }}>
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
    </div>
  );
}

export function FollowPostListView() {
  const mainFollow = useMainFollow();
  if (mainFollow === undefined) {
    return null;
  }
  if (mainFollow.postItems.length === 0) {
    return null;
  }

  const { postItems, postIndex, postTotalCount } = mainFollow;

  return (
    <div
      className="community-main-contants"
      data-area={Area.COMMUNITY_FOLLOWPOST}
    >
      {postItems.map((postItem) => (
        <ItemView key={postItem.postId} {...postItem} />
      ))}
      <div className="more-comments">
        {postTotalCount > postIndex && (
          <Button
            icon
            className="left moreview"
            onClick={requestMainFollowPostItems}
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
    </div>
  );
}
