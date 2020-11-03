import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

export function parseLectureParams(
  params: LectureParams,
  pathname: string
): LectureRouterParams {
  if (params.lectureType !== undefined) {
    return {
      contentType: params.lectureType,
      contentId: params.contentId!,
      lectureId: params.lectureId!,
      pathname,
    };
  }
  if (params.cubeId !== undefined) {
    return {
      contentType: 'cube',
      contentId: params.cubeId!,
      lectureId: params.lectureCardId!,
      pathname,
    };
  }

  return {
    contentType: 'coures',
    contentId: params.coursePlanId!,
    lectureId: params.serviceId!,
    pathname,
  };
}
