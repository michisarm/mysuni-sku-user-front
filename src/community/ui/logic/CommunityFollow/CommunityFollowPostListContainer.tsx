import React from 'react';
import { Icon, Button, Comment } from "semantic-ui-react";

// 임시 이미지 
import ProfileImg from '../../../../style/media/profile-110-px-sample-4.png';

const CommunityFollowPostListContainer: React.FC = () => {
  return(
    <>
      <div className="sub-info-box">
        {/* 컨텐츠 영역 */}
        <div className="community-main-contants">
          <div className="comment-area community-main-card">
            {/* comments */}
            <Comment.Group className="base">
              {/*comment : 2줄이상 말줄임, 대댓글*/}
              <Comment>
                <Comment.Avatar src={ProfileImg} alt="profile"/>
                <Comment.Content>
                  <Comment.Author as="a">자동차의 핵심은 인공지능 (커뮤니티명)</Comment.Author>
                  <Comment.Text>
                    <div className="ellipsis">
                    <span className="id">tmddnjs78</span>
                    <span className="date">39분 전</span>
                    </div>
                    {/* <Button>+ View more</Button> */}
                  </Comment.Text>
                  <Comment.Actions>
                    <div className="right top">
                      <Button icon className="img-icon">
                        <Icon className="bookmark2" />
                        <span className="blind">북마크</span>
                      </Button>
                      <Button icon className="img-icon">
                        <Icon className="share2" />
                        <span className="blind">공유</span>
                      </Button>
                    </div>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
              <div className="card-bottom">
                <h3><span className="ico_feed board">게시물</span>숏폼 플랫폼인 Quibi 서비스가 론칭되었다</h3>
                <p>SK그룹은 내년 1월 그룹 싱크탱크인 SK경영경제연구소와 기업문화 교육기관인 SK아카데미 등 역량개발 조직을 통합한 SUNI를 공식 출범시킬 예정이라고 18일 밝혔다. 최태원 SK 회장은 급속한 경영환경 변화에 따라 Human…</p>
                <div className="text-right">
                  <button className="ui icon button right btn-blue btn-more">
                    more<i aria-hidden="true" className="icon more2" />
                  </button>
                </div>
              </div>
            </Comment.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityFollowPostListContainer;