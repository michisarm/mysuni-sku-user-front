import {CubeIntroModel} from '../../../myTraining/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import RollBookModel from '../../../lecture/model/RollBookModel';
import AnswerSheetModel from '../../../survey/answer/model/AnswerSheetModel';
import {SurveyFormModel} from '../../../survey/form/model/SurveyFormModel';
import {ExaminationModel} from '../../../assistant/exam/model/ExaminationModel';
import {ExamPaperModel} from '../../../assistant/paper/model/ExamPaperModel';

class BadgeCubeData {
  // Cube Data
  cubeId: string = '';
  learningCardId: string = '';
  name: string = '';
  cubeType: string = '';
  learningTime: number = 0; // 학습시간(분)
  sumViewSeconds: number = 0; // 진행율(%)
  learningState: string = '';

  cubeIntro: CubeIntroModel | null = null;
  personalCube: PersonalCubeModel | null = null;

  rollBooks: RollBookModel[] = [];

  answerSheet: AnswerSheetModel | null = null;
  surveyForm: SurveyFormModel | null = null;

  examination: ExaminationModel | null = null;
  examPaper: ExamPaperModel | null = null;

  // TRS for Course
  test: boolean = false;
  report: boolean = false;
  survey: boolean = false;

  constructor(data?: BadgeCubeData) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCubeData;
