import React, { useCallback, useMemo } from 'react';
import { Cube } from '../../../../model/Cube';
import CubeType from '../../../../model/CubeType';
import Student from '../../../../model/Student';
import {
  experimetial,
  webPageLinked,
} from '../../../service/useActionLog/cubeStudyEvent';
import {
  completeLearning,
  startLearning,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { hasNoTestAndNoReport } from '../../../utility/cubeTester';
import LectureState from '../../../viewModel/LectureState';

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
      document.getElementById('webpage-link')?.click();
      if (cubeType === 'WebPage') {
        webPageLinked();
      }
      if (cubeType === 'Experiential') {
        experimetial();
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
