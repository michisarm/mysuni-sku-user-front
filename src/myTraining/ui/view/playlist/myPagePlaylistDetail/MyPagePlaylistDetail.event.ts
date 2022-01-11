import _ from 'lodash';
import { removeMyPlaylist } from 'playlist/data/apis';

export function phaseStepCount(phase: number, completePhase: number) {
  const phaseStepCount = _.floor((completePhase / phase) * 10);
  return phaseStepCount;
}
