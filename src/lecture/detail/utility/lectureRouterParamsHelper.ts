import { matchPath } from 'react-router-dom';
import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

export function parseLectureParamsFromPathname(pathname: string): LectureRouterParams | void {
  let mathch = matchPath<LectureParams>(pathname, {
    path:
      '/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId',
    exact: true,
    strict: true,
  });
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(pathname, {
      path:
        '/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId',
      exact: true,
      strict: true,
    });
  }
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(pathname, {
      path:
        '/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId',
      exact: true,
      strict: true,
    });
  }
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(pathname, {
      path:
        '/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId',
      exact: true,
      strict: true,
    });
  }
  if (mathch !== null) {
    const lectureParams = mathch.params;
    const params = parseLectureParams(lectureParams, pathname);
    return params;
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
  else if(lectureParams.coursePlanId !== undefined){
    return {
      contentType: 'coures',
      contentId: lectureParams.coursePlanId!,
      lectureId: lectureParams.serviceId!,
      pathname,
      lectureParams,
    };
  }
  else{
    return {
      contentType: 'community',
      contentId: lectureParams.communityId!,
      lectureId: lectureParams.menuId!,
      pathname,
      lectureParams,
    };
  }
}
