import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ApplyReferenceModal } from '../../../../approval';
import { ApprovalMemberModel } from '../../../../approval/member/model/ApprovalMemberModel';
import { ClassroomModel } from '../../../../personalcube/classroom/model';
import FileDownloadPop from '../../../../personalcube/shared/OverviewField/sub/FileDownloadPop';
import ClassroomModalView from '../../../category/ui/view/ClassroomModalView';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureClassroom } from '../../service/useLectureClassroom/useLectureClassroom';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import {
  setInMyLectureCdo,
  setLectureComment,
  setLectureCubeSummary,
  setLectureDescription,
  setLectureFile,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureReview,
  setLectureSubcategory,
  setLectureTags,
} from '../../store/LectureOverviewStore';
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
  const [
    selectedClassroom,
    setSelectedClassroom,
  ] = useState<ClassroomModel | null>(null);
  const params = useLectureRouterParams();
  const { contentId, lectureId } = params || { contentId: '', lectureId: '' };
  const [fileDonwloadPopShow, setFileDonwloadPopShow] = useState<boolean>(
    false
  );
  const [lectureState] = useLectureState();
  const ClassroomModalViewRef = useRef<ClassroomModalView>(null);
  const applyReferenceModalRef = useRef<any>(null);
  const [lectureClassroom] = useLectureClassroom(true);
  const closeFileDonwloadPop = useCallback(() => {
    setFileDonwloadPopShow(false);
  }, []);
  const [lectureWebpage] = useLectureWebpage();
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
    if (lectureState?.type === 'Documents') {
      setFileDonwloadPopShow(true);
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
        if (
          selected.enrolling.enrollingAvailable &&
          selected.freeOfCharge.approvalProcess
        ) {
          setSelectedClassroom(selected);
          applyReferenceModalRef.current.onOpenModal();
        } else {
          lectureState.classroomSubmit(selected);
        }
      }
    },
    [lectureState]
  );
  const onApply = useCallback(
    (member: ApprovalMemberModel) => {
      if (
        lectureState !== undefined &&
        lectureState.classroomSubmit !== undefined &&
        member !== undefined &&
        selectedClassroom !== null
      ) {
        lectureState.classroomSubmit(selectedClassroom, member);
      }
    },
    [lectureState, selectedClassroom]
  );
  useEffect(() => {
    if (lectureState === undefined) {
      return;
    }
    if (params === undefined) {
      return;
    }
    if (lectureState.type !== 'Documents') {
      return;
    }
    const { contentId, lectureId } = params;
    getCubeLectureOverview(contentId, lectureId);
    return () => {
      setLectureCubeSummary();
      setLectureDescription();
      setLectureSubcategory();
      setLectureTags();
      setLectureInstructor();
      setLecturePrecourse();
      setLectureFile();
      setLectureComment();
      setLectureReview();
      setInMyLectureCdo();
    };
  }, [lectureState, contentId, lectureId]);

  return (
    <>
      {lectureState && (
        <LectureStateView lectureState={lectureState} hookAction={hookAction} />
      )}
      {(lectureState?.type === 'ClassRoomLecture' ||
        lectureState?.type === 'ELearning') && (
        <>
          <ClassroomModalView
            ref={ClassroomModalViewRef}
            classrooms={
              lectureClassroom === undefined ? [] : lectureClassroom.remote
            }
            onOk={onClassroomSelected}
          />
          <ApplyReferenceModal
            ref={applyReferenceModalRef}
            classrooms={
              lectureClassroom === undefined ? [] : lectureClassroom.remote
            }
            selectedClassRoom={selectedClassroom}
            handleOk={onApply}
          />
        </>
      )}
      {lectureState?.type === 'Documents' && lectureWebpage !== undefined && (
        <>
          {fileDonwloadPopShow && (
            <FileDownloadPop
              fileBoxIds={[lectureWebpage.fileBoxId]}
              onClose={closeFileDonwloadPop}
            />
          )}
        </>
      )}
    </>
  );
}

export default LectureStateContainer;
