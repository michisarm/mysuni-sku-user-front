import { axiosApi as axios, NameValueList } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import { PostModel } from '../../model/PostModel';
import { PostCdoModel } from '../../model/PostCdoModel';

export default class PostApi {

  URL = '/api/board/posts';

  static instance: PostApi;

  registerPost(post: PostCdoModel) {
    //
    return axios.post<string>(this.URL, post)
      .then(response => response && response.data || null)
      .catch((reason) => {
        console.log(reason);
      });
  }

  findPostsByBoardId(boardId: string, offset: number = 0, limit: number = 10) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + `?boardId=${boardId}&offset=${offset}&limit=${limit}`)
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findPostsByCategoryIdAndDeleted(categoryId: string, deleted: boolean, offset: number, limit: number) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/category-list', { params: { categoryId, deleted, offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findPostsByBoardIdAndPinned(boardId: string, offset: number, limit: number) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/pinned', { params: { boardId, offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findNoticePosts(offset: number, limit: number) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/notice-posts', { params: { offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findPostsByCategoryId(categoryId: string, offset: number = 0, limit: number = 20) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/category', { params: { categoryId, offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findPostByPostId(postId: string) {
    //
    return axios.get<PostModel>(this.URL + `/${postId}`)
      .then(response => response && response.data || null);
  }

  findPostsByCategoryIdAndAnswered(categoryId: string, answered: boolean, offset: number = 0, limit: number = 10) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/category-answer', { params: { categoryId, answered, offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findFaqPinnedPosts() {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/faq-pinned')
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findQnaPosts(offset : number = 0, limit : number = 10) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/qna', { params: { offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findQnaPostsByAnswered(answered : boolean, offset : number = 0, limit : number = 10) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/qna-answered', { params: { answered, offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  findQnaPostsByCategoryIdAndAnswered(categoryId: string, answered: boolean,  offset: number = 0, limit: number = 10) {
    //
    return axios.get<OffsetElementList<PostModel>>(this.URL + '/qna-posts', { params: { categoryId, answered,  offset, limit }})
      .then((response: any) => response && response.data || { results: [], totalCount: 0 });
  }

  modifyPost(postId: string, nameValues: NameValueList) {
    //
    return axios.put<void>(this.URL + `/${postId}`, nameValues);
  }
}

Object.defineProperty(PostApi, 'instance', {
  value: new PostApi(),
  writable: false,
  configurable: false,
});
