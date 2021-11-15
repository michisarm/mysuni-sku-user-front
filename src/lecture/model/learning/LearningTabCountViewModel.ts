import { decorate, observable } from 'mobx';

class LearningTabCountViewModel {
  //
  inProgressCount: number = 0;
  completedCount: number = 0;
  retryCount: number = 0;

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
});

export default LearningTabCountViewModel;
