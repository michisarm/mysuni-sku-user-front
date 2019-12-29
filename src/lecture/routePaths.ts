
export default {

  collegeLectures: (collegeId: string) =>
    `/lecture/college/${collegeId}/channels`,

  channelLectures: (collegeId: string, channelId: string) =>
    `/lecture/college/${collegeId}/channel/${channelId}`,

  lectureOverview: (collegeId: string, cubeId: string, lectureCardId: string) =>
    `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`,

  courseOverview: (collegeId: string, coursePlanId: string, serviceType: string, serviceId: string) =>
    `/lecture/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}`,
};
