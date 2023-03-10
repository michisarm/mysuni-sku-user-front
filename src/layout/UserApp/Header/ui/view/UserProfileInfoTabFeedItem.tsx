import React, { useEffect, useState } from 'react';
import {
  Modal,
  Table,
  Rating,
  Tab,
  Select,
  Comment,
  Accordion,
  Button,
} from 'semantic-ui-react';
import { useProfileInfoPostModel } from '../../../store/ProfileInfoPostStore';
import DefaultImg from '../../../../../style/media/img-profile-80-px.png';
import { getProfileInfoPost } from '../../../service/ProfilePopupService/getProfileInfoPost';
import { Link, useHistory } from 'react-router-dom';
import { reactAlert } from '@nara.platform/accent';
import {
  registerBookmark,
  removeBookmark,
} from '../../../../../community/api/communityApi';
import {
  getFollowCommunityIntro,
  setFollowCommunityIntro,
} from '../../../../../community/store/CommunityMainStore';
import { getPostDetailInPreview } from '../../../../../community/service/useCommunityPostCreate/utility/getPostDetail';
import ProfileImagePath from '../../../../../../src/shared/components/Image/ProfileImagePath';
import { PostItem } from '../../../model/PostModel';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  item: PostItem;
  index: number;
  setOpen: (state: boolean) => void;
}

function UserProfileInfoTabFeedItem(props: Props) {
  const [active, setActive] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [bookmarkClass, setBookmarkClass] = useState<string>('marking');

  useEffect(() => {
    setBookmarked(props.item.bookmarked);
    if (props.item.bookmarked) {
      setBookmarkClass('');
    }
  }, []);

  const copyUrl = (e: any, communityId: string, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const textarea = document.createElement('textarea');
    textarea.value = `${window.location.origin}/suni-community/community/${communityId}/post/${postId}`;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(textarea);
    reactAlert({
      title: getPolyglotText('??????', 'mypage-????????????-??????'),
      message: getPolyglotText('URL??? ?????????????????????.', 'mypage-????????????-url'),
    });
  };

  function bookmark(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      unbookmark(props.item.postId);
    } else {
      setbookmark(props.item.postId);
    }
  }

  async function setbookmark(postId: string) {
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
      setBookmarked(true);
      setBookmarkClass('');
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

    setBookmarked(false);
    setBookmarkClass('marking');
  }

  const history = useHistory();

  const onViewDetail = (communityId: string, postId: string) => {
    //props.setOpen(false);
    //history.push(`/community/${communityId}/post/${postId}`);
    window.open(
      `${window.location.origin}/suni-community/community/${communityId}/post/${postId}`,
      '_blank'
    );
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
      const postDetail = getPostDetailInPreview(postId);
      if (postDetail !== undefined) {
        postDetail.then((result) => {
          setDetail(result.html);
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

  return (
    <Comment.Group className="base">
      {/*comment : 2????????? ?????????, ?????????*/}
      <Comment
        onClick={() => onViewDetail(props.item.communityId, props.item.postId)}
      >
        {props.item.profileImage !== undefined &&
        props.item.profileImage !== '' &&
        props.item.profileImage !== null ? (
          <Comment.Avatar
            // src={`/files/community/${props.item.profileImage}`}
            src={ProfileImagePath(props.item.profileImage)}
          />
        ) : (
          <Comment.Avatar src={`${DefaultImg}`} />
        )}
        <Comment.Content>
          <Comment.Author as="a">{props.item.communityName}</Comment.Author>
          <Comment.Text>
            <div className="ellipsis">
              <span className="line id">{props.item.profileId}</span>
              <span className="line id">{props.item.createdTime}</span>
              <span className="line id">
                <PolyglotText
                  id="mypage-????????????-?????????"
                  defaultString="?????????"
                />
                <strong>{props.item.likeCount}</strong>
              </span>
              <span className="line id">
                <PolyglotText
                  id="mypage-????????????-?????????"
                  defaultString="?????????"
                />
                <strong>{props.item.replyCount}</strong>
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
            <span className="ico_feed board">
              <PolyglotText
                id="mypage-????????????-?????????"
                defaultString="?????????"
              />
            </span>
            <a>{props.item.name}</a>
            <span className="ico_feed file blind">
              <PolyglotText
                id="mypage-????????????-????????????"
                defaultString="????????????"
              />
            </span>
            <i aria-hidden="true" className="dropdown icon" />
          </Accordion.Title>
          <Accordion.Content active={active}>
            {active && contentsView()}
          </Accordion.Content>
        </Accordion>
      </div>
    </Comment.Group>
  );
}

export default UserProfileInfoTabFeedItem;
