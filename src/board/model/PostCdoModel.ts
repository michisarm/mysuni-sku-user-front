import { IdName } from 'shared/model';

import PostConfigModel from './PostConfigModel';
import PostContentsModel from './PostContentsModel';
import WriterModel from './WriterModel';
import AlarmInfoModel from './AlarmInfoModel';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

class PostCdoModel {
  //
  audienceKey: string = '';
  boardId: string = '';
  title: PolyglotString | null = null;
  writer: WriterModel = new WriterModel();
  contents: PostContentsModel = new PostContentsModel();
  config: PostConfigModel = new PostConfigModel();
  category: IdName = new IdName();
  alarmInfo: AlarmInfoModel = new AlarmInfoModel();
}

export default PostCdoModel;
