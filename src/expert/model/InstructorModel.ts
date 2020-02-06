
import { decorate, observable } from 'mobx';
import { CategoryModel } from 'shared';
import { MemberSummaryModel } from './MemberSummaryModel';


export class InstructorModel {
  //

  employeeId: string = '';
  email: string = '';
  name: string = '';
  company: string = '';
  category: CategoryModel = new CategoryModel();
  internal: boolean = false;
  specialty: string = '';
  instructorLearningTime: number = 0;

  id: string = '';
  career: string = '';
  feedbackId: string = '';
  tag: string = '';
  resting: boolean = false;
  lectureCount: number = 0;
  lectureHour: number = 0;
  careerYear: number = 0;
  memberSummary: MemberSummaryModel = new MemberSummaryModel();
  specialtyEnName: string = '';
  specialtyKrName: string = '';


  constructor(instructor?: InstructorModel) {
    if (instructor) {
      Object.assign(this, { ...instructor });

      this.category = instructor.category && new CategoryModel(instructor.category) || this.category;
      // this.channel = instructor.category && new ChannelModel(instructor.channel) || this.channel;
      this.memberSummary = instructor.memberSummary && new MemberSummaryModel(instructor.memberSummary) || this.memberSummary;
    }
  }
}

decorate(InstructorModel, {
  employeeId: observable,
  email: observable,
  name: observable,
  company: observable,
  category: observable,
  internal: observable,
  specialty: observable,
  instructorLearningTime: observable,

  id: observable,
  career: observable,
  feedbackId: observable,
  tag: observable,
  resting: observable,
  lectureCount: observable,
  lectureHour: observable,
  careerYear: observable,
  memberSummary: observable,
  specialtyEnName: observable,
  specialtyKrName: observable,
});

