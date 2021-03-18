export interface MyCompanyPopularCourseItem {
  category: CourseItemCategory,
  companyCode: string,
  count: number,
  coursePlanId: string,
  date: string,
  id: string,
  lectureName: string,
  lectureUsid: string
}

export interface CourseItemCategory {
  channel: CourseItemCategoryChannel,
  college: CourseItemCategoryCollege
}

export interface CourseItemCategoryChannel {
  id: string,
  name: string
}

export interface CourseItemCategoryCollege {
  id: string,
  name: string
}