import { IdName } from '@nara.platform/accent';
import CubeType from '../../model/CubeType';
import DifficultyLevel from '../../model/DifficultyLevel';
import LectureSummary from './LectureSummary';

export default interface LectureCubeSummary extends LectureSummary {
  difficultyLevel: DifficultyLevel;
  cubeType: CubeType;
  cubeId: string;
  hasPinRole: boolean;
}
