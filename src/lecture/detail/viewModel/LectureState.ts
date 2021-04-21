import CubeType from '../model/CubeType';
import Student from '../../model/Student';
import { CubeDetail } from '../../model/CubeDetail';

export type State = 'None' | 'Start' | 'Progress' | 'Finish' | 'Completed';

export default interface LectureState {
  cubeType: CubeType;
  student?: Student;
  cubeDetail: CubeDetail;
}
