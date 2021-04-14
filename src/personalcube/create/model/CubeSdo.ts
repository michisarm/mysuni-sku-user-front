import { CubeCategory } from "../../../shared/model/CubeCategory";
import DifficultyLevel from "../../../lecture/detail/model/DifficultyLevel";
import { Description } from "../../personalcube/model/Description";
import { CubeMaterialSdo } from "./CubeMaterialSdo";
import CubeType from "../../../lecture/detail/model/CubeType";
import { getMainCategory } from "./CreateCubeDetail";

export interface CubeSdo {
  name: string;
  type: CubeType;
  categories: CubeCategory[];
  sharingCineroomIds: string[];
  tags: string[];
  learningTime?: number;
  difficultyLevel?: DifficultyLevel;
  description?: Description;
  organizerId?: string;
  otherOrganizerName?: string;
  materialSdo?: CubeMaterialSdo;
}

export const initialCubeSdo: CubeSdo = {
  name: '',
  type: 'None',
  categories: [],
  sharingCineroomIds: [],
  tags: [],
};

export function getBlankRequiredField(cubeSdo: CubeSdo) {
  const mainCategory = getMainCategory(cubeSdo.categories);

  if (!cubeSdo.name) return '강좌정보';
  if (!mainCategory) return '메인채널';
  if (!cubeSdo.categories.length) return '서브채널';
  if (cubeSdo.tags.length > 10) {
    return '태그는 10개까지 입력 가능합니다.';
  }
  if (cubeSdo.type === 'None') return '교육형태';
  if (!cubeSdo.sharingCineroomIds.length) return '관계사 공개 범위';

  return 'success';
}