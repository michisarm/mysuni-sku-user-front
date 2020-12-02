import { findAllPost } from 'community/api/communityApi';
import PostRdo from 'community/model/PostRdo';
import { setCommunityPostListItem } from 'community/store/CommunityPostListStore';
import { addNewBadge, compareAscendingByPinned } from 'community/utility/communityHelper';
import { CommunityPostList } from 'community/viewModel/CommunityPostList';
/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

export async function getAllPostItem(
  param: PostRdo

) {
  const communityPost: CommunityPostList = {
    items: [],
    totalCount: 0,
    empty: false,
    offset: 0,
    limit: 0,
  };
  //TODO api 수정되면 바꿀 예정
  if (param.communityId !== undefined) {
    // {
      const postRdo = {
        'title': param.title,
        'html': param.html,
        'creatorId': param.creatorId,
        'offset': param.offset,
        'limit': 10,
        'searchGubun': param.searchGubun,
        'searchTitle': param.searchTitle,
        'menuId': param.menuId,
        'communityId': param.communityId,
        'sort': param.sort,
        'pinned': param.pinned
      }
      const findPostData = await findAllPost(postRdo);
      if (findPostData) {
        communityPost.totalCount = findPostData.totalCount;
        communityPost.offset = param.offset;
        if (findPostData.results.length !== 0) {
          findPostData.results.forEach(post => {
            communityPost.items.push({
              postId: post.postId,
              communityId: post.communityId,
              communityName: post.communityName,
              title: post.title,
              html: post.html,
              createdTime: post.createdTime,
              replyCount: post.replyCount,
              commentFeedbackId: post.commentFeedbackId,
              nickName: post.nickName || '',
              pinned: post.pinned,
              fileBoxId: post.fileBoxId,
              newBadge: addNewBadge(post.createdTime)
            });
          });
        }
        return communityPost;
      }
    }
  }

export async function getAllPostListMapFromCommunity(

  param: PostRdo
): Promise<void> {
  // void : return이 없는 경우 undefined
  if (param !== undefined) {
    const postItems = await getAllPostItem(
      param
    );
    if (postItems !== undefined) {
      setCommunityPostListItem({ ...postItems });
    }
  }
}
