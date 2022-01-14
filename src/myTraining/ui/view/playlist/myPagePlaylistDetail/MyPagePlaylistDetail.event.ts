import _ from 'lodash';

export function phaseStepCount(phase: number, completePhase: number) {
  const phaseStepCount = _.floor((completePhase / phase) * 10);
  return phaseStepCount;
}
