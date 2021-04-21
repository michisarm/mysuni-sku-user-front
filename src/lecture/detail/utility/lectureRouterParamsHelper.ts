import { matchPath } from 'react-router-dom';
import LectureParams from '../viewModel/LectureParams';

export function parseParamsFromPathname(
  pathname: string
): LectureParams | void {
  const path = pathname.substr(pathname.indexOf('/lecture'));
  let mathch = matchPath<LectureParams>(path, {
    path: '/lecture/card/:cardId/cube/:cubeId/:viewType',
    strict: true,
  });
  if (!mathch?.isExact) {
    mathch = matchPath<LectureParams>(path, {
      path: '/lecture/card/:cardId/:viewType',
      strict: true,
    });
  }
  if (mathch !== null) {
    const lectureParams = mathch.params;
    return lectureParams;
  }
}

// export function parseLectureParams(
//   lectureParams: LectureParams,
//   pathname: string
// ): LectureParams {
//   if (lectureParams.lectureType !== undefined) {
//     return {
//       contentType: lectureParams.lectureType,
//       contentId: lectureParams.contentId!,
//       lectureId: lectureParams.lectureId!,
//       pathname,
//       lectureParams,
//     };
//   }
//   if (lectureParams.cubeId !== undefined) {
//     return {
//       contentType: 'cube',
//       contentId: lectureParams.cubeId!,
//       lectureId: lectureParams.lectureCardId!,
//       pathname,
//       lectureParams,
//     };
//   }
//   return {
//     contentType: 'coures',
//     contentId: lectureParams.coursePlanId!,
//     lectureId: lectureParams.serviceId!,
//     pathname,
//     lectureParams,
//   };
// }
