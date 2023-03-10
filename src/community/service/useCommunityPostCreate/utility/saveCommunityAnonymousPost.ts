import {
  modifyCommunityPost,
  registerAnonymousePost,
  registerCommunityCommentPost,
  registerNoticePost,
  registerPost,
} from 'community/api/communityApi';
import { getCommunityPostCreateItem } from 'community/store/CommunityPostCreateStore';
import { NameValueList } from 'shared/model';
import PostCdo from '../../../model/PostCdo';
import PostUdo from '../../../model/PostUdo';

export async function saveCommunityAnonymousPost(
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
      return registerAnonymousePost(communityId, postCdo);
    } else if (postId !== undefined) {
      //todo. 공지 수정 작업해야함
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
