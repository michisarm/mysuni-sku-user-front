import { LearningState } from '../../../../model/LearningState';
import { State } from '../../../viewModel/LectureState';

export function convertLearningStateToState(
  learningState?: LearningState
): State {
  if (learningState === undefined || learningState === null) {
    return 'None';
  }
  if (learningState === 'Passed') {
    return 'Completed';
  }

  return 'Progress';
}
