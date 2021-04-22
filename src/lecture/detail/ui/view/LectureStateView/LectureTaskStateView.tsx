import React, { useCallback, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Student from '../../../../model/Student';
import CubeType from '../../../../model/CubeType';
import { submit } from '../../../service/useLectureState/utility/cubeStateActions';
import LectureState from '../../../viewModel/LectureState';
import { reactAlert } from '@nara.platform/accent';

const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const JOIN = '작성하기';

const actionClassName = 'bg';

function CanceledView() {
  const history = useHistory();
  const action = useCallback(async () => {
    history.push('#create');
    submit(1);
  }, []);
  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
      >
        {JOIN}
      </button>
    </>
  );
}

interface ApprovedViewProps {
  student: Student;
  cubeType: CubeType;
}

function ApprovedView(props: ApprovedViewProps) {
  const history = useHistory();
  const { student, cubeType } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);
  const action = useCallback(async () => {
    history.push('#create');
  }, []);
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

  useEffect(() => {
    if (!student?.complete && 
        student.learningState === 'Progress' &&
        student?.commentCount === 0 &&
        student?.subCommentCount === 0) {
      reactAlert({
        title: '안내',
        message: `이수조건을 확인 후 학습을 진행해주세요`,
      });
    }
  }, [student.id]);

  return (
    <>
      {cubeType === 'Task' && student.learningState !== 'Passed' && (
        <button className="ui button free bg p18" onClick={action}>
          {JOIN}
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

interface LectureTaskStateViewProps {
  lectureState: LectureState;
}

const LectureTaskStateView: React.FC<LectureTaskStateViewProps> = function LectureTaskStateView({
  lectureState,
}) {
  const { student, cubeType } = lectureState;

  return (
    <>
      {(cubeType === 'Task' && (student === undefined || student?.proposalState === 'Canceled')) && (
        <CanceledView />
      )}
      {student?.proposalState === 'Approved' && (
        <ApprovedView student={student} cubeType={cubeType} />
      )}
    </>
  );
};

export default LectureTaskStateView;
