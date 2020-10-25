import { useParams } from 'react-router-dom';
import { parseLectureParams } from '../utility/lectureRouterParamsHelper';
import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

export function useLectureRouterParams(): LectureRouterParams {
  const params = useParams<LectureParams>();
  return parseLectureParams(params);
}
