import { findPostView, findPostViewWithRead } from 'community/api/communityApi';
import Post from 'community/model/Post';
import { setCommunityPostDetailItem } from 'community/store/CommunityPostDetailStore';
import { CommunityPostDetail } from 'community/viewModel/CommunityPostDetail';
import { countByFeedbackId } from '../../../../lecture/detail/api/feedbackApi';
import { deletePost } from './deleteCommunityPost';

export async function getPostDetailMapFromCommunity(
  communityId: string,
  postId?: string
): Promise<void> {
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
    const post: Post = await findPostView(postId);
    const { count } = await countByFeedbackId(post.commentFeedbackId);
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
      postDetailItem.replyCount = count;
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
  setCommunityPostDetailItem(postDetailItem);
}

export async function getPostDetailWithReadMapFromCommunity(
  communityId: string,
  postId?: string
): Promise<void> {
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
    relatedUrlList: [],
    nameFlag: ''
  };
  if (postId !== undefined) {
    const post: Post = await findPostViewWithRead(postId);
    const { count } = await countByFeedbackId(post.commentFeedbackId);
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
      postDetailItem.replyCount = count;
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
      postDetailItem.relatedUrlList = post.relatedUrlList;
      postDetailItem.nameFlag = post.nameFlag;
    }
  }
  setCommunityPostDetailItem(postDetailItem);
}

export function deleteCommunityPostDetail(communityId: string, postId: string) {
  const test = deletePost(communityId, postId);

  return test;
}
