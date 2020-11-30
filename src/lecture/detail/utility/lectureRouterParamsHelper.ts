import LectureParams from '../viewModel/LectureParams';
import LectureRouterParams from '../viewModel/LectureRouterParams';

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
