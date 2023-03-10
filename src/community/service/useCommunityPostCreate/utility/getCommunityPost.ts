import { findPostByMenuIdAndType } from 'community/api/communityApi';
import Post from 'community/model/Post';
import { setCommunityPostDetailItem } from 'community/store/CommunityPostDetailStore';
import { CommunityPostDetail } from 'community/viewModel/CommunityPostDetail';

export async function getCommunityPost(menuId: string): Promise<void> {
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
    creatorCompanyName: '',
    createdTime: 0,
    modifierId: '',
    modifiedTime: 0,
    nickName: '',
    introduce: '',
    profileImg: '',
    relatedUrlList: [{ title: '', url: '' }],
    content: '',
  };
  if (menuId !== undefined) {
    const post: Post = await findPostByMenuIdAndType(menuId, 'DISCUSSION');
    if (post !== undefined && post !== null) {
      postDetailItem.id = post.id!;
      postDetailItem.postId = post.postId;
      postDetailItem.pinned = post.pinned;
      postDetailItem.title = post.title;
      postDetailItem.html = post.html;
      postDetailItem.visible = post.visible;
      postDetailItem.fileBoxId = post.fileBoxId;
      postDetailItem.createdTime = post.createdTime;
      postDetailItem.creatorId = post.creatorId;
      postDetailItem.creatorName = post.creatorName!;
      postDetailItem.replyCount = post.replyCount;
      postDetailItem.likeCount = post.likeCount;
      postDetailItem.readCount = post.readCount;
      postDetailItem.nickName = post.nickName!;
      postDetailItem.introduce = post.introduce!;
      postDetailItem.profileImg = post.profileImg!;
      postDetailItem.commentFeedbackId = post.commentFeedbackId;
      postDetailItem.prevPost = post.prevPost;
      postDetailItem.nextPost = post.nextPost;
      postDetailItem.relatedUrlList = post.relatedUrlList;
      postDetailItem.content = post.content;
    }
  }
  setCommunityPostDetailItem(postDetailItem);
}
