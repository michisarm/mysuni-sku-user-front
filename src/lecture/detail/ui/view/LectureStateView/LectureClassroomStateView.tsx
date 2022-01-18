import { reactAlert } from '@nara.platform/accent';
import { find } from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Action, ActionType, Area } from 'tracker/model';
import { ApplyReferenceModal } from '../../../../../approval';
import { ApprovalMemberModel } from '../../../../../approval/member/model/ApprovalMemberModel';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import ClassroomModalView from '../../../../category/ui/view/ClassroomModalView';
import CubeType from '../../../../model/CubeType';
import Student from '../../../../model/Student';
import {
  findContentProviderCache,
  findCubeDetailCache,
} from '../../../api/cubeApi';
import { findAgreement } from '../../../api/profileApi';
import { onOpenLectureAgreementModal } from '../../../service/LectureAgreementModal/useLectureAgreementModal';
import { findApplyingClassroom } from '../../../service/useLectureClassroom/utility/classroomFinders';
import {
  cancleFromCubeId,
  submitFromCubeId,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { getLectureState } from '../../../store/LectureStateStore';
import LectureClassroom, {
  Classroom,
} from '../../../viewModel/LectureClassroom';
import LectureState from '../../../viewModel/LectureState';
import { LectureAgreementModalView } from './LectureAgreementModalView';

const APPROVE = getPolyglotText('학습하기', 'CollageState-Classroom-학습하기');
const SUBMIT = getPolyglotText('신청하기', 'CollageState-Classroom-신청하기');
const CANCEL = getPolyglotText('취소하기', 'CollageState-Classroom-취소하기');
const PROGRESS = getPolyglotText('학습중', 'CollageState-Classroom-학습중');
const COMPLETE = getPolyglotText('학습완료', 'CollageState-Classroom-학습완료');
const SUBMITED = getPolyglotText('승인대기', 'CollageState-Classroom-승인대기');
const REJECTED = getPolyglotText('반려됨', 'CollageState-Classroom-반려됨');
const WAIT = getPolyglotText('학습예정', 'CollageState-Classroom-학습예정');

const actionClassName = 'bg';
const stateClassName = 'line';

interface CanceledViewProps {
  lectureClassroom: LectureClassroom;
  cubeId: string;
  cubeType: CubeType;
}

function classroomSubmit(classroom: Classroom) {
  if (classroom.enrollingAvailable && classroom.freeOfCharge.approvalProcess) {
    const messageStr = getPolyglotText(
      `본 과정은 승인권자가 승인 후 신청완료 됩니다. <br> 승인대기중/승인완료 된 과정은<br>&#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.`,
      'CollageState-Classroom-승인권자안내'
    );
    reactAlert({
      title: getPolyglotText('알림', 'CollageState-Classroom-알림'),
      message: messageStr,
    });
  } else if (!classroom.freeOfCharge.approvalProcess) {
    const messageStr = getPolyglotText(
      `본 과정 신청이 완료 되었습니다. <br> &#39;Learning>학습예정&#39;에서 확인하실 수 있습니다.`,
      'CollageState-Classroom-신청완료안내'
    );
    reactAlert({
      title: getPolyglotText('알림', 'CollageState-Classroom-알림'),
      message: messageStr,
    });
  }
}

function CanceledView(props: CanceledViewProps) {
  const ClassroomModalViewRef = useRef<ClassroomModalView>(null);
  const applyReferenceModalRef = useRef<ApplyReferenceModal>(null);
  const lectureState = getLectureState();
  const organizedId = lectureState?.cubeDetail.cubeContents.organizerId || '';

  const { lectureClassroom, cubeId, cubeType } = props;

  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  /* eslint-disable */
  const action = useCallback(async () => {
    const classroom = await findApplyingClassroom(cubeId);
    const contentProvider = await findContentProviderCache(organizedId);

    if (classroom === undefined) {
      reactAlert({
        title: getPolyglotText(
          '수강신청 기간 안내',
          'CollageState-Classroom-수강신청기간안내'
        ),
        message: getPolyglotText(
          '수강신청 기간이 아닙니다.',
          'CollageState-Classroom-기간x'
        ),
      });
      return;
    }

    if (contentProvider?.pisAgree === false) {
      return ClassroomModalViewRef.current?.show();
    }

    const cubeDetail = await findCubeDetailCache(cubeId);
    if (cubeDetail !== undefined) {
      const isExistAgreement = await findAgreement(
        cubeDetail.cubeContents.organizerId
      );

      // 제출한 동의서가 없는 경우
      if (isExistAgreement === undefined) {
        onOpenLectureAgreementModal();
      } else {
        // 제출한 동의서가 있지만 동의하지 않은 경우
        if (
          find(isExistAgreement.optionalClauseAgreements, { accepted: false })
        ) {
          onOpenLectureAgreementModal();
          return;
        }

        return ClassroomModalViewRef.current?.show();
      }
    }
  }, [cubeId]);

  /* eslint-enable */
  const onClassroomSelected = useCallback(
    async (selected: Classroom) => {
      if (
        selected.enrollingAvailable &&
        selected.freeOfCharge.approvalProcess &&
        applyReferenceModalRef.current !== null
      ) {
        setSelectedClassroom(selected);
        applyReferenceModalRef.current.onOpenModal();
      } else {
        classroomSubmit(selected);
        const errCode = await submitFromCubeId(
          cubeId,
          cubeType,
          selected.round
        );

        errCode && alertErrorMessage(errCode);
      }
    },
    [cubeId, cubeType]
  );
  const onApply = useCallback(
    async (member: ApprovalMemberModel) => {
      if (selectedClassroom !== null) {
        // 22-01-18 학습 신청 실패 모달 추가(추후 다국어 데이터 추가 필요)
        classroomSubmit(selectedClassroom);
        const errCode = await submitFromCubeId(
          cubeId,
          cubeType,
          selectedClassroom.round,
          true,
          member.id
        );

        errCode && alertErrorMessage(errCode);
      }
    },
    [selectedClassroom, cubeId, cubeType]
  );

  const alertErrorMessage = (errCode: string) => {
    let errMessage = '';

    switch (errCode) {
      case 'limitationIsOver':
        errMessage = getPolyglotText(
          '정원 초과로 신청이 불가능합니다.',
          'card-신청실패-err1'
        );
        break;
      case 'AlreadyRegisteredInOtherRound':
        errMessage = getPolyglotText(
          '이미 다른 차수에 신청한 이력이 있습니다.',
          'card-신청실패-err2'
        );
        break;
      default:
        errMessage = '';
    }

    errMessage &&
      reactAlert({
        title: getPolyglotText('알림', 'card-신청실패-title'),
        message: errMessage,
      });
  };
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
      <LectureAgreementModalView
        onShowClassroomModal={ClassroomModalViewRef.current?.show}
      />
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-name={`${SUBMIT} ${getPolyglotText(
          '클릭',
          'CollageState-Classroom-클릭'
        )}`}
      >
        {SUBMIT}
      </button>
    </>
  );
}

