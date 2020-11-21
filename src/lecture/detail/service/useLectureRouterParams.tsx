import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { parseLectureParams } from '../utility/lectureRouterParamsHelper';
import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

export function useLectureRouterParams(): LectureRouterParams | undefined {
  const params = useParams<LectureParams>();
  const { pathname } = useLocation();
  const [value, setValue] = useState<LectureRouterParams>();

  useEffect(() => {
    const next = parseLectureParams(params, pathname);
    if (
      value === undefined ||
      value.contentId !== next.contentId ||
      value.lectureId !== next.lectureId ||
      value.contentType !== next.contentType
    ) {
      setValue(parseLectureParams(params, pathname));
    }
  }, [params, pathname]);

  return value;
}
