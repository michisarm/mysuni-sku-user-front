import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import React, { useCallback, useRef } from 'react';
import { ClassroomModel } from '../../../../personalcube/classroom/model';
import ClassroomModalView from '../../../category/ui/view/ClassroomModalView';
import { useLectureClassroom } from '../../service/useLectureClassroom/useLectureClassroom';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import { Classroom } from '../../viewModel/LectureClassroom';
import LectureStateView from '../view/LectureStateView';

function canApplyng(classrooms: Classroom[]): boolean {
  if (classrooms.length > 0) {
    // 오늘이 차수의 신청기간 내에 있는지 여부
    const filteredClassrooms = classrooms.filter(classroom => {
      const start = moment(classroom.applyingStartDate)
        .startOf('day')
        .unix();
      const end = moment(classroom.applyingEndDate)
        .endOf('day')
        .unix();
      const now = moment().unix();
      if (start < now && now < end) {
        return true;
      }
      return false;
    });
    return filteredClassrooms.length > 0;
  }
  return false;
}

function LectureStateContainer() {
  const [lectureState] = useLectureState();
  const ClassroomModalViewRef = useRef<ClassroomModalView>(null);
  const [lectureClassroom] = useLectureClassroom(true);
  /* eslint-disable */
  const hookAction = useCallback<() => void>(() => {
    if (lectureState?.classroomSubmit !== undefined) {
      if (!canApplyng(lectureClassroom?.classrooms || [])) {
        reactAlert({
          title: '수강신청 기간 안내',
          message: '수강신청 기간이 아닙니다.',
        });
        return;
      }
      return ClassroomModalViewRef.current?.show();
    }
    if (lectureState !== undefined && lectureState.action !== undefined) {
      return lectureState.action();
    }
  }, [lectureState, lectureClassroom]);
  /* eslint-enable */
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
      {lectureState?.type === 'ELearning' && (
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
