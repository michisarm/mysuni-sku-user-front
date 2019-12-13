import { decorate, observable } from 'mobx';
import { ChannelModel } from './ChannelModel';
import { MemberSummaryModel } from './MemberSummaryModel';

export class InstructorModel {
  //

  employeeId: string = '';
  email: string = '';
  name: string = '';
  company: string = '';
  category: string = '';
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
  channel: ChannelModel = new ChannelModel();

  constructor(instructor?: InstructorModel) {
    if (instructor) {
      const channel = instructor.channel && new ChannelModel(instructor.channel) || this.channel;
      const memberSummary = instructor.memberSummary && new MemberSummaryModel(instructor.memberSummary) || this.memberSummary;
      Object.assign(this, { ...instructor, channel, memberSummary });

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
  channel: observable,
});

