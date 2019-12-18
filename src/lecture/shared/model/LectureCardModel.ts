
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel, IdName } from 'shared';

import RoleBookModel from './RoleBookModel';


class LectureCardModel extends DramaEntityObservableModel {
  //
  lectureCardId: string = '';
  learningCard: IdName = new IdName();
  roleBooks: RoleBookModel[] = [];


  constructor(lectureCard?: LectureCardModel) {
    //
    super();
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
