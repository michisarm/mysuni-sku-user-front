import { PostConfigModel } from './PostConfigModel';
import { PostContentsModel } from './PostContentsModel';
import { IdName } from '../../shared/model/IdName';
import { WriterModel } from './WriterModel';

export class PostCdoModel {
  //
  audienceKey: string = '';
  boardId: string = '';
  title: string = '';
  writer: WriterModel = new WriterModel();
  contents: PostContentsModel = new PostContentsModel();
  config: PostConfigModel = new PostConfigModel();
  category: IdName = new IdName();

}
