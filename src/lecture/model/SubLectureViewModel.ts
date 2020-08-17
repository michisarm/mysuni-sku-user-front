import {decorate, observable} from 'mobx';
import {DramaEntityObservableModel} from 'shared/model';
import LectureViewModel from './LectureViewModel';


class SubLectureViewModel extends DramaEntityObservableModel {
  //
  lectureId: string = '';
  lectureViews: LectureViewModel[] = [];
  //
}

decorate(SubLectureViewModel, {
  lectureId: observable,
  lectureViews: observable,
});

export default SubLectureViewModel;
