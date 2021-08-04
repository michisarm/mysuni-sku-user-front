import { observable, computed } from 'mobx';
import { IdNameCount } from 'shared/model';
import { CollegeType } from 'college/model';
import { IdName } from '@nara.platform/accent';
import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import { LangSupport } from './LangSupport';

class CollegeLectureCountRdo {
  //
  @observable
  id: string = '';

  @observable
  collegeType: CollegeType = CollegeType.University;

  @observable
  name: PolyglotString | null = null;

  langSupports: LangSupport[] = [];

  @observable
  description: string = '';

  @observable
  channels: {
    id: string;
    name: PolyglotString | null;
    langSupports: LangSupport[];
  }[] = [];
}

export default CollegeLectureCountRdo;
