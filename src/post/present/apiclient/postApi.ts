import axios from 'axios';

import PostViewModel from '../../ui/model/PostViewModel';
import PostApiModel from '../model/PostApiModel';

class PostApi {

  rootURL = process.env.REACT_APP_API_URL;

  findPosts(offset: number, limit: number) {
    return axios.get(this.rootURL + '/posts', { params: { offset, limit }})
      .then((response) => response.data.map((post: PostApiModel) => new PostViewModel(post)));
  }

  countPosts() {
    return axios.get(this.rootURL + '/posts/count')
      .then((response) => response.data);
  }

  registerPost(post: PostViewModel) {
    return axios.post(this.rootURL + '/posts', new PostApiModel(post));
  }

  findPost(postId: string) {
    return axios.get(this.rootURL + `/posts/${postId}`)
      .then((response) => new PostViewModel(response.data));
  }

  removePost(postId: string) {
    return axios.delete(this.rootURL + `/posts/${postId}`);
  }
}

export default new PostApi();
