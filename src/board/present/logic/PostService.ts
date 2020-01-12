import { action, configure, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import _ from 'lodash';
import PostApi from '../apiclient/PostApi';
import { PostModel } from '../../model/PostModel';
import { PostContentsModel } from '../../model/PostContentsModel';

configure({
  enforceActions: 'observed',
});

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
  pinnedPosts: OffsetElementList<PostModel> = new OffsetElementList<PostModel>();

  @observable
  postContents: PostContentsModel = new PostContentsModel();

  constructor(postApi: PostApi) {
    this.postApi = postApi;
  }

  registerPost(post: PostModel) {
    // post = _.set(post, 'audienceKey', 'r2p8-r@nea-m5-c5');
    return this.postApi.registerPost(PostModel.asCdo(post));
  }

  @action
  async findPostsByBoardId(boardId: string, offset: number, limit: number) {
    //
    const posts = await this.postApi.findPostsByBoardId(boardId, offset, limit);
    return runInAction(() => this.posts = posts);
  }

  @action
  async findPostsByCategoryId(categoryId: string, offset: number, limit: number) {
    //
    const posts = await this.postApi.findPostsByCategoryId(categoryId, offset, limit);
    if (posts) return runInAction(() => this.posts = posts);
    else return null;
  }

  @action
  async findPostsByCategoryIdAndDeleted(categoryId: string, deleted: boolean, offset: number, limit: number) {
    //
    const posts = await this.postApi.findPostsByCategoryIdAndDeleted(categoryId, deleted, offset, limit);
    return runInAction(() => this.posts = posts);
  }

  @action
  async findPostsByBoardIdAndPinned(boardId: string, offset: number, limit: number) {
    //
    const pinnedPosts = await this.postApi.findPostsByBoardIdAndPinned(boardId, offset, limit);
    return runInAction(() => this.pinnedPosts = pinnedPosts);
  }

  @action
  async findNoticePosts(offset: number, limit: number) {
    //
    const posts = await this.postApi.findNoticePosts(offset, limit);
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: posts.totalCount ? true : false,
      });
      return posts;
    });
  }

  @action
  async findPostByPostId(postId: string) {
    //
    const post = await this.postApi.findPostByPostId(postId);
    return runInAction(() => this.post = new PostModel(post));
  }

  @action
  async findPostsByCategoryIdAndAnswered(categoryId: string, answered: boolean, offset: number, limit: number) {
    //
    const posts = await this.postApi.findPostsByCategoryIdAndAnswered(categoryId, answered, offset, limit);
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: posts.totalCount ? true : false,
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
        empty: faqPosts.totalCount ? true : false,
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
        empty: posts.totalCount ? true : false,
      });
      return posts;
    });
  }

  @action
  async findQnaPostsByAnswered(answered: boolean, offset: number, limit: number) {
    //
    const posts = await this.postApi.findQnaPostsByAnswered(answered, offset, limit);
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: posts.totalCount ? true : false,
      });
      return posts;
    });
  }

  @action
  async findQnaPostsByCategoryIdAndAnswered(categoryId: string, answered: boolean, offset: number, limit: number) {
    //
    const posts = await this.postApi.findQnaPostsByCategoryIdAndAnswered(categoryId, answered, offset, limit);
    return runInAction(() => {
      this.posts = new OffsetElementList<PostModel>({
        results: posts.results.map((post: PostModel) => new PostModel(post)),
        totalCount: posts.totalCount,
        empty: posts.totalCount ? true : false,
      });
      return posts;
    });
  }

  @action
  modifyPost(postId: string, post: PostModel) {
    //
    return this.postApi.modifyPost(postId, PostModel.asNameValueList(post));
  }

  @action
  changePostProps(name: string, value: string | {}) {
    //
    this.post = _.set(this.post, name, value);
  }

  @action
  clearPost() {
    //
    this.post = new PostModel();
  }

  @action
  clearPosts() {
    //
    this.posts = new OffsetElementList<PostModel>();
  }
}

Object.defineProperty(PostService, 'instance', {
  value: new PostService(PostApi.instance),
  writable: false,
  configurable: false,
});
