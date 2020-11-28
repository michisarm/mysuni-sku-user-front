import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon, Button, Comment } from 'semantic-ui-react';
import { requestAppendMyCommunityPostList } from '../../../service/useMyCommunityIntro/utility/requestMyCommunityIntro';
import { useMyCommunityIntro } from '../../../store/CommunityMainStore';
import PostItem from '../../../viewModel/MyCommunityIntro/PostItem';

import boardIcon from '../../../style/media/icon-communtiy-menu-board.png';
import storeIcon from '../../../style/media/icon-communtiy-menu-download.png';

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

const PostItemView: React.FC<PostItem> = function CommunityItemView({
  communityId,
  postId,
  communityName,
  profileImage,
  profileId,
  createTime,
  name,
  contents,
}) {
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
  // let icon = boardIcon;
  // switch (type) {
  //   case 'STORE':
  //     icon = storeIcon;
  //     path = 'data';
  //     break;
  //   default:
  //     break;
  // }
  return (
    <div className="sub-info-box">
      <div className="comment-area community-main-card">
        {/* comments */}
        <Comment.Group className="base">
          {/*comment : 2줄이상 말줄임, 대댓글*/}
          <Comment>
            {profileImage !== undefined && profileImage !== '' && (
              <Comment.Avatar src={profileImage} />
            )}
            <Comment.Content>
              <Comment.Author as="a">{communityName}</Comment.Author>
              <Comment.Text>
                <div className="ellipsis">
                  <span className="id">{profileId}</span>
                  <span className="date">{createTime}</span>
                </div>
                {/* <Button>+ View more</Button> */}
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="img-icon">
                    <Icon className="bookmark2" />
                    <span className="blind">북마크</span>
                  </Button>
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
            <div dangerouslySetInnerHTML={{ __html: contents }} />
            <div className="text-right">
              <button className="ui icon button right btn-blue btn-more">
                more
                <i aria-hidden="true" className="icon more2" />
              </button>
            </div>
          </div>
        </Comment.Group>
      </div>
    </div>
  );
};

function MyCommunityPostListContainer() {
  const myCommunityIntro = useMyCommunityIntro();
  if (myCommunityIntro === undefined) {
    return null;
  }
  return (
    <div className="community-main-contants">
      {myCommunityIntro !== undefined &&
        myCommunityIntro.posts.map(postItem => (
          <PostItemView key={postItem.postId} {...postItem} />
        ))}

      <div className="more-comments community-side">
        {myCommunityIntro.postsTotalCount > myCommunityIntro.postsOffset && (
          <Button
            icon
            className="left moreview"
            onClick={requestAppendMyCommunityPostList}
          >
            <Icon className="moreview" /> list more
          </Button>
        )}
        {myCommunityIntro.postsTotalCount <= myCommunityIntro.postsOffset && (
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

export default MyCommunityPostListContainer;
