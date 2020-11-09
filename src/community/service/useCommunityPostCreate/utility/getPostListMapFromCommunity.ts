import { findCommunityPostList } from 'community/api/communityApi';
import PostRdo from 'community/model/PostRdo';
import { setCommunityPostListItem } from 'community/store/CommunityPostListStore';
import { CommunityPostList } from 'community/viewModel/CommunityPostList';
/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

export async function getPostItem(
  // startDate: string,
  // endDate: string,
  // title: string,
  // html: string,
  // creatorId: string,
  // offset: number,
  // limit: number,
  // searchFilter: string,
  // menuId: string,
  // communityId: string,
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
  if (param.communityId !== '') {
    {
      const postRdo = {
        'startDate': 1573052400000,
        'endDate': 1604674799999,
        'title': param.title,
        'html': param.html,
        'creatorId': param.creatorId,
        'offset': param.offset,
        'limit': 40,
        'searchFilter': param.searchFilter,
        'menuId': param.menuId,
        'communityId': 'CT-9',
        'sort': param.sort
      }
      //임시로 CT-1 -> communityId 들어가야함
      console.log('1111111111')
      const findPostData = await findCommunityPostList(postRdo);
      console.log('findPostData', findPostData)
      if (findPostData) {
        communityPost.totalCount = findPostData.totalCount;
        communityPost.offset = param.offset;
        if (findPostData.results.length !== 0) {
            findPostData.results.forEach(post => {
              communityPost.items.push({
                postId: post.postId,
                communityId: post.communityId,
                title: post.title,
                html: post.html,
                creatorId: post.creatorId,
                createdTime: post.createdTime,
                replyCount: post.replyCount,
                commentFeedbackId: post.commentFeedbackId,
                nick: '닉네임'
              });
            });
            // communityPost.items = ''
            // setLectureTaskItem(old);
          // 댓글 count api
        }
        console.log('마지막 communityPost', communityPost)
        return communityPost;
      }
    }
  }
}

export async function getPostListMapFromCommunity(
  // startDate: string,
  // endDate: string,
  // title: string,
  // html: string,
  // creatorId: string,
  // offset: number,
  // limit: number,
  // searchFilter: string,
  // menuId: string,
  // communityId: string,
  param: PostRdo
): Promise<void> {
  // void : return이 없는 경우 undefined
    if (param !== undefined) {
      const postItems = await getPostItem(
        // startDate,
        // endDate,
        // title,
        // html,
        // creatorId,
        // offset,
        // limit,
        // searchFilter,
        // menuId,
        // communityId,
        param
      );
      if (postItems !== undefined) {
        setCommunityPostListItem({ ...postItems });
      }
    }
  }
