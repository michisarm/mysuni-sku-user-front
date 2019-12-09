
import PostViewModel from '../../ui/model/PostViewModel';

export default class PostApiModel {
  id: string|undefined;
  title: string|undefined;
  contents: string|undefined;
  date: string|undefined;

  constructor(postViewModel: PostViewModel) {
    Object.assign(this, postViewModel);
  }
}
