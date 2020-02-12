
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel, IdName } from 'shared/model';

class LectureCardModel extends DramaEntityObservableModel {
  //
  usid: string = '';
  learningCard: IdName = new IdName();

  reviewId: string = '';
  commentId: string = '';

  time: number = 0;

  constructor(lectureCard?: LectureCardModel) {
    //
    super();
    if (lectureCard) {
      Object.assign(this, { ...lectureCard });
    }
  }
}

decorate(LectureCardModel, {
  usid: observable,
  learningCard: observable,
  reviewId: observable,
  commentId: observable,
  time: observable,
});

export default LectureCardModel;
