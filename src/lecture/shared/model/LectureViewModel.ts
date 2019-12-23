
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel, CategoryModel, DatePeriod } from 'shared';
import { CubeType } from 'personalcube/personalcube';
import LectureServiceType from './LectureServiceType';


class LectureViewModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Program;
  name: string = '';
  cubeType: CubeType = CubeType.None;
  category: CategoryModel = new CategoryModel();
  creationDate: number = 0;
  learningPeriod: DatePeriod = new DatePeriod();
  lectureCards: string[] = [];

  constructor(lectureView?: LectureViewModel) {
    super();
    if (lectureView) {
      Object.assign(this, lectureView);
    }
  }
}

decorate(LectureViewModel, {
  serviceType: observable,
  name: observable,
  cubeType: observable,
  category: observable,
  creationDate: observable,
  learningPeriod: observable,
  lectureCards: observable,
});

export default LectureViewModel;
