import CubeType from '../../model/CubeType';
export interface LectureChpaterCubeList {
  cubeId: string;
  name: string | null;
  description: string | null;
  type: CubeType;
  learningTime: number;
  isCube: boolean;
}
