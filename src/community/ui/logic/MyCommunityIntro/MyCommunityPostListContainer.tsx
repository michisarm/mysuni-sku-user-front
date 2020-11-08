import React from 'react';
import { Icon, Button, Comment } from 'semantic-ui-react';
import { useMyCommunityIntro } from '../../../store/CommunityMainStore';
import PostItem from '../../../viewModel/MyCommunityIntro/PostItem';

const PostItemView: React.FC<PostItem> = function CommunityItemView({
  communityName,
  profileImage,
  profileId,
  createTime,
  name,
  contents,
}) {
  return (
    <div className="comment-area community-main-card">
      {/* comments */}
      <Comment.Group className="base">
        {/*comment : 2줄이상 말줄임, 대댓글*/}
        <Comment>
          <Comment.Avatar src={profileImage} />
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
                <Button icon className="img-icon">
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
  );
};

function MyCommunityPostListContainer() {
  const myCommunityIntro = useMyCommunityIntro();
  return (
    <div className="community-main-contants">
      {myCommunityIntro !== undefined &&
        myCommunityIntro.posts.map(postItem => (
          <PostItemView key={postItem.postId} {...postItem} />
        ))}

      <div className="more-comments">
        <Button icon className="left moreview">
          <Icon className="moreview" /> list more
        </Button>
      </div>
    </div>
  );
}

export default MyCommunityPostListContainer;
