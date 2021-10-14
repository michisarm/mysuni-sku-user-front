import { observable } from 'mobx';
import { CollegeType } from 'college/model';
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
    count: number;
  }[] = [];
}

export default CollegeLectureCountRdo;
