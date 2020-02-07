

const routePaths = {
  //
  instructorTab: (instructorId: string, tab: string) =>
    `/expert/instructor/${instructorId}/${tab}`,

  instructorIntroduce: (instructorId: string) =>
    routePaths.instructorTab(instructorId, 'Introduce'),

  instructorLecture: (instructorId: string) =>
    routePaths.instructorTab(instructorId, 'Lecture'),
};

export default routePaths;
