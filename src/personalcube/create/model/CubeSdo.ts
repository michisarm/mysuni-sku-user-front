import { CubeCategory } from "../../../shared/model/CubeCategory";
import DifficultyLevel from "../../../lecture/detail/model/DifficultyLevel";
import { Description } from "../../personalcube/model/Description";
import { CubeMaterialSdo } from "./CubeMaterialSdo";
import CubeType from "../../../lecture/detail/model/CubeType";

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
  type: 'Video',
  categories: [],
  sharingCineroomIds: [],
  tags: [],
};

export function getEmptyRequiredField(cubeSdo: CubeSdo) {
  return 'success';
}