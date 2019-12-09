
import PostApiModel from '../../present/model/PostApiModel';

export default class PostViewModel {
  id: string|undefined;
  title: string|undefined;
  contents: string|undefined;
  date: string|undefined;

  constructor(postApiModel: PostApiModel) {
    Object.assign(this, postApiModel);
  }
}
