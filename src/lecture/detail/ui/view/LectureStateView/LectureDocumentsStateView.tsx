import React, { useCallback, useMemo, useState } from 'react';
import FileDownloadPop from '../../../../../personalcube/shared/OverviewField/sub/FileDownloadPop';
import Student from '../../../../model/Student';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { documentDownload } from '../../../service/useActionLog/cubeStudyEvent';
import {
  completeLearning,
  startLearning,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { getLectureParams } from '../../../store/LectureParamsStore';
import LectureState from '../../../viewModel/LectureState';
import LectureWebpage from '../../../viewModel/LectureWebpage';

const DOWNLOAD = '다운로드';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const WAIT = '학습예정';

const actionClassName = 'bg';
const stateClassName = 'line';

interface CanceledViewProps {
  hookAction: () => void;
}

function CanceledView(props: CanceledViewProps) {
  const { hookAction } = props;
  /* eslint-disable */
  const action = useCallback(async () => {
    hookAction();
    startLearning();
  }, []);
  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
        id="ACTION"
      >
        {DOWNLOAD}
      </button>
    </>
  );
}

interface ApprovedViewProps {
  student: Student;
  hookAction: () => void;
}

function ApprovedView(props: ApprovedViewProps) {
  const { student, hookAction } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    if (student.learningState === null) {
      return WAIT;
    }
    return PROGRESS;
  }, [student]);
  const action = useCallback(async () => {
    hookAction();
    const params = getLectureParams();
    if (params?.cubeId === undefined) {
      return;
    }
    const cubeDetail = await findCubeDetailCache(params.cubeId);
    if (cubeDetail === undefined) {
      return;
    }
    if (cubeDetail.cube.reportName === null && !cubeDetail.cube.hasTest) {
      completeLearning();
    }
  }, []);

  return (
    <>
      {student.learningState !== 'Passed' && (
        <button
          className={`ui button free bg2 p18`}
          onClick={action}
          id="ACTION"
        >
          {DOWNLOAD}
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

interface LectureDocumentsStateViewProps {
  lectureState: LectureState;
  lectureWebpage: LectureWebpage;
}

const LectureDocumentsStateView: React.FC<LectureDocumentsStateViewProps> = function LectureDocumentsStateView({
  lectureState,
  lectureWebpage,
}) {
  const { student } = lectureState;

  const [fileDonwloadPopShow, setFileDonwloadPopShow] = useState<boolean>(
    false
  );
  const closeFileDonwloadPop = useCallback(() => {
    setFileDonwloadPopShow(false);
  }, []);

  const hookAction = useCallback(() => {
    setFileDonwloadPopShow(true);
  }, []);

  return (
    <>
      {(student === undefined || student?.proposalState === 'Canceled') && (
        <CanceledView hookAction={hookAction} />
      )}
      {student?.proposalState === 'Approved' && (
        <ApprovedView hookAction={hookAction} student={student} />
      )}
      {fileDonwloadPopShow && (
        <FileDownloadPop
          fileBoxIds={[lectureWebpage.fileBoxId]}
          onClose={closeFileDonwloadPop}
          onDownloadStart={documentDownload}
        />
      )}
    </>
  );
};

export default LectureDocumentsStateView;
