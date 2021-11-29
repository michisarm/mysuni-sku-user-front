import { observable } from 'mobx';
import { CollegeType } from 'college/model';
import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import { LangSupport } from './LangSupport';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';

class CollegeLectureCountRdo {
  //
  @observable
  id: string = '';

  @observable
  collegeType: CollegeType = CollegeType.University;

  @observable
  name: string = '';

  @observable
  description: PolyglotString | null = null;

  @observable
  channels: {
    id: string;
    name: string;
    count: number;
  }[] = [];

  @observable
  channelIds: string[] = [];

  constructor(collegeLectureCountRdo?: CollegeLectureCountRdo) {
    if (collegeLectureCountRdo) {
      const channels = collegeLectureCountRdo.channelIds.map((id) => {
        return {
          id,
          count: 0,
        };
      });
      Object.assign(this, { ...collegeLectureCountRdo, channels });
    }
  }

  static asCollegeLectureCountRdo(
    rdo: CollegeLectureCountRdo
  ): CollegeLectureCountRdo {
    return {
      id: rdo.id,
      collegeType: rdo.collegeType,
      description: rdo.description,
      name: getCollgeName(rdo.id),
      channels: rdo.channels,
      channelIds: rdo.channelIds,
    };
  }
}

export default CollegeLectureCountRdo;
