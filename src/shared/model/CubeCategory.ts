import { Category } from "./Category";

export interface CubeCategory extends Category {
  mainCategory: boolean;
}

export const initialCubeCategory = {
  collegeId: '',
  channelId: '',
  mainCategory: false,
}