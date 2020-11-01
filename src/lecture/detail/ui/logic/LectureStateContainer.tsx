import React, { useCallback, useRef } from 'react';
import { ClassroomModel } from '../../../../personalcube/classroom/model';
import ClassroomModalView from '../../../category/ui/view/ClassroomModalView';
import { useLectureClassroom } from '../../service/useLectureClassroom/useLectureClassroom';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import LectureStateView from '../view/LectureStateView';

interface Action {
  (): void;
}

function LectureStateContainer() {
  const [lectureState] = useLectureState();
  const ClassroomModalViewRef = useRef<ClassroomModalView>(null);
  const [lectureClassroom] = useLectureClassroom(true);
  const hookAction = useCallback<() => void>(() => {
    if (lectureClassroom !== undefined) {
      return ClassroomModalViewRef.current?.show();
    }
    if (lectureState !== undefined && lectureState.action !== undefined) {
      return lectureState.action();
    }
  }, [lectureState, lectureClassroom]);
  const onClassroomSelected = useCallback(
    (selected: ClassroomModel) => {
      if (
        lectureState !== undefined &&
        lectureState.classroomSubmit !== undefined &&
        selected !== undefined
      ) {
        lectureState.classroomSubmit(selected.round, selected.id);
      }
    },
    [lectureState]
  );
  return (
    <>
      {lectureState && (
        <LectureStateView lectureState={lectureState} hookAction={hookAction} />
      )}
      {lectureState?.type === 'ClassRoomLecture' && (
        <ClassroomModalView
          ref={ClassroomModalViewRef}
          classrooms={
            lectureClassroom === undefined ? [] : lectureClassroom.remote
          }
          onOk={onClassroomSelected}
        />
      )}
    </>
  );
}

export default LectureStateContainer;
