
import queryString from 'query-string';


interface OptionalParams {
  programLectureId?: string,
  courseLectureId?: string
}


function getQueryParams(optionalParams: OptionalParams = {}) {
  //
  const queryParams = queryString.stringify(optionalParams);

  return queryParams && `?${queryParams}` || '';
}

export default {

  collegeLectures: (collegeId: string) =>
    `/lecture/college/${collegeId}/channels`,

  collegeLecturesPage: (pageNo: number) =>
    `./${pageNo}`,

  channelLectures: (collegeId: string, channelId: string) =>
    `/lecture/college/${collegeId}/channel/${channelId}`,

  courseOverview: (
    collegeId: string, coursePlanId: string, serviceType: string, serviceId: string,
    { programLectureId, courseLectureId }: OptionalParams = {}
  ) => `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}${getQueryParams({ programLectureId, courseLectureId })}`,

  lectureCardOverview: (
    collegeId: string, cubeId: string, lectureCardId: string,
    { programLectureId, courseLectureId }: OptionalParams = {}
  ) => `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}${getQueryParams({ programLectureId, courseLectureId })}`,

};
