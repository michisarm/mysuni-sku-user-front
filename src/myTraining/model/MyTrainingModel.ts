import { computed, decorate, observable } from 'mobx';
import { CategoryModel, DramaEntityObservableModel, IdName, LearningState, ProposalState } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';
import LectureServiceType from '../../lecture/shared/model/LectureServiceType';
import { CourseSetModel } from '../../course/model/CourseSetModel';


class MyTrainingModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  student: IdName = new IdName();
  category: CategoryModel = new CategoryModel();
  name: string = '';
  description: string = '';
  cubeType: CubeType = CubeType.None;
  proposalState: ProposalState = ProposalState.Submitted;
  learningState: LearningState = LearningState.Progress;
  learningTime: number = 0;
  stampCount: number = 0;
  coursePlanId: string = '';

  requiredSubsidiaries: IdName[] = [];
  required: boolean = false;
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];

  time: number = 0;

  reviewId: string = '';
  studentCount: number = 0;

  // UI only
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;


  constructor(myTraining?: MyTrainingModel) {
    //
    super();

    if (myTraining) {
      Object.assign(this, { ...myTraining });

      this.serviceType = MyTrainingModel.getServiceType(myTraining);
      this.category = new CategoryModel(myTraining.category);

      // UI Model
      this.cubeTypeName = MyTrainingModel.getCubeTypeName(myTraining.cubeType, this.serviceType);
    }
  }

  static getServiceType(myTraining: MyTrainingModel) {
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
  get state() {
    if (this.proposalState === ProposalState.Approved) {
      if (this.learningState === LearningState.Progress) return 'In Progress';
      if (this.learningState === LearningState.Passed) return 'Completed';
      if (this.learningState === LearningState.Missed) return 'Missed';
      if (this.cubeType === CubeType.Community) return 'Joined';
      else return 'Enrolled';
    }
    else return this.proposalState.toString();
  }
}

decorate(MyTrainingModel, {
  serviceType: observable,
  serviceId: observable,
  student: observable,
  category: observable,
  name: observable,
  description: observable,
  cubeType: observable,
  proposalState: observable,
  learningState: observable,
  learningTime: observable,
  stampCount: observable,
  coursePlanId: observable,
  requiredSubsidiaries: observable,
  cubeId: observable,
  courseSetJson: observable,
  courseLectureUsids: observable,
  lectureCardUsids: observable,
  time: observable,
  required: observable,
  cubeTypeName: observable,
  reviewId: observable,
  studentCount: observable,
});

export default MyTrainingModel;