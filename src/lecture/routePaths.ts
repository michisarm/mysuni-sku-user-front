
export default {

  collegeLectures: (collegeId: string) =>
    `/lecture/college/${collegeId}/channels`,

  channelLectures: (collegeId: string, channelId: string) =>
    `/lecture/college/${collegeId}/channel/${channelId}`,

  courseOverview: (collegeId: string, coursePlanId: string, serviceType: string, serviceId: string) =>
    `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}`,

  lectureCardInCourseOverview: (collegeId: string, coursePlanId: string, cubeId: string, lectureCardId: string) =>
    `/lecture/college/${collegeId}/course-plan/${coursePlanId}/cube/${cubeId}/lecture-card/${lectureCardId}`,

  lectureCardOverview: (collegeId: string, cubeId: string, lectureCardId: string) =>
    `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`,

};
