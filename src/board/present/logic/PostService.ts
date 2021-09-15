import { action, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import _ from 'lodash';
import PostApi from '../apiclient/PostApi';
import { PostModel, PostContentsModel } from '../../model';
import PageModel from '../../../shared/components/Pagination/model/PageModel';
import NoticeRdo from '../../model/sdo/NoticeRdo';

@autobind
export default class PostService {
  //
  static instance: PostService;

  postApi: PostApi;

  @observable
  post: PostModel = new PostModel();

  @observable
  posts: OffsetElementList<PostModel> = new OffsetElementList<PostModel>();

  @observable
  faqPost: PostModel = new PostModel();

  @observable
  faqPosts: OffsetElementList<PostModel> = new OffsetElementList<PostModel>();

  @observable
  pinnedPosts: OffsetElementList<PostModel> = new OffsetElementList<
    PostModel
  >();

  @observable
  postContents: PostContentsModel = new PostContentsModel();

  constructor(postApi: PostApi) {
    this.postApi = postApi;
  }

  // Post --------------------------------------------------------------------------------------------------------------

  @action
  clearPost() {
    //
    this.post = new PostModel();
  }

  registerPost(post: PostModel) {
    return this.postApi.registerPost(PostModel.asCdo(post));
  }

  @action
  async findPostByPostId(postId: string) {
    //
    const post = await this.postApi.findPostByPostId(postId);
    return runInAction(() => (this.post = new PostModel(post)));
  }

  @action
  modifyPost(postId: string, post: PostModel) {
    //
    return this.postApi.modifyPost(postId, PostModel.modifyNameValueList(post));
  }

  @action
  deletePost(postId: string, post: PostModel) {
    //
    return this.postApi.modifyPost(postId, PostModel.asNameValueList(post));
  }

  @action
  changePostProps(name: string, value: string | {}) {
    //
    this.post = _.set(this.post, name, value);
  }

  // PostCollection ----------------------------------------------------------------------------------------------------

  @action
  clearPosts() {
    //
    this.posts = new OffsetElementList<PostModel>();
  }

  @action
  async findPostsByBoardId(boardId: string, offset: number, limit: number) {
    //
    const posts = await this.postApi.findPostsByBoardId(boardId, offset, limit);
    return runInAction(() => (this.posts = posts));
  }

  @action
  async findPostsByCategoryId(
    categoryId: string,
    offset: number,
    limit: number
  ) {
    //
    const posts = await this.postApi.findPostsByCategoryId(
      categoryId,
      offset,
      limit
    );

    runInAction(() => (this.posts = posts));
    return posts;
  }

  @action
  async findPostsByCategoryIdAndDeleted(
    categoryId: string,
    deleted: boolean,
    offset: number,
    limit: number
  ) {
    //
    const posts = await this.postApi.findPostsByCategoryIdAndDeleted(
      categoryId,
      deleted,
      offset,
      limit
    );
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: !!posts.totalCount,
        title: posts.title ? posts.title : null,
      });
      return posts;
    });
  }

  @action
  async findPostsByBoardIdAndPinned(
    boardId: string,
    offset: number,
    limit: number
  ) {
    //
    const pinnedPosts = await this.postApi.findPostsByBoardIdAndPinned(
      boardId,
      offset,
      limit
    );

    runInAction(() => {
      this.pinnedPosts = pinnedPosts;
    });
    return pinnedPosts;
  }

  @action
  async findNoticePosts(pageModel: PageModel, keyword: string = '') {
    //
    const posts = await this.postApi.findNoticePosts(
      NoticeRdo.asNoticeRdo(keyword, pageModel)
    );
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: !!posts.totalCount,
        title: posts.title,
      });
      return posts;
    });
  }

  @action
  async findPostsByCategoryIdAndAnswered(
    categoryId: string,
    answered: boolean,
    offset: number,
    limit: number
  ) {
    //
    const posts = await this.postApi.findPostsByCategoryIdAndAnswered(
      categoryId,
      answered,
      offset,
      limit
    );
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: !!posts.totalCount,
        title: posts.title,
      });
      return posts;
    });
  }

  @action
  async findFaqPinnedPosts() {
    //
    const faqPosts = await this.postApi.findFaqPinnedPosts();
    return runInAction(() => {
      this.faqPosts = new OffsetElementList<PostModel>({
        results: faqPosts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: faqPosts.totalCount,
        empty: !!faqPosts.totalCount,
        title: faqPosts.title,
      });
      return faqPosts;
    });
  }

  @action
  async findQnaPosts(offset: number, limit: number) {
    //
    const posts = await this.postApi.findQnaPosts(offset, limit);
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: !!posts.totalCount,
        title: posts.title,
      });
      return posts;
    });
  }

  @action
  async findQnaPostsByAnswered(
    answered: boolean,
    offset: number,
    limit: number
  ) {
    //
    const posts = await this.postApi.findQnaPostsByAnswered(
      answered,
      offset,
      limit
    );
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: !!posts.totalCount,
        title: posts.title,
      });
      return posts;
    });
  }

  @action
  async findQnaPostsByCategoryIdAndAnswered(
    categoryId: string,
    answered: boolean,
    offset: number,
    limit: number
  ) {
    //
    const posts = await this.postApi.findQnaPostsByCategoryIdAndAnswered(
      categoryId,
      answered,
      offset,
      limit
    );
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: !!posts.totalCount,
        title: posts.title,
      });
      return posts;
    });
  }
}

Object.defineProperty(PostService, 'instance', {
  value: new PostService(PostApi.instance),
  writable: false,
  configurable: false,
});
