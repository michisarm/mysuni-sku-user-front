export interface CoursePlanRdoModel {
  college: string;
  channel: string;
  stamp: string;
  courseState: string;
  searchFilter: string;
  name: string;
  creatorName: string;
  startDate: number;
  endDate: number;
  limit: number;
  offset: number;

  isPopup: boolean;
}
