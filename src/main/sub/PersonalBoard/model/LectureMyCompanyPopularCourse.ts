export interface MyCompanyPopularCourseItem {
  category: CourseItemCategory,
  companyCode: string,
  companyName: string,
  count: number,
  date: string,
  id: string,
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