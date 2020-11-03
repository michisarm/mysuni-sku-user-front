import CubeType from './CubeType';
import IdName from './IdName';

export default interface CubeContents {
  type: CubeType;
  contents: IdName;
  lengthInMinute: number;
  surveyId: string;
  surveyCaseId: string;
  examId: string;
  paperId: string;
  fileBoxId: string;
}
