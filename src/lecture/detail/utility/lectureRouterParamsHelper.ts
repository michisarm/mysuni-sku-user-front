import { matchPath } from 'react-router-dom';
import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

export function parseLectureParamsFromPathname(
  pathname: string
): LectureRouterParams | void {
  const lectureParams = parseParamsFromPathname(pathname);
  if (lectureParams !== undefined) {
    const params = parseLectureParams(lectureParams, pathname);
    return params;
  }
}

export function parseParamsFromPathname(
  pathname: string
): LectureParams | void {
  const path = pathname.substr(pathname.indexOf('/lecture'));
  let mathch = matchPath<LectureParams>(path, {
    path:
      '/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId',
    exact: true,
    strict: true,
  });
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(path, {
      path:
        '/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId',
      exact: true,
      strict: true,
    });
  }
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(path, {
      path:
        '/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId',
      exact: true,
      strict: true,
    });
  }
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(path, {
      path:
        '/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId',
      exact: true,
      strict: true,
    });
  }
  if (mathch !== null) {
    const lectureParams = mathch.params;
    return lectureParams;
  }
}

export function parseLectureParams(
  lectureParams: LectureParams,
  pathname: string
): LectureRouterParams {
  if (lectureParams.lectureType !== undefined) {
    return {
      contentType: lectureParams.lectureType,
      contentId: lectureParams.contentId!,
      lectureId: lectureParams.lectureId!,
      pathname,
      lectureParams,
    };
  }
  if (lectureParams.cubeId !== undefined) {
    return {
      contentType: 'cube',
      contentId: lectureParams.cubeId!,
      lectureId: lectureParams.lectureCardId!,
      pathname,
      lectureParams,
    };
  }
  return {
    contentType: 'coures',
    contentId: lectureParams.coursePlanId!,
    lectureId: lectureParams.serviceId!,
    pathname,
    lectureParams,
  };

}
