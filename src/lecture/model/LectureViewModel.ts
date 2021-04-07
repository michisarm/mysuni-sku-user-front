import { computed, decorate, observable } from 'mobx';
import {
  CategoryModel,
  DatePeriod,
  DramaEntityObservableModel,
  IconBoxModel,
} from 'shared/model';
import {
  CubeType,
  CubeTypeNameType,
  PersonalCubeModel,
} from 'personalcube/personalcube/model';
import LectureServiceType from './LectureServiceType';
import RollBookModel from './RollBookModel';
import { SurveyFormModel } from '../../survey/form/model/SurveyFormModel';
import AnswerSheetModel from '../../survey/answer/model/AnswerSheetModel';
import { ExaminationModel } from '../../assistant/exam/model/ExaminationModel';
import { ExamPaperModel } from '../../assistant/paper/model/ExamPaperModel';
import { CubeIntroModel } from '../../personalcube/cubeintro/model';
import StudentModel from './StudentModel';
import SurveyCaseModel from '../../survey/event/model/SurveyCaseModel';

class LectureViewModel extends DramaEntityObservableModel {
  //
  serviceId: string = '';
  serviceType: LectureServiceType = LectureServiceType.Card;
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
  required: number = 0;

  // UI only
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;

  personalCube?: PersonalCubeModel = new PersonalCubeModel();
  cubeIntro?: CubeIntroModel = new CubeIntroModel();
  rollBooks: RollBookModel[] = [];

  answerSheet: AnswerSheetModel = new AnswerSheetModel();
  surveyForm: SurveyFormModel = new SurveyFormModel();
  surveyCase: SurveyCaseModel = new SurveyCaseModel();

  examination: ExaminationModel = new ExaminationModel();
  examPaper: ExamPaperModel = new ExamPaperModel();

  student: StudentModel = new StudentModel();

  constructor(lectureView?: LectureViewModel) {
    //
    super();

    if (lectureView) {
      Object.assign(this, lectureView);

      this.serviceType = LectureViewModel.getServiceType(lectureView);
      this.category = new CategoryModel(lectureView.category);
      this.cubeTypeName = LectureViewModel.getCubeTypeName(
        lectureView.cubeType,
        this.serviceType
      );
      this.surveyCase = new SurveyCaseModel(this.surveyCase);
    }
  }

  static getServiceType(lectureView: LectureViewModel) {
    //
    const serviceType = lectureView.serviceType as string;

    if (serviceType === 'Card') {
      return LectureServiceType.Card;
    } else {
      return LectureServiceType.Cube;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    if (serviceType === 'Card') {
      return CubeTypeNameType.Card;
    } else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }

  @computed
  get baseUrl() {
    return (this.iconBox && this.iconBox.baseUrl) || '';
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
