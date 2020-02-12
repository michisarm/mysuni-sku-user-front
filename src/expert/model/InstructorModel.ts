
import { decorate, observable } from 'mobx';
import { CategoryModel } from 'shared/model';
import { MemberSummaryModel } from './MemberSummaryModel';


export class InstructorModel {
  //
  id: string = '';
  employeeId: string = '';
  internal: boolean = false;
  resting: boolean = false;
  category: CategoryModel = new CategoryModel();

  instructorLearningTime: number = 0;
  lectureCount: number = 0;
  lectureHour: number = 0;
  careerYear: number = 0;

  career: string = '';
  tag: string = '';
  memberSummary: MemberSummaryModel = new MemberSummaryModel();
  specialty: string = '';
  specialtyEnName: string = '';
  specialtyKrName: string = '';

  feedbackId: string = '';


  constructor(instructor?: InstructorModel) {
    if (instructor) {
      Object.assign(this, { ...instructor });

      this.category = instructor.category && new CategoryModel(instructor.category) || this.category;
      this.memberSummary = instructor.memberSummary && new MemberSummaryModel(instructor.memberSummary) || this.memberSummary;
    }
  }
}

decorate(InstructorModel, {
  id: observable,
  employeeId: observable,
  internal: observable,
  resting: observable,
  category: observable,

  instructorLearningTime: observable,
  lectureCount: observable,
  lectureHour: observable,
  careerYear: observable,

  career: observable,
  tag: observable,
  memberSummary: observable,
  specialty: observable,
  specialtyEnName: observable,
  specialtyKrName: observable,

  feedbackId: observable,
});

