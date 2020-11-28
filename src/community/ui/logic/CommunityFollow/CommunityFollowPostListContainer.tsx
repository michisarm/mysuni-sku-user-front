import React, { useCallback, useState } from 'react';
import { Icon, Button, Comment } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';
import { useLocation } from 'react-router-dom';
import { useFollowCommunityIntro } from '../../../store/CommunityMainStore';
import FollowPostItem from '../../../viewModel/CommunityFollowIntro/FollowPostItem';
import { followList } from '../../../api/communityApi';
import { requestFollowCommunityPostList} from '../../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';

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

const FollowPostItemView: React.FC<FollowPostItem> = function CommunityFollowItemView({
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
                  src={`/files/community/${profileImage}`}
                  alt="profile"
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    자동차의 핵심은 인공지능 (커뮤니티명)
                  </Comment.Author>
                  <Comment.Text>
                    <div className="ellipsis">
                      <span className="id">{name}</span>
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
                {/* <p>SK그룹은 내년 1월 그룹 싱크탱크인 SK경영경제연구소와 기업문화 교육기관인 SK아카데미 등 역량개발 조직을 통합한 SUNI를 공식 출범시킬 예정이라고 18일 밝혔다. 최태원 SK 회장은 급속한 경영환경 변화에 따라 Human…</p> */}
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
      </div>
    </>
  );
};


function CommunityFollowPostListContainer() {
  const communityFollowPostList = useFollowCommunityIntro();

  const addList = () => {

    // setOffsetPage(offsetPage + );
    console.log('offset', offsetPage, limitPage);
  
    requestFollowCommunityPostList(offsetPage,undefined);
  }
  
  const [limitPage, setLimitPage] = useState<number>(2);
  const [offsetPage, setOffsetPage] = useState<any>(communityFollowPostList && communityFollowPostList.communitiesTotalCount);

  console.log('list', communityFollowPostList);
  console.log('offset', offsetPage);

  return (
    <div className="community-main-contants">
      {communityFollowPostList !== undefined &&
        communityFollowPostList.posts.map(postItem => (
          <FollowPostItemView key={postItem.postId} {...postItem} />
        ))}

      <div className="more-comments">
        <Button icon className="left moreview">
          <div style={{border: '1px red solid'}} onClick={addList}>
            <Icon className="moreview" /> list more
          </div>
        </Button>
      </div>
    </div>
  );
}

export default CommunityFollowPostListContainer;
