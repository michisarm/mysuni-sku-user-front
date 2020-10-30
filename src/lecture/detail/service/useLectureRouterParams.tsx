import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseLectureParams } from '../utility/lectureRouterParamsHelper';
import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

export function useLectureRouterParams(): LectureRouterParams | undefined {
  const params = useParams<LectureParams>();
  const [value, setValue] = useState<LectureRouterParams>();

  useEffect(() => {
    setValue(parseLectureParams(params));
  }, [params]);

  return value;
}
