import queryString from 'query-string';

interface OptionalParams {
  programLectureId?: string;
  courseLectureId?: string;
  postCourseLectureId?: string;
}

function getQueryParams(optionalParams: OptionalParams = {}) {
  //
  const queryParams = queryString.stringify(optionalParams);

  return (queryParams && `?${queryParams}`) || '';
}

export default {
  // Category
  collegeLectures: (collegeId: string) =>
    `/lecture/college/${collegeId}/channels`,

  collegeLecturesPage: (pageNo: number) => `./${pageNo}`,

  channelLectures: (collegeId: string, channelId: string) =>
    `/lecture/college/${collegeId}/channel/${channelId}`,

  courseOverviewPrev: (
    collegeId: string,
    coursePlanId: string,
    serviceType: string,
    serviceId: string,
    { programLectureId, courseLectureId }: OptionalParams = {}
  ) =>
    `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}${getQueryParams(
      { programLectureId, courseLectureId }
    )}`,

  courseOverview: (cardId: string) => `/lecture/detail/card/${cardId}/view`,

  lectureCardOverviewPrev: (
    collegeId: string,
    cubeId: string,
    lectureCardId: string,
    { programLectureId, courseLectureId }: OptionalParams = {}
  ) =>
    `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}${getQueryParams(
      { programLectureId, courseLectureId }
    )}`,

  lectureCardOverview: (cardId: string, cubeId: string) =>
    `/lecture/detail/card/${cardId}/cube/${cubeId}/view`,

  // Recommend
  recommend: () => `/lecture/recommend`,

  recommendChannelLectures: (channelId: string) =>
    `/lecture/recommend/channel/${channelId}`,

  currentPage: (pageNo: number) => `./${pageNo}`,
};
