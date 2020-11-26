import PostRdo from 'community/model/PostRdo';
import { setCommunityPostListItem } from 'community/store/CommunityPostListStore';
import { addNewBadge, compareAscendingByPinned } from 'community/utility/communityHelper';
import { CommunityPostList } from 'community/viewModel/CommunityPostList';
import { findPostViewsByMenuId } from '../../../api/communityApi';
/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

export async function getPostItem(
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
        'title': param.title,
        'html': param.html,
        'creatorId': param.creatorId,
        'offset': param.offset,
        'limit': 10,
        'searchGubun': param.searchGubun,
        'searchTitle': param.searchTitle,
        'menuId': param.menuId,
        'communityId': param.communityId,
        'communityName': param.communityName,
        'sort': param.sort,
        'pinned': param.pinned
      }

      const findPostData = await findPostViewsByMenuId(postRdo);
      if (findPostData) {
        communityPost.totalCount = findPostData.totalCount;
        communityPost.offset = param.offset;
        if (findPostData.results.length !== 0) {
          findPostData.results.forEach(post => {
            //mock data
            // communityPost.items = [
            //   {  
            //     postId: '1',
            //     communityId: '2',
            //     title: '둘다 펄스',
            //     html: '2',
            //     replyCount: 1,
            //     commentFeedbackId: '123',
            //     creatorId: '1',
            //     createdTime: 123,
            //     nick: '123',
            //     pinned: false,
            //     fileBoxId: '1',
            //     newBadge: false
            //   },
            //   {  
            //     postId: '1',
            //     communityId: '2',
            //     title: '둘다 트루',
            //     html: '2',
            //     replyCount: 1,
            //     commentFeedbackId: '123',
            //     creatorId: '1',
            //     createdTime: 123,
            //     nick: '123',
            //     pinned: true,
            //     fileBoxId: '1',
            //     newBadge: true
            //   },
            //   {  
            //     postId: '2',
            //     communityId: '1',
            //     title: '핀드는 펄스 뉴뱃지는 트루',
            //     html: '1',
            //     replyCount: 1,
            //     commentFeedbackId: '123',
            //     creatorId: '1',
            //     createdTime: 123,
            //     nick: '123',
            //     pinned: false,
            //     fileBoxId: '1',
            //     newBadge: true
            //   },
            //   {  
            //     postId: '3',
            //     communityId: '2',
            //     title: '핀드는 트루 뉴뱃지는 펄스',
            //     html: '2',
            //     replyCount: 1,
            //     commentFeedbackId: '123',
            //     creatorId: '1',
            //     createdTime: 123,
            //     nick: '123',
            //     pinned: true,
            //     fileBoxId: '1',
            //     newBadge: false
            //   }
            // ]

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
        //공지 상위처리 백엔드에서 작업하기로해서 일단 주석
        // communityPost.items.sort(compareAscendingByPinned)
        return communityPost;
      }
    }
  }
}

export async function getPostListMapFromCommunity(

  param: PostRdo
): Promise<void> {
  // void : return이 없는 경우 undefined
  if (param !== undefined) {
    const postItems = await getPostItem(
      param
    );
    if (postItems !== undefined) {
      setCommunityPostListItem({ ...postItems });
    }
  }
}
