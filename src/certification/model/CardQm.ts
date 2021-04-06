import Category from "../../lecture/detail/model/Category";

export interface CardQm {
  name: string;
  category: Category;
  learningTime: number;
  stampCount: number;
  passedStudentCount: number;
  description: string;
}