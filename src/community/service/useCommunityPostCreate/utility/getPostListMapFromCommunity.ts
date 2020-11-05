import { findCommunityPostList } from 'community/api/communityApi';
import { setCommunityPostListItem } from 'community/store/CommunityPostListStore';
import { CommunityPostList } from 'community/viewModel/CommunityPostList';
/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  findPersonalCube,
  findTask,
} from 'lecture/detail/api/mPersonalCubeApi';
import {
  getLectureTaskItem,
  // setLectureChildTaskItem,
  setLectureTaskItem,
} from 'lecture/detail/store/LectureTaskStore';
import {
  LectureTask,
  // LectureTaskChild,
} from 'lecture/detail/viewModel/LectureTask';


async function getPostItem(
  communityId: string,
  offset: number,
  limit: number,
  sortType: string,
  searchType: string,
  searchText: string
) {
  const communityPost: CommunityPostList = {
    items: [],
    totalCount: 0,
    empty: false,
    offset: 0,
    limit: 0,
  };
  //TODO api 수정되면 바꿀 예정
  if (communityId !== '') {
    {
      const postRdo = {
        'communityId': 'CT-9',
        'searchFilter': '',
        'startDate': 1572966000000,
        'endDate': 1604588399999,
        'limit': 10,
        'offset': 0
      }
      //임시로 CT-9 -> communityId 들어가야함
      const findPostData = await findCommunityPostList(postRdo);
      console.log('findPostData', findPostData)
      if (findPostData) {
        communityPost.totalCount = findPostData.totalCount;
        communityPost.offset = offset;
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
              });
            });
            // communityPost.items = ''
            // setLectureTaskItem(old);
          // 댓글 count api
        }
        return communityPost;
      }
    }
  }
}

export async function getPostListMapFromCommunity(
  communityId: string,
  offset: number,
  limit: number,
  sortType: string,
  searchType: string,
  searchText: string
): Promise<void> {
  // void : return이 없는 경우 undefined

    if (communityId !== undefined) {
      const addflag = !!getLectureTaskItem();
      const postItems = await getPostItem(
        communityId,
        offset,
        limit,
        sortType,
        searchType,
        searchText,
      );
      if (postItems !== undefined) {
        setCommunityPostListItem({ ...postItems });
      }
    }
  }
