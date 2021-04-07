
import { IdName } from 'shared/model';

import PostConfigModel from './PostConfigModel';
import PostContentsModel from './PostContentsModel';
import WriterModel from './WriterModel';
import AlarmInfoModel from './AlarmInfoModel';


class PostCdoModel {
  //
  audienceKey: string = '';
  boardId: string = '';
  title: string = '';
  writer: WriterModel = new WriterModel();
  contents: PostContentsModel = new PostContentsModel();
  config: PostConfigModel = new PostConfigModel();
  category: IdName = new IdName();
  alarmInfo: AlarmInfoModel = new AlarmInfoModel();
}

export default PostCdoModel;
