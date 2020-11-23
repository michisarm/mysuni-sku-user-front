import React, { useCallback } from 'react';
import LectureState from '../../viewModel/LectureState';

interface LectureStateViewProps {
  lectureState: LectureState;
  hookAction: () => void;
}

const LectureStateView: React.FC<LectureStateViewProps> = function LectureStateView({
  lectureState,
  hookAction,
}) {
  const {
    hideAction,
    hideState,
    canAction,
    actionText,
    stateText,
    actionClassName,
    stateClassName,
  } = lectureState;

  return (
    <>
      {!hideAction && (
        <button
          className={`ui button free ${actionClassName} p18`}
          onClick={canAction ? hookAction : undefined}
        >
          {actionText}
        </button>
      )}
      {!hideState && (
        <button
          className={`ui button free ${stateClassName} p18`}
          style={{ cursor: 'default' }}
        >
          {stateText}
        </button>
      )}
    </>
  );
};

export default LectureStateView;
