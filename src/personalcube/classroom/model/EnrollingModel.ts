
import { decorate, observable } from 'mobx';
import { DatePeriod } from 'shared/model';


export class EnrollingModel {
  //
  applyingPeriod: DatePeriod = new DatePeriod();              // '신청기간 from' - 'to'
  cancellablePeriod: DatePeriod = new DatePeriod();           // '취소가능기간 from' - 'to'
  cancellationPenalty: string = '';                           // 취소 패널티
  learningPeriod: DatePeriod = new DatePeriod();              // ' 학습시작일' - 학습종료일
  enrollingAvailable: boolean = false;                        // 수강신청 가능 유무(e-learnning case)

  constructor(enrolling?: EnrollingModel) {
    if (enrolling) {
      const applyingPeriod = enrolling.applyingPeriod && new DatePeriod(enrolling.applyingPeriod) || this.applyingPeriod;
      const cancellablePeriod = enrolling.cancellablePeriod && new DatePeriod(enrolling.cancellablePeriod) || this.cancellablePeriod;
      const learningPeriod = enrolling.learningPeriod && new DatePeriod(enrolling.learningPeriod) || this.learningPeriod;
      Object.assign(this, { ...enrolling, applyingPeriod, cancellablePeriod, learningPeriod });
    }
  }
}

decorate(EnrollingModel, {
  applyingPeriod: observable,
  cancellablePeriod: observable,
  cancellationPenalty: observable,
  learningPeriod: observable,
  enrollingAvailable: observable,
});

