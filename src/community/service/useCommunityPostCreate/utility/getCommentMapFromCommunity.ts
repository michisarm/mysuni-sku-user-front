import { findCommunityPost, findCommunityPostDetail } from "community/api/communityApi";
import Post from "community/model/Post";
import { setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { CommunityComment, CommunityCommentItem } from "community/viewModel/CommunityComment";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { deletePost } from "./deleteCommunityPost";

export async function getCommentMapFromCommunity(
    commentFeedbackId: string, 
): Promise<void> {
    const commentItem: CommunityComment = {
        // childComment: [],
        // message: '',
        // time: '',
        // name: '',
        // id: '',
        // childItemCount: 0
        comment: 
        [
            {           
            childComment: [],
            message: '',
            time: '',
            name: '',
            id: '',
            childItemCount: 0,
            }
        ],
        ascending: false
    }
    if (commentFeedbackId !== undefined) {
        // const post:Post = await findCommunityPostDetail(communityId, postId);
        // if (post !== undefined && post !== null) {
        //     commentItem.id = post.id!;
        //     commentItem.name = post.postId;
        //     commentItem.message = post.pinned;
        //     commentItem.time = post.title;
        //     commentItem.childComment = post.html;
        //     commentItem.visible = post.visible;

        // }
        commentItem.comment = [
            {
                childComment: [],
                message: '첫번째 댓글',
                time: '1605067966158',
                name: '김승호',
                id: '12345',
                childItemCount: 0,
            },
            {
                childComment: [],
                message: '두번째 댓글',
                time: '1605067966158',
                name: '김승호',
                id: '12345',
                childItemCount: 0,
            },
            {
                childComment: [],
                message: '세번째 댓글',
                time: '1605067966158',
                name: '김승호',
                id: '12345',
                childItemCount: 0,
            },
            {
                childComment: [],
                message: '네번째 댓글',
                time: '1605067966158',
                name: '김승호',
                id: '12345',
                childItemCount: 0,
            }
        ]
    }
    // setCommunityPostDetailItem(postDetailItem);
}

  