
class BadgeStudentModel {
  //
  id: string = '';
  patronKeyString: string = '';
  badgeId: string = '';

  studentInfo: {
    name: string,
    company: string,
    department: string,
    email: string,
  } = {
    name: '',
    company: '',
    department: '',
    email: '',
  };

  challengeState: {
    challengeState: string,
  } = {
    challengeState: '',
  };

  challengeStateTime: number = 0;
  learningCompleted: boolean = false;
  learningCompletedTime: number = 0;
  additionTermsMailSent: boolean = false;
  additionTermsMailSentTime: number = 0;
  missionCompleted: boolean = false;
  missionCompletedTime: number = 0;
  issueState: string = '';
  issueStateTime: number = 0;
  creationTime: number = 0;

  constructor(badgeStudent?: BadgeStudentModel) {
    //
    if (badgeStudent) {
      Object.assign(this,{...badgeStudent});
    }
  }
}

export default BadgeStudentModel;
