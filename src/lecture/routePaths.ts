
export default {
  lectureOverview: (collegeId: string, cubeId: string, lectureCardId: string) =>
    `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`,

  courseOverview: (collegeId: string, coursePlanId: string, courseId: string) =>
    `/lecture/college/${collegeId}/course-`,
};
