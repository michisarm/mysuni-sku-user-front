import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CategoryModel, DramaEntityObservableModel, IdName, ProposalState, LearningState } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';
import LectureServiceType from '../../lecture/shared/model/LectureServiceType';
import { CourseSetModel } from '../../course/model/CourseSetModel';



class InMyLecture extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  // student: IdName = new IdName();
  category: CategoryModel = new CategoryModel();
  name: string = '';
  description: string = '';
  cubeType: CubeType = CubeType.None;
  // proposalState: ProposalState = ProposalState.Submitted;
  // learningState: LearningState = LearningState.Progress;
  // learningTime: number = 0;
  stampCount: number = 0;
  coursePlanId: string = '';

  requiredSubsidiaries: IdName[] = [];
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];

  time: number = 0;


  // UI only
  required: boolean = false;
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;


  constructor(inMyLecture?: InMyLecture) {
    //
    super();

    if (inMyLecture) {
      Object.assign(this, { ...inMyLecture });

      this.serviceType = InMyLecture.getServiceType(inMyLecture);
      this.category = new CategoryModel(inMyLecture.category);

      // UI Model
      const cineroom = tenantInfo.getCineroom() as any;
      this.required = cineroom && inMyLecture.requiredSubsidiaries
        && inMyLecture.requiredSubsidiaries.some((subsidiary) => subsidiary.name === cineroom.name);

      this.cubeTypeName = InMyLecture.getCubeTypeName(inMyLecture.cubeType, this.serviceType);
    }
  }

  static getServiceType(inMyLecture: InMyLecture) {
    //
    const serviceType = inMyLecture.serviceType as string;

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
}

decorate(InMyLecture, {
  serviceType: observable,
  serviceId: observable,
  // student: observable,
  category: observable,
  name: observable,
  description: observable,
  cubeType: observable,
  // proposalState: observable,
  // learningState: observable,
  // learningTime: observable,
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
});

export default InMyLecture;
