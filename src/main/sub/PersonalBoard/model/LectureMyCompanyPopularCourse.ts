import { CardCategory } from '../../../../shared/model/CardCategory';

export interface MyCompanyPopularCourseItem {
  id?: string;
  date?: string;
  companyCode?: string;
  cardId: string;
  cardName: string;
  count?: number;
  cardCategory?: CardCategory;
}

export interface CourseItemCategory {
  channel: CourseItemCategoryChannel;
  college: CourseItemCategoryCollege;
}

export interface CourseItemCategoryChannel {
  id: string;
  name: string;
}

export interface CourseItemCategoryCollege {
  id: string;
  name: string;
}
