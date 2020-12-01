import React, { useCallback, useState, useEffect } from 'react';
import { Icon, Button, Comment } from 'semantic-ui-react';
import { reactAlert } from '@nara.platform/accent';
import { useLocation } from 'react-router-dom';
import { useFollowCommunityIntro } from '../../../store/CommunityMainStore';
import FollowPostItem from '../../../viewModel/CommunityFollowIntro/FollowPostItem';
import { followList } from '../../../api/communityApi';
import { requestFollowCommunityPostList } from '../../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import FollowCommunityIntro from 'community/viewModel/CommunityFollowIntro/FollowCommunityIntro';
import { off } from 'process';

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

const bookMark = (): void => {
  reactAlert({
    title: '북마크',
    message: '북마크 추가 완료',
  });
};

const FollowPostItemView: React.FC<FollowPostItem> = function CommunityFollowItemView({
  communityId,
  postId,
  communityName,
  profileImage,
  profileId,
  createdTime,
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
                  src={profileImage === null ? `${DefaultImg}` : `/files/community/${profileImage}`}
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
                      <Button icon className="img-icon" onClick={bookMark}>
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

interface Props {
  setNotPosts: boolean
}

function CommunityFollowPostListContainer({setNotPosts}: any) {
  const communityFollowPostList = useFollowCommunityIntro();
  // console.log('container', communityFollowPostList);

  const [limitPage, setLimitPage] = useState<number>(5);
  const [offsetPage, setOffsetPage] = useState<number>(0);

  const addList = () => {
    if (communityFollowPostList && communityFollowPostList.postsTotalCount < offsetPage) {
      console.log('return');
      return;
    }
    setOffsetPage(offsetPage + 5);
    requestFollowCommunityPostList(offsetPage, 5);
    console.log('offset', offsetPage);
  }
  console.log('list@@@@@@@', communityFollowPostList?.postsTotalCount);

  useEffect(() => {
    if(communityFollowPostList?.postsTotalCount === 0) {
      setNotPosts(true);
    }
  },[communityFollowPostList]);

  return (
    <div className="community-main-contants">
      {communityFollowPostList !== undefined &&
        communityFollowPostList.posts.map(postItem => (
          <FollowPostItemView key={postItem.postId} {...postItem} />
        ))}

      <div className="more-comments">
        <Button icon className="left moreview">
          <div onClick={addList}>
            <Icon className="moreview" /> list more
          </div>
        </Button>
      </div>
    </div>
  );
}

export default CommunityFollowPostListContainer;
