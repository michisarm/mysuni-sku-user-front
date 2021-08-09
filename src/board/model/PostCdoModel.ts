import { IdName } from 'shared/model';

import PostConfigModel from './PostConfigModel';
import PostContentsModel from './PostContentsModel';
import WriterModel from './WriterModel';
import AlarmInfoModel from './AlarmInfoModel';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import IdPolyglotString from 'shared/model/IdPolyglotString';

class PostCdoModel {
  //
  audienceKey: string = '';
  boardId: string = '';
  title: PolyglotString | null = null;
  writer: WriterModel = new WriterModel();
  contents: PostContentsModel = new PostContentsModel();
  config: PostConfigModel = new PostConfigModel();
  category: IdPolyglotString = new IdPolyglotString();
  alarmInfo: AlarmInfoModel = new AlarmInfoModel();
}

export default PostCdoModel;
