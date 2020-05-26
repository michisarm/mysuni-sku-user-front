import { decorate, observable } from 'mobx';
import { InstructorModel } from './InstructorModel';

export class DescriptionModel {
  instructor: InstructorModel = new InstructorModel();              // 강사
  goal: string = '';                                      // 교육목표
  applicants: string = '';                                // 교육대상
  description: string = '';                               // 교육내용
  completionTerms: string = '';                           // 이수조건
  guide: string = '';                                     // 기타강좌 안내사항

  constructor(description?: DescriptionModel) {
    if (description) {
      const instructor = description.instructor && new InstructorModel(description.instructor) || this.instructor;
      Object.assign(this, { ...description, instructor });
    }
  }
}

decorate(DescriptionModel, {
  instructor: observable,
  goal: observable,
  applicants: observable,
  description: observable,
  completionTerms: observable,
  guide: observable,
});

