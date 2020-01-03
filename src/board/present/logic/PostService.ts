import { action, configure, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';
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
  post: PostModel = {} as PostModel;

  @observable
  posts: OffsetElementList<PostModel> = { results: [], totalCount: 0 };

  @observable
  faqPost: PostModel = {} as PostModel;

  @observable
  faqPosts: OffsetElementList<PostModel> = { results: [], totalCount: 0 };

  @observable
  pinnedPosts: OffsetElementList<PostModel> = { results: [], totalCount: 0 };

  @observable
  postContents: PostContentsModel = {} as PostContentsModel;

  constructor(postApi: PostApi) {
    this.postApi = postApi;
  }

  registerPost(post: PostModel) {
    post = _.set(post, 'audienceKey', 'r2p8-r@nea-m5-c5');
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
    return runInAction(() => this.posts = posts);
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
    return runInAction(() => this.posts = posts);
  }

  @action
  async findFaqPinnedPosts() {
    //
    const faqPosts = await this.postApi.findFaqPinnedPosts();
    return runInAction(() => this.faqPosts = faqPosts);
  }

  @action
  async findQnaPostsByCategoryIdAndAnswered(categoryId: string, answered: boolean, offset: number, limit: number) {
    //
    const posts = await this.postApi.findQnaPostsByCategoryIdAndAnswered(categoryId, answered, offset, limit);
    return runInAction(() => this.posts = posts);
  }

  @action
  modifyPost(postId: string, post: PostModel) {
    //
    this.postApi.modifyPost(postId, PostModel.asNameValueList(post));
  }

  @action
  changePostProps(name: string, value: string | {}) {
    //
    this.post = { ...this.post, [name]: value } as PostModel;
  }

  @action
  onChangerContentsProps(name: string, value: string | {}) {
    //
    this.post = _.set(this.post, name, value);
  }

  @action
  clearPost() {
    //
    this.post = {} as PostModel;
  }

  @action
  clearPosts() {
    //
    this.posts = { results: [], totalCount: 0 };
  }
}

Object.defineProperty(PostService, 'instance', {
  value: new PostService(PostApi.instance),
  writable: false,
  configurable: false,
});
