import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Cube } from '../../../../model/Cube';
import CubeType from '../../../../model/CubeType';
import Media from '../../../../model/Media';
import Student from '../../../../model/Student';
import {
  cPLinked,
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
const stateClassName = 'line';

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
        onClick={action}
      >
        {APPROVE}
      </button>
    </>
  );
}

interface CPApprovedViewProps {
  student: Student;
  media: Media;
}

function CPApprovedView(props: CPApprovedViewProps) {
  const history = useHistory();
  const { student, media } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);
  const action = useCallback(async () => {
    const {
      mediaContents: {
        contentsProvider: { expiryDate, url },
      },
    } = media;
    if (
      moment(expiryDate)
        .endOf('day')
        .valueOf() < Date.now()
    ) {
      reactAlert({
        title: '안내',
        message:
          '해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.',
      });
      return;
    }
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.click();

    cPLinked();
  }, [media]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
      >
        {APPROVE}
      </button>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

interface LinkApprovedViewProps {
  student: Student;
  media: Media;
  cube: Cube;
}

function LinkApprovedView(props: LinkApprovedViewProps) {
  const history = useHistory();
  const { student, media, cube } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);
  const actionText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return APPROVE;
  }, [student]);
  const actionClassName = useMemo<string>(() => {
    const noTestAndNoReport = hasNoTestAndNoReport(cube);
    if (student.learningState === 'Passed' || noTestAndNoReport) {
      return 'bg2';
    }
    return 'bg';
  }, [student, cube]);
  const action = useCallback(async () => {
    const noTestAndNoReport = hasNoTestAndNoReport(cube);
    const {
      mediaContents: { linkMediaUrl },
    } = media;
    const link = document.createElement('a');
    link.setAttribute('href', linkMediaUrl);
    link.setAttribute('target', '_blank');
    link.click();
    if (student.learningState !== 'Passed' && noTestAndNoReport) {
      completeLearning();
    }
  }, [student, cube]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
        id="ACTION"
      >
        {actionText}
      </button>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

interface ApprovedViewProps {
  student: Student;
  cube: Cube;
}

function ApprovedView(props: ApprovedViewProps) {
  const { student, cube } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);

  return (
    <>
      {student.learningState !== 'Passed' && hasNoTestAndNoReport(cube) && (
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

  return (
    <>
      {(student === undefined || student?.proposalState === 'Canceled') && (
        <CanceledView cubeType={cubeType} />
      )}
      {student?.proposalState === 'Approved' && (
        <ApprovedView student={student} cube={cube} />
      )}
    </>
  );
};

export default LectureWebPageStateView;
