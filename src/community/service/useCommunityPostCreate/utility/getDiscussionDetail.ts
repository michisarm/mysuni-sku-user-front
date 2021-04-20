import { CommunityDiscussionDetail } from '../../../viewModel/CommunityDiscussionDetail';
import { findPostMenuDiscussion } from 'community/api/communityApi';
import { setCommunityDiscussionDetailItem } from '../../../store/CommunityDiscussionDetailStore';

export async function getCommunityDiscussion(menuId: string): Promise<any> {
  const postDetailItem: CommunityDiscussionDetail = {
    commentFeedbackId: '',
    communityId: '',
    content: '',
    createdTime: 0,
    creatorId: '',
    fileBoxId: '',
    html: '',
    id: '',
    likeCount: 0,
    menuId: '',
    modifierId: '',
    modifiedTime: 0,
    patronKey: { keyString: '' },
    pinned: false,
    postId: '',
    privateComment: false,
    readCount: 0,
    relatedUrlList: [{ title: '', url: '' }],
    replyCount: 0,
    title: '',
    type: '',
    visible: true,
  };
  if (menuId !== undefined) {
    const post: CommunityDiscussionDetail = await findPostMenuDiscussion(
      menuId
    );
    if (post !== undefined && post !== null) {
      postDetailItem.commentFeedbackId = post.commentFeedbackId;
      postDetailItem.communityId = post.communityId;
      postDetailItem.content = post.content;
      postDetailItem.createdTime = post.createdTime;
      postDetailItem.creatorId = post.creatorId;
      postDetailItem.fileBoxId = post.fileBoxId;
      postDetailItem.html = post.html;
      postDetailItem.id = post.id;
      postDetailItem.likeCount = post.likeCount;
      postDetailItem.menuId = post.menuId;
      postDetailItem.modifierId = post.modifierId;
      postDetailItem.modifiedTime = post.modifiedTime;
      postDetailItem.patronKey = post.patronKey;
      postDetailItem.pinned = post.pinned;
      postDetailItem.postId = post.postId;
      postDetailItem.privateComment = post.privateComment;
      postDetailItem.readCount = post.readCount;
      postDetailItem.relatedUrlList = post.relatedUrlList;
      postDetailItem.replyCount = post.replyCount;
      postDetailItem.title = post.title;
      postDetailItem.type = post.type;
      postDetailItem.visible = post.visible;
    }
  }
  setCommunityDiscussionDetailItem(postDetailItem);
}
