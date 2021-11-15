import React, { useState, useEffect } from 'react';
import { Comment, Accordion, Button } from 'semantic-ui-react';
import { Post } from '../../data/community/models/Post';
import { Link, useHistory } from 'react-router-dom';
import { copyUrl, setbookmark, unbookmark } from '../userProfileInfo.events';
import { findPostViewWithRead } from '../../data/community/apis/postviewsApi';
import _ from 'lodash';
import { srcParser } from '../../components/Image';
import { getCommunityProfileImage } from '../../app.formatters';

interface Props {
  item: Post;
  index: number;
  setOpen: (state: boolean) => void;
}

export function UserProfileInfoTabFeedItem(props: Props) {
  //const feedData = useUserFeedList();
  const [active, setActive] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [bookmarkClass, setBookmarkClass] = useState<string>('marking');

  const bookmark = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      onClickUnBookmark(props.item.postId);
    } else {
      onClickSetBookmark(props.item.postId);
    }
  };

  const onClickSetBookmark = (postId: string) => {
    const bookmarkId = setbookmark(postId);

    if (bookmarkId !== undefined) {
      setBookmarked(true);
      setBookmarkClass('');
    }
  };

  const onClickUnBookmark = (postId: string) => {
    unbookmark(postId);

    setBookmarked(false);
    setBookmarkClass('marking');
  };

  const history = useHistory();
  const onViewDetail = (communityId: string, postId: string) => {
    props.setOpen(false);
    history.push(`/community/${communityId}/post/${postId}`);
  };

  const contentsView = () => {
    return (
      <>
        <Contents postId={props.item.postId} />
      </>
    );
  };

  const Contents: React.FC<any> = function Contents({ postId }) {
    const [detail, setDetail] = useState<string>('');

    useEffect(() => {
      const postDetail = findPostViewWithRead(postId);
      if (postDetail !== undefined) {
        postDetail.then((result) => {
          setDetail(result?.html || '');
        });
      }
    }, []);

    return (
      <>
        <div>
          <p className="summary" dangerouslySetInnerHTML={{ __html: detail }} />
        </div>
      </>
    );
  };

  const profileImage = getCommunityProfileImage(props.item.profileImg);
  return (
    <>
      <Comment.Group className="base">
        {/*comment : 2줄이상 말줄임, 대댓글*/}
        <Comment
          onClick={() =>
            onViewDetail(props.item.communityId, props.item.postId)
          }
        >
          <Comment.Avatar src={srcParser(profileImage)} />
          <Comment.Content>
            <Comment.Author as="a">{props.item.communityName}</Comment.Author>
            <Comment.Text>
              <div className="ellipsis">
                <span className="line id">
                  {props.item.nickName || props.item.creatorName || ''}
                </span>
                <span className="line id">{props.item.strCreatedTime}</span>
                <span className="line id">
                  좋아요 <strong>{props.item.likeCount}</strong>
                </span>
                <span className="line id">
                  댓글수 <strong>{props.item.replyCount}</strong>
                </span>
              </div>
            </Comment.Text>
            <Comment.Actions>
              <div className="action-area">
                <Link
                  to="#"
                  onClick={(e) =>
                    copyUrl(e, props.item.communityId, props.item.postId)
                  }
                >
                  <i className="icon popupUrl" />
                </Link>
                <Button icon onClick={(e) => bookmark(e)}>
                  <i className={`icon popupBook ${bookmarkClass}`} />
                </Button>
              </div>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        <div className="feed-card">
          <Accordion>
            <Accordion.Title
              active={active}
              index={props.index}
              onClick={() => {
                active ? setActive(false) : setActive(true);
              }}
              className="more-bttn feed-tit"
            >
              <span className="ico_feed board">게시물</span>
              <a>{props.item.title}</a>
              <span className="ico_feed file blind">첨부파일</span>
              <i aria-hidden="true" className="dropdown icon" />
            </Accordion.Title>
            <Accordion.Content active={active}>
              {active && contentsView()}
            </Accordion.Content>
          </Accordion>
        </div>
      </Comment.Group>
    </>
  );
}
