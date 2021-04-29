import { reactAlert } from '@nara.platform/accent';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ApplyReferenceModal } from '../../../../../approval';
import { ApprovalMemberModel } from '../../../../../approval/member/model/ApprovalMemberModel';
import ClassroomModalView from '../../../../category/ui/view/ClassroomModalView';
import CubeType from '../../../../model/CubeType';
import Student from '../../../../model/Student';
import { findApplyingClassroom } from '../../../service/useLectureClassroom/utility/classroomFinders';
import {
  cancel,
  submit,
  submitFromCubeId,
  cancleFromCubeId,
} from '../../../service/useLectureState/utility/cubeStateActions';
import LectureClassroom, {
  Classroom,
} from '../../../viewModel/LectureClassroom';
import LectureState from '../../../viewModel/LectureState';

const APPROVE = '학습하기';
const SUBMIT = '신청하기';
const CANCEL = '취소하기';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const SUBMITED = '승인대기';
const REJECTED = '반려됨';
const WAIT = '학습예정';

const actionClassName = 'bg';
const stateClassName = 'line';

interface CanceledViewProps {
  lectureClassroom: LectureClassroom;
  cubeId: string;
  cubeType: CubeType;
}

function classroomSubmit(classroom: Classroom) {
  if (classroom.enrollingAvailable && classroom.freeOfCharge.approvalProcess) {
    const messageStr =
      '본 과정은 승인권자가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은<br>&#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
    reactAlert({ title: '알림', message: messageStr });
  } else if (!classroom.freeOfCharge.approvalProcess) {
    const messageStr =
      '본 과정 신청이 완료 되었습니다. <br> &#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.';
    reactAlert({ title: '알림', message: messageStr });
  }
}

function CanceledView(props: CanceledViewProps) {
  const ClassroomModalViewRef = useRef<ClassroomModalView>(null);
  const applyReferenceModalRef = useRef<ApplyReferenceModal>(null);

  const { lectureClassroom, cubeId, cubeType } = props;

  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  /* eslint-disable */
  const action = useCallback(async () => {
    const classroom = await findApplyingClassroom(cubeId);
    if (classroom === undefined) {
      reactAlert({
        title: '수강신청 기간 안내',
        message: '수강신청 기간이 아닙니다.',
      });
      return;
    }
    return ClassroomModalViewRef.current?.show();
  }, [cubeId]);
  /* eslint-enable */
  const onClassroomSelected = useCallback(
    (selected: Classroom) => {
      if (
        selected.enrollingAvailable &&
        selected.freeOfCharge.approvalProcess &&
        applyReferenceModalRef.current !== null
      ) {
        setSelectedClassroom(selected);
        applyReferenceModalRef.current.onOpenModal();
      } else {
        classroomSubmit(selected);
        submitFromCubeId(cubeId, cubeType, selected.round);
      }
    },
    [cubeId, cubeType]
  );
  const onApply = useCallback(
    (member: ApprovalMemberModel) => {
      if (selectedClassroom !== null) {
        classroomSubmit(selectedClassroom);
        submitFromCubeId(
          cubeId,
          cubeType,
          selectedClassroom.round,
          true,
          member.id
        );
      }
    },
    [selectedClassroom, cubeId, cubeType]
  );
  return (
    <>
      <ClassroomModalView
        ref={ClassroomModalViewRef}
        classrooms={lectureClassroom?.classrooms || []}
        onOk={onClassroomSelected}
      />
      <ApplyReferenceModal
        ref={applyReferenceModalRef}
        classrooms={lectureClassroom?.classrooms || []}
        selectedClassRoom={selectedClassroom}
        handleOk={onApply}
      />

      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
      >
        {SUBMIT}
      </button>
    </>
  );
}

function SubmittedView(props: Pick<CanceledViewProps, 'cubeId' | 'cubeType'>) {
  const { cubeId, cubeType } = props;

  const onCancled = () => {
    cancleFromCubeId(cubeId, cubeType);
  };

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={onCancled}
      >
        {CANCEL}
      </button>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {SUBMITED}
      </button>
    </>
  );
}

function RejectedView(props: Pick<CanceledViewProps, 'cubeId' | 'cubeType'>) {
  const { cubeId, cubeType } = props;

  const onCancled = () => {
    cancleFromCubeId(cubeId, cubeType);
  };

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={onCancled}
      >
        {CANCEL}
      </button>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {REJECTED}
      </button>
    </>
  );
}

interface ApprovedViewProps {
  student: Student;
}

function ApprovedView(props: ApprovedViewProps) {
  const { student } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    if (student.learningState === null) {
      return WAIT;
    }
    return PROGRESS;
  }, [student]);
  const stateClassName = useMemo(() => {
    const { learningState } = student;
    switch (learningState) {
      case 'Passed':
        return 'complete';
      default:
        break;
    }
    return 'line';
  }, [student]);
  return (
    <>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

function ApprovedELearningView(props: ApprovedViewProps) {
  const { student } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    if (student.learningState === null) {
      return WAIT;
    }
    return PROGRESS;
  }, [student]);
  const action = useCallback(() => {
    if (document.getElementById('webpage-link') !== null) {
      document.getElementById('webpage-link')?.click();
    }
  }, [student]);
  return (
    <>
      {student.learningState !== null && (
        <button className="ui button free bg p18" onClick={action}>
          {APPROVE}
        </button>
      )}
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

interface LectureClassroomStateViewProps {
  lectureState: LectureState;
  lectureClassroom: LectureClassroom;
}

const LectureClassroomStateView: React.FC<LectureClassroomStateViewProps> = function LectureClassroomStateView({
  lectureState,
  lectureClassroom,
}) {
  const {
    student,
    cubeDetail: {
      cube: { id, type },
    },
  } = lectureState;

  if (student === undefined) {
    return (
      <CanceledView
        lectureClassroom={lectureClassroom}
        cubeId={id}
        cubeType={type}
      />
    );
  }
  if (student.proposalState === 'Canceled') {
    return (
      <CanceledView
        lectureClassroom={lectureClassroom}
        cubeId={id}
        cubeType={type}
      />
    );
  }
  if (student.proposalState === 'Submitted') {
    return <SubmittedView cubeId={id} cubeType={type} />;
  }
  if (student.proposalState === 'Rejected') {
    return <RejectedView cubeId={id} cubeType={type} />;
  }
  if (student.proposalState === 'Approved') {
    if (lectureState.cubeType === 'ELearning') {
      return <ApprovedELearningView student={student} />;
    }
    return <ApprovedView student={student} />;
  }
  return null;
};

export default LectureClassroomStateView;
