interface Precourese {
  isRequired: boolean;
  name: string;
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
}

export default interface LecturePrecourse {
  courses: Precourese[];
  path: string;
}
