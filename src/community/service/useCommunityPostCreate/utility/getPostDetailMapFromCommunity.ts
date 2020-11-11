import { findPostView } from "community/api/communityApi";
import Post from "community/model/Post";
import { setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { deletePost } from "./deleteCommunityPost";

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
        readCount: '',
        visible: false,
        creatorId: '',
        createdTime: 0,
        modifierId: '',
        modifiedTime: 0,
        nickName: '',
        introduce: '',
        profileImg: ''

    }
    if (postId !== undefined) {
        const post: Post = await findPostView(postId);
        if (post !== undefined && post !== null) {
            postDetailItem.id = post.id!;
            postDetailItem.postId = post.postId;
            postDetailItem.pinned = post.pinned;
            postDetailItem.title = post.title;
            postDetailItem.html = post.html;
            postDetailItem.visible = post.visible;
            postDetailItem.fileBoxId = post.fileBoxId;
            postDetailItem.createdTime = post.createdTime;
            postDetailItem.replyCount = post.replyCount;
            postDetailItem.likeCount = post.likeCount;
            postDetailItem.nickName = post.nickName!;
            postDetailItem.introduce = post.introduce!;
            postDetailItem.profileImg = post.profileImg!;
            postDetailItem.commentFeedbackId = post.commentFeebackId
        }
    }
    setCommunityPostDetailItem(postDetailItem);
}

export function deleteCommunityPostDetail(communityId: string, postId: string) {
    const test = deletePost(communityId, postId);

    return test;
}
