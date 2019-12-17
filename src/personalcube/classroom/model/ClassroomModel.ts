import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { InstructorModel, OperationModel, ReportFileBoxModel } from '../../cubeintro';
import { FreeOfChargeModel } from './FreeOfChargeModel';
import { EnrollingModel } from './EnrollingModel';

export class ClassroomModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  name: string = '';
  description: string = '';
  instructor: InstructorModel = new InstructorModel();                  // todo. 추가
  freeOfCharge: FreeOfChargeModel = new FreeOfChargeModel();
  round: number = 0;                                                    // 차수
  enrolling: EnrollingModel = new EnrollingModel();                     // 신청/취소/학습 기간/신청유무
  capacity: number = 0;                                                 // 정원정보
  waitingCapacity: number = 0;                                          // 대기 가능 인원
  capacityClosed: boolean = false;                                      // 정원 마감
  operation: OperationModel = new OperationModel();
  roundSurveyId: string = '';                                           // 설문(차수별)
  roundExamId: string = '';                                             // 테스트(차수별)
  roundReportFileBox: ReportFileBoxModel = new ReportFileBoxModel();    // 과제여부 및 filebox(차수별)
  time: number = 0;

  constructor(classroom?: ClassroomModel) {
    if (classroom) {
      const instructor = classroom.instructor && new InstructorModel(classroom.instructor) || this.instructor;
      const freeOfCharge = classroom.freeOfCharge && new FreeOfChargeModel(classroom.freeOfCharge) || this.freeOfCharge;
      const enrolling = classroom.enrolling && new EnrollingModel(classroom.enrolling) || this.enrolling;
      const operation = classroom.operation && new OperationModel(classroom.operation) || this.operation;
      const roundReportFileBox = classroom.roundReportFileBox && new ReportFileBoxModel(classroom.roundReportFileBox) || this.roundReportFileBox;
      Object.assign(this, {
        ...classroom,
        instructor,
        freeOfCharge,
        enrolling,
        operation,
        roundReportFileBox,
      });
    }
  }

}

decorate(ClassroomModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  name: observable,
  description: observable,
  instructor: observable,
  freeOfCharge: observable,
  round: observable,
  enrolling: observable,
  capacity: observable,
  waitingCapacity: observable,
  capacityClosed: observable,
  operation: observable,
  roundSurveyId: observable,
  roundExamId: observable,
  roundReportFileBox: observable,
  time: observable,
});

