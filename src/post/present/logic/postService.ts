import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

import postApi from '../apiclient/postApi';
import PostViewModel from '../../ui/model/PostViewModel';
import { PageModel } from '../../../shared';

@autobind
export class PostService {

  @observable
  posts: PostViewModel[] = [];

  @observable
  post: PostViewModel = {} as PostViewModel;

  @action
  async findPosts(pageSet: PageModel) {
    if (!pageSet) return;

    this.posts = await postApi.findPosts(pageSet.offset, pageSet.limit);
  }

  async countPosts() {
    const posts = await postApi.countPosts();
    // json-server don't provider total count route. returned total all Posts.
    return posts.length;
  }

  @action
  changePostProp(prop: string, value: string) {
    this.post = { ...this.post, [prop]: value } as PostViewModel;
  }

  registerPost() {
    this.post.date = new Date().toISOString().slice(0, 10);
    return postApi.registerPost(this.post);
  }

  @action
  async findPost(postId: string) {
    this.post = await postApi.findPost(postId);
  }

  removePost(postId: string) {
    return postApi.removePost(postId);
  }

  @action
  initPost() {
    this.post = {} as PostViewModel;
  }

}

export default new PostService();
