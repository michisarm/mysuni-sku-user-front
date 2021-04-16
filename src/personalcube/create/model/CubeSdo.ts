import { CubeCategory } from "../../../shared/model/CubeCategory";
import DifficultyLevel from "../../../lecture/detail/model/DifficultyLevel";
import { Description } from "../../personalcube/model/Description";
import { CubeMaterialSdo } from "./CubeMaterialSdo";
import CubeType from "../../../lecture/detail/model/CubeType";
import { getMainCategory } from "./CreateCubeDetail";
import { DenizenKey, reactAlert } from "@nara.platform/accent";
import { patronInfo } from "@nara.platform/dock";
import { useCallback } from "react";


export interface CubeSdo {
  name: string;
  type: CubeType;
  categories: CubeCategory[];
  tags: string[];
  learningTime: number;
  difficultyLevel: DifficultyLevel;
  description: Description;
  organizerId: string;
  otherOrganizerName?: string;
  fileBoxId?: string;
  materialSdo?: CubeMaterialSdo;
}

export const initialCubeSdo: CubeSdo = {
  name: '',
  type: 'None',
  categories: [],
  tags: [],
  learningTime: 0,
  difficultyLevel: 'Basic',
  description: {
    applicants: '',
    completionTerms: '',
    description: '',
    goal: '',
    guide: '',
  },
  organizerId: '',
  otherOrganizerName: '',
  fileBoxId: '',
};

export function getBlankRequiredCubeField(cubeSdo: CubeSdo) {
  const mainCategory = getMainCategory(cubeSdo.categories);

  if (!cubeSdo.name) return '강좌정보';
  if (!mainCategory) return '메인채널';
  if (cubeSdo.tags.length > 10) {
    return '태그는 10개까지 입력 가능합니다.';
  }
  if (cubeSdo.type === 'None') return '교육형태';
  if (!cubeSdo.description?.goal) return '교육목표';
  if (!cubeSdo.description?.applicants) return '교육대상';
  if (!cubeSdo.description?.description) return '교육내용';
  if (!cubeSdo.learningTime) return '교육시간';
  if (!cubeSdo.difficultyLevel) return '난이도';
  if (!cubeSdo.organizerId) return '교육기관/출처';

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

export const alertRequiredField = (message: string) => {
  reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
};
