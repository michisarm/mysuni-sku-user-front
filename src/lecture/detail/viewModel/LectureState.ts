import { ApprovalMemberModel } from '../../../approval/member/model/ApprovalMemberModel';
import { ClassroomModel } from '../../../personalcube/classroom/model';
import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import ProposalState from '../model/ProposalState';
import { Classroom as RemoteClassroom } from '../../model/Classroom';
import Student from '../../model/Student';
import { CubeDetail } from '../../model/CubeDetail';

export type State = 'None' | 'Start' | 'Progress' | 'Finish' | 'Completed';

export default interface LectureState {
  cubeType: CubeType;
  student?: Student;
  cubeDetail: CubeDetail;
}