function SubmittedView(props: Pick<CanceledViewProps, 'cubeId' | 'cubeType'>) {
  const { cubeId, cubeType } = props;

  const onCancled = useCallback(() => {
    cancleFromCubeId(cubeId, cubeType);
  }, [cubeId, cubeType]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={onCancled}
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-name={`${CANCEL} ${getPolyglotText(
          '클릭',
          'CollageState-Classroom-클릭'
        )}`}
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

  const onCancled = useCallback(() => {
    cancleFromCubeId(cubeId, cubeType);
  }, [cubeId, cubeType]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={onCancled}
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-name={`${CANCEL} ${getPolyglotText(
          '클릭',
          'CollageState-Classroom-클릭'
        )}`}
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
  }, []);
  return (
    <>
      {student.learningState !== null && (
        <button
          className="ui button free bg p18"
          onClick={action}
          data-area={
            window.location.pathname.includes('/cube')
              ? Area.CUBE_HEADER
              : Area.CARD_HEADER
          }
          data-action={Action.CLICK}
          data-action-type={ActionType.STUDY}
          data-action-external-link={(
            document.getElementById('webpage-link') as HTMLAnchorElement
          )?.href?.toString()}
          data-action-name={`${APPROVE} ${getPolyglotText(
            '클릭',
            'CollageState-Classroom-클릭'
          )}`}
        >
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

const LectureClassroomStateView: React.FC<LectureClassroomStateViewProps> =
  function LectureClassroomStateView({ lectureState, lectureClassroom }) {
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
      if (
        lectureState.cubeType === 'ELearning' ||
        lectureState.cubeType === 'ClassRoomLecture'
      ) {
        return <ApprovedELearningView student={student} />;
      }
      return <ApprovedView student={student} />;
    }
    return null;
  };

export default LectureClassroomStateView;
