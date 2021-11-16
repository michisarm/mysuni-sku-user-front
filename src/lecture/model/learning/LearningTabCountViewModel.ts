import { decorate, observable } from 'mobx';

class LearningTabCountViewModel {
  //
  inProgressCount: number = 0;
  completedCount: number = 0;
  retryCount: number = 0;
  bookmarkCount: number = 0;

  enrolledCount: number = 0;

  constructor(learningTabCountViewModel?: LearningTabCountViewModel) {
    if (learningTabCountViewModel) {
      Object.assign(this, { ...learningTabCountViewModel });
    }
  }
}

decorate(LearningTabCountViewModel, {
  inProgressCount: observable,
  completedCount: observable,
  retryCount: observable,
  bookmarkCount: observable,
  enrolledCount: observable,
});

export default LearningTabCountViewModel;
