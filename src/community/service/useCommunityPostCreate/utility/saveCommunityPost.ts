import {
  modifyCommunityPost,
  registerCommunityCommentPost,
  registerPost,
} from 'community/api/communityApi';
import Post from 'community/model/Post';
import { getCommunityPostCreateItem } from 'community/store/CommunityPostCreateStore';
import { NameValueList } from 'shared/model';
import PostCdo from '../../../model/PostCdo';
import PostUdo from '../../../model/PostUdo';

export async function saveCommunityPost(
  communityId: string,
  menuId?: string,
  postId?: string
): Promise<any> {
  const postCreateItem = getCommunityPostCreateItem();
  if (postCreateItem !== undefined) {
    if (postId === undefined && menuId !== undefined) {
      const postCdo: PostCdo = {
        title: postCreateItem.title,
        html: postCreateItem.contents,
        fileBoxId: postCreateItem.fileBoxId,
        pinned: postCreateItem.pinned,
        visible: postCreateItem.visible,
        menuId,
      };
      return registerPost(communityId, postCdo);
    } else if (postId !== undefined) {
      const postUdo: PostUdo = {
        title: postCreateItem.title,
        html: postCreateItem.contents,
        fileBoxId: postCreateItem.fileBoxId,
        pinned: postCreateItem.pinned,
        visible: postCreateItem.visible,
      };
      return modifyCommunityPost(
        communityId,
        postId,
        modifyNameValueList(postUdo)
      );
    }
  }
}

// 공지, 익명은 fileBoxId 없이 수정해야 하고 일반인 경우 fileBoxId 유무가 있어야 정성처리
function modifyNameValueList(post: any): NameValueList {
  let fileBoxId = post.fileBoxId;
  if (
    post.fileBoxId === undefined ||
    post.fileBoxId === '' ||
    post.fileBoxId === 'null'
  ) {
    fileBoxId = null;
  }
  const modifyNameValues = {
    // title, html, pinned, visible
    nameValues: [
      {
        name: 'title',
        value: String(post.title),
      },
      {
        name: 'html',
        value: post.html,
      },
      {
        name: 'pinned',
        value: post.pinned,
      },
      {
        name: 'visible',
        value: post.visible,
      },
      {
        name: 'fileBoxId',
        value: fileBoxId,
      },
    ],
  };
  return modifyNameValues;
}
