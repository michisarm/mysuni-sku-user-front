
import { IdName } from 'shared/model';

import PostConfigModel from './PostConfigModel';
import PostContentsModel from './PostContentsModel';
import WriterModel from './WriterModel';


class PostCdoModel {
  //
  audienceKey: string = '';
  boardId: string = '';
  title: string = '';
  writer: WriterModel = new WriterModel();
  contents: PostContentsModel = new PostContentsModel();
  config: PostConfigModel = new PostConfigModel();
  category: IdName = new IdName();
}

export default PostCdoModel;
