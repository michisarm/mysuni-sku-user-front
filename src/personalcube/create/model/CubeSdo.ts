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

export function getBlankRequiredCubeField(cubeSdo: CubeSdo) {
  const mainCategory = getMainCategory(cubeSdo.categories);

  if (!cubeSdo.name) return '강좌정보';
  if (!mainCategory) return '메인채널';
  if (cubeSdo.tags.length > 10) {
    return '태그는 10개까지 입력 가능합니다.';
  }
  if (cubeSdo.type === 'None') return '교육형태';
  if (!cubeSdo.sharingCineroomIds.length) return '관계사 공개 범위';

  return 'none';
}

export function getBlankRequiredCubeContentsField(cubeSdo: CubeSdo) {
  if (!cubeSdo.description?.goal) return '교육목표';
  if (!cubeSdo.description?.applicants) return '교육대상';
  if (!cubeSdo.description?.description) return '교육내용';
  if (!cubeSdo.learningTime) return '교육시간';
  if (!cubeSdo.difficultyLevel) return '난이도';
  if (!cubeSdo.organizerId) return '교육기관/출처';

  return 'none';
}