import { findPostViewWithRead } from 'community/api/communityApi';
import Post from 'community/model/Post';
import { CommunityPostDetail } from 'community/viewModel/CommunityPostDetail';

export async function getPostDetailInPreview(postId?: string): Promise<any> {
  const postDetailItem: CommunityPostDetail = {
    id: '',
    postId: '',
    communityId: '',
    menuId: '',
    title: '',
    html: '',
    likeCount: 0,
    replyCount: 0,
    fileBoxId: '',
    commentFeedbackId: '',
    pinned: false,
    readCount: 0,
    visible: false,
    creatorId: '',
    creatorName: '',
    createdTime: 0,
    modifierId: '',
    modifiedTime: 0,
    nickName: '',
    introduce: '',
    profileImg: '',
    creatorCompanyName: '',
    content: '',
  };
  if (postId !== undefined) {
    const post: Post = await findPostViewWithRead(postId);
    if (post !== undefined && post !== null) {

      postDetailItem.id = post.id!;
      postDetailItem.postId = post.postId;
      postDetailItem.menuId = post.menuId;
      postDetailItem.pinned = post.pinned;
      postDetailItem.title = post.title;
      postDetailItem.html = post.html;
      postDetailItem.visible = post.visible;
      postDetailItem.fileBoxId = post.fileBoxId;
      postDetailItem.createdTime = post.createdTime;
      postDetailItem.creatorId = post.creatorId;
      postDetailItem.replyCount = post.replyCount;
      postDetailItem.likeCount = post.likeCount;
      postDetailItem.readCount = post.readCount;
      postDetailItem.nickName = post.nickName!;
      postDetailItem.introduce = post.introduce!;
      postDetailItem.profileImg = post.profileImg!;
      postDetailItem.commentFeedbackId = post.commentFeedbackId;
      postDetailItem.prevPost = post.prevPost;
      postDetailItem.nextPost = post.nextPost;
      postDetailItem.creatorName = post.creatorName!;
      postDetailItem.creatorCompanyName = post.creatorCompanyName!;
      postDetailItem.content = post.content;
    }
  }

  return postDetailItem;
}
