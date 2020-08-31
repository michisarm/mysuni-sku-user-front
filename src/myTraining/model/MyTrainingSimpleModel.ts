import {
  CategoryModel,
  LearningState,
  ProposalState,
} from 'shared/model';
import { CubeType } from 'personalcube/personalcube/model';
import { LectureServiceType } from 'lecture/model';

class MyTrainingSimpleModel {
  //
  id: string = '';
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  servicePatronKeyString: string = '';
  category: CategoryModel = new CategoryModel();
  name: string = '';
  cubeType: CubeType = CubeType.None;
  proposalState: ProposalState = ProposalState.Submitted;
  learningState: LearningState = LearningState.Progress;
  learningTime: number = 0;
  stampCount: number = 0;

  coursePlanId: string = '';
  required: boolean = false;
  cubeId: string = '';
  time: number = 0;
  createDate: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(myTraining?: MyTrainingSimpleModel) {
    //
    if (myTraining) {
      Object.assign(this, { ...myTraining });

      this.serviceType = MyTrainingSimpleModel.getServiceType(myTraining);
      this.category = new CategoryModel(myTraining.category);
    }
  }

  static getServiceType(myTraining: MyTrainingSimpleModel) {
    //
    const serviceType = myTraining.serviceType as string;

    if (serviceType === 'PROGRAM') {
      return LectureServiceType.Program;
    }
    else if (serviceType === 'COURSE') {
      return LectureServiceType.Course;
    }
    else {
      return LectureServiceType.Card;
    }
  }
}

export default MyTrainingSimpleModel;
