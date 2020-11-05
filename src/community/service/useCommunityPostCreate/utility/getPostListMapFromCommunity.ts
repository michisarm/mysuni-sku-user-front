import { findCommunityPost2, findCommunityPostList } from 'community/api/communityApi';
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
      //임시로 CT-9 -> communityId 들어가야함
      const findPostData = await findCommunityPostList('CT-9');
      if (findPostData) {
        console.log('findPostData', findPostData)
        communityPost.totalCount = findPostData.totalCount;
        communityPost.offset = offset;
        if (findPostData.results.length !== 0) {
            findPostData.results.forEach(post => {
          console.log('post', post)

              communityPost.items.push({
                id: post.postId,
                boardId: '',
                readCount: 0,
                title: post.title,
                contents: post.html,
                writer: '작성자',
                time: post.createdTime,
                count: post.replyCount,
                commentFeedbackId: post.commentFeedbackId,
                delete: post.deleted
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
        // setLectureTaskItem({ ...postItems });
      }
    }
  }
