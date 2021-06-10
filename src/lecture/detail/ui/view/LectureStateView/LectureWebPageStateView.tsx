import React, { useCallback, useMemo } from 'react';
import { Cube } from '../../../../model/Cube';
import CubeType from '../../../../model/CubeType';
import Student from '../../../../model/Student';
import {
  completeLearning,
  startLearning,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { hasNoTestAndNoReport } from '../../../utility/cubeTester';
import LectureState from '../../../viewModel/LectureState';
import { Action, ActionType, Area } from 'tracker/model';

const APPROVE = '학습하기';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';

const actionClassName = 'bg';

interface CanceledViewProps {
  cubeType: CubeType;
}

function CanceledView(props: CanceledViewProps) {
  const { cubeType } = props;
  const action = useCallback(() => {
    if (document.getElementById('webpage-link') !== null) {
      const href = document
        .getElementById('webpage-link')
        ?.getAttribute('href');
      if (href !== undefined && href !== null) {
        window.open(href, '_blank');
      }
    }
    startLearning();
  }, [cubeType]);
  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        id="ACTION"
        onClick={action}
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-name={`${APPROVE} 클릭`}
      >
        {APPROVE}
      </button>
    </>
  );
}

interface ApprovedViewProps {
  student: Student;
  cube: Cube;
  urlType: string | undefined;
}

function ApprovedView(props: ApprovedViewProps) {
  const { student, cube, urlType } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
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
      {(urlType === undefined || urlType !== 'embedded') &&
        student.learningState !== 'Passed' &&
        hasNoTestAndNoReport(cube) && (
          <button
            className={`ui button free ${actionClassName} p18`}
            onClick={completeLearning}
            id="ACTION"
            data-area={
              window.location.pathname.includes('/cube')
                ? Area.CUBE_HEADER
                : Area.CARD_HEADER
            }
            data-action={Action.CLICK}
            data-action-type={ActionType.STUDY}
            data-action-name={`${COMPLETE} 클릭`}
          >
            {COMPLETE}
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

interface LectureWebPageStateViewProps {
  lectureState: LectureState;
}

const LectureWebPageStateView: React.FC<LectureWebPageStateViewProps> = function LectureWebPageStateView({
  lectureState,
}) {
  const { student, cubeDetail, cubeType } = lectureState;
  const { cube } = cubeDetail;
  const urlType = cubeDetail.cubeMaterial.officeWeb?.urlType;

  return (
    <>
      {(student === undefined || student?.proposalState === 'Canceled') && (
        <CanceledView cubeType={cubeType} />
      )}
      {student?.proposalState === 'Approved' && (
        <ApprovedView student={student} cube={cube} urlType={urlType} />
      )}
    </>
  );
};

export default LectureWebPageStateView;
