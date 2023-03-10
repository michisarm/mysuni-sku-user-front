import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Comment, Icon, Popup } from 'semantic-ui-react';
import { useMyFeed } from './myfeed.services';
import {
  useRequestMyFeed,
  requestMyFeed,
  bookmark,
  unbookmark,
} from './myfeed.request.services';
import { FeedItem } from './myfeed.models';
import { copyUrl } from '../../../packages/services/html.services';
import { Content } from '../components/Content';
import { NoContent } from '../../components/NoContent';

function FeedView(props: FeedItem) {
  const {
    bookmarked,
    communityId,
    postId,
    profileImg,
    createdTime,
    communityName,
    likeCount,
    replyCount,
    profileId,
    title,
    menuType,
    contents,
  } = props;

  const [more, setMore] = useState<boolean>(false);
  const { pathname } = useLocation();

  const shareUrl = useCallback(() => {
    const hostLength = window.location.href.indexOf(pathname);
    if (hostLength === -1) {
      return;
    }

    const url = `${window.location.origin}/suni-community/community/${communityId}/post/${postId}`;
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
    <div className="sub-info-box" style={{ width: '100%' }}>
      <div className="comment-area community-main-card commu-sub-card">
        <Comment.Group className="base">
          <Comment>
            <Comment.Avatar src={profileImg} />
            <Comment.Content>
              <Comment.Author as="a">
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
                    ????????? <strong>{likeCount}</strong>
                  </span>
                  <span className="comt">
                    ????????? <strong>{replyCount}</strong>
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
                        <span className="blind">?????????</span>
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
                          <span>URL ??????</span>
                        </a>
                      </li>
                      <li>
                        {!bookmarked && (
                          <a href="#" onClick={bookmarkClick}>
                            <i className="balloon icon popupBook" />
                            <span>?????????</span>
                          </a>
                        )}
                        {bookmarked && (
                          <a href="#" onClick={unbookmarkClick}>
                            <i className="balloon icon popupBookRemove" />
                            <span>?????????</span>
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
                <span
                  className={`ico_feed ${
                    menuType === 'STORE' ? 'attach' : 'board'
                  }`}
                >
                  ?????????
                </span>
                <Link
                  to="#"
                  onClick={() =>
                    window.open(
                      `${window.location.origin}/suni-community/community/${communityId}/post/${postId}`
                    )
                  }
                >
                  {title}
                </Link>
              </h3>
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
            {/*!more && (
              <div>
                <p
                  className="summary"
                  dangerouslySetInnerHTML={{ __html: contents }}
                />
              </div>
            )*/}
          </div>
        </Comment.Group>
      </div>
    </div>
  );
}

export function MyFeedListView() {
  useRequestMyFeed();
  const myFeed = useMyFeed();

  if (myFeed === undefined || myFeed.feedList.length === 0) {
    return null;
  }

  const { feedList, totalcount, offset } = myFeed;

  if (totalcount === 0) {
    return <NoContent message="?????? ????????? Feed??? ????????????." />;
  }

  return (
    <div className="community-main-contants">
      {feedList.map((feed) => (
        <FeedView key={feed.postId} {...feed} />
      ))}
      <div className="more-comments">
        {totalcount > offset && (
          <Button icon className="left moreview" onClick={requestMyFeed}>
            <Icon className="moreview" /> list more
          </Button>
        )}
        {totalcount <= offset && (
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
