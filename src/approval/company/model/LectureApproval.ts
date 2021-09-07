import { LectureApproverType } from './LectureApproverType';

export class LectureApproval {
  //
  courseApproverType: LectureApproverType = LectureApproverType.TEAM_LEADER;
  courseApprover: string = '';
  aplApproverType: LectureApproverType = LectureApproverType.TEAM_LEADER;
  aplApprover: string = '';

  constructor(lectureApproval?: LectureApproval) {
    //
    if (lectureApproval) {
      Object.assign(this, { ...lectureApproval });
    }
  }
}
