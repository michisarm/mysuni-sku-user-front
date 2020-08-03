
import { computed, decorate, observable } from 'mobx';
import { CategoryModel, DatePeriod, DramaEntityObservableModel, IconBoxModel } from 'shared/model';
import {CubeType, CubeTypeNameType, PersonalCubeModel} from 'personalcube/personalcube/model';
import LectureServiceType from './LectureServiceType';
import RollBookModel from './RollBookModel';
import {SurveyFormModel} from '../../survey/form/model/SurveyFormModel';
import AnswerSheetModel from '../../survey/answer/model/AnswerSheetModel';
import { ExaminationModel } from '../../assistant/exam/model/ExaminationModel';
import { ExamPaperModel } from '../../assistant/paper/model/ExamPaperModel';
import { CubeIntroModel } from '../../personalcube/cubeintro/model';


class LectureViewModel extends DramaEntityObservableModel {
  //
  serviceId: string = '';
  serviceType: LectureServiceType = LectureServiceType.Program;
  coursePlanId: string = '';
  cubeId: string = '';
  // cube: PersonalCubeModel = new PersonalCubeModel();

  name: string = '';
  cubeType: CubeType = CubeType.None;
  category: CategoryModel = new CategoryModel();
  iconBox: IconBoxModel = new IconBoxModel();
  creationDate: number = 0;
  learningPeriod: DatePeriod = new DatePeriod();
  lectureCardUsids: string[] = [];
  learningTime: number = 0;
  learningCardId: string = '';
  sumViewSeconds: string = '';
  learningState: string = '';

  // UI only
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;

  personalCube?: PersonalCubeModel = new PersonalCubeModel();
  cubeIntro?: CubeIntroModel = new CubeIntroModel();
  rollBooks: RollBookModel[] = [];

  answerSheet: AnswerSheetModel = new AnswerSheetModel();
  surveyForm: SurveyFormModel = new SurveyFormModel();

  examination: ExaminationModel = new ExaminationModel();
  examPaper: ExamPaperModel = new ExamPaperModel();

  constructor(lectureView?: LectureViewModel) {
    //
    super();

    if (lectureView) {
      Object.assign(this, lectureView);

      this.serviceType = LectureViewModel.getServiceType(lectureView);
      this.category = new CategoryModel(lectureView.category);
      this.cubeTypeName = LectureViewModel.getCubeTypeName(lectureView.cubeType, this.serviceType);
    }
  }

  static getServiceType(lectureView: LectureViewModel) {
    //
    const serviceType = lectureView.serviceType as string;

    if (serviceType === 'COURSE') {
      return LectureServiceType.Course;
    }
    else {
      return LectureServiceType.Card;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    if (serviceType === LectureServiceType.Program) {
      return CubeTypeNameType.Program;
    }
    else if (serviceType === LectureServiceType.Course) {
      return CubeTypeNameType.Course;
    }
    else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }

  @computed
  get baseUrl() {
    return this.iconBox && this.iconBox.baseUrl || '';
  }
}

decorate(LectureViewModel, {
  serviceType: observable,
  name: observable,
  cubeType: observable,
  category: observable,
  creationDate: observable,
  learningPeriod: observable,
  lectureCardUsids: observable,
  learningTime: observable,
  learningCardId: observable,
  sumViewSeconds: observable,
});

export default LectureViewModel;
