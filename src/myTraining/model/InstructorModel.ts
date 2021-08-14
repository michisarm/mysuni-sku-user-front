import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export class InstructorModel {
  //
  employeeId: string = '';
  email: string = '';
  name: PolyglotString | null = null;
  company: string = ''; // 소속사
  instructorLearningTime: number = 0; // 강사교육 학습인정 시간

  constructor(instructor?: InstructorModel) {
    if (instructor) {
      Object.assign(this, instructor);
    }
  }
}

decorate(InstructorModel, {
  employeeId: observable,
  email: observable,
  name: observable,
  company: observable,
  instructorLearningTime: observable,
});
