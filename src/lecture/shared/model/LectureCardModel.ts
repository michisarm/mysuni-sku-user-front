
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { IdName } from 'shared';

import RoleBookModel from './RoleBookModel';


class LectureCardModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  lectureCardId: string = '';
  learningCard: IdName = new IdName();
  roleBooks: RoleBookModel[] = [];


  constructor(lectureCard?: LectureCardModel) {
    if (lectureCard) {
      Object.assign(this, { ...lectureCard });
    }
  }
}

decorate(LectureCardModel, {
  lectureCardId: observable,
  learningCard: observable,
  roleBooks: observable,
});

export default LectureCardModel;
