import React, { useCallback } from 'react';
import LectureState from '../../viewModel/LectureState';

interface LectureStateViewProps {
  lectureState: LectureState;
}

interface LectureStateViewInnerState {
  canAction: boolean;
  actionText: string;
  action?: () => void;
  stateText: string;
  subStateVisible: boolean;
  subStateText: string;
}

function parseProps({
  lectureState,
}: {
  lectureState: LectureState;
}): LectureStateViewInnerState | void {
  let canAction: boolean = true;
  if (
    (lectureState.type === 'WebPage' ||
      lectureState.type === 'ClassRoomLecture') &&
    lectureState.proposalState !== 'Approved'
  ) {
    canAction = false;
  }

  // let actionText = '학습하기';
}

const LectureStateView: React.FC<LectureStateViewProps> = function LectureStateView({
  lectureState,
}) {
  const {
    hideAction,
    hideState,
    canAction,
    actionText,
    action,
    stateText,
  } = lectureState;
  const returnA = useCallback(() => 'a', []);

  return (
    <>
      {!hideAction && (
        <button
          className="ui button free bg p18"
          onClick={canAction ? action : undefined}
        >
          {actionText}
        </button>
      )}
      {!hideState && (
        <button className="ui button free line p18">{stateText}</button>
      )}
    </>
  );
};

export default LectureStateView;
