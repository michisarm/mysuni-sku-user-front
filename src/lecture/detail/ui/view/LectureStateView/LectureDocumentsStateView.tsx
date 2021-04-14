import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileDownloadPop from '../../../../../personalcube/shared/OverviewField/sub/FileDownloadPop';
import Student from '../../../../model/Student';
import { registerStudent } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { documentDownload } from '../../../service/useActionLog/cubeStudyEvent';
import {
  completeLearning,
  startLearning,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { requestCardLectureStructure } from '../../../service/useLectureStructure/utility/requestCardLectureStructure';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { getActiveCubeStructureItem } from '../../../utility/lectureStructureHelper';
import LectureState from '../../../viewModel/LectureState';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import LectureWebpage from '../../../viewModel/LectureWebpage';

const DOWNLOAD = '다운로드';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';
const WAIT = '학습예정';

const actionClassName = 'bg';

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
  useEffect(() => {
    const params = getLectureParams();
    if (params?.cubeId !== undefined) {
      registerStudent({
        cardId: params.cardId,
        cubeId: params.cubeId,
        round: 1,
      }).then(() => {
        requestCardLectureStructure(params.cardId);
      });
    }
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
  pathname: string;
  student: Student;
  lectureStructure: LectureStructure;
  hookAction: () => void;
}

function ApprovedView(props: ApprovedViewProps) {
  const { student, hookAction, lectureStructure, pathname } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    if (student.learningState === null) {
      return WAIT;
    }
    return PROGRESS;
  }, [student]);
  const actionText = useMemo<string>(() => {
    const cubeItem = getActiveCubeStructureItem(pathname);
    if (
      cubeItem !== undefined &&
      cubeItem.report === undefined &&
      cubeItem.test === undefined
    ) {
      return COMPLETE;
    }
    return PROGRESS;
  }, [lectureStructure]);
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
    if (
      (cubeDetail.cube.reportName === null ||
        cubeDetail.cube.reportName === '') &&
      !cubeDetail.cube.hasTest
    ) {
      completeLearning();
    }
  }, []);
  const stateClassName = useMemo(() => {
    const { learningState } = student;
    switch (learningState) {
      case 'Passed':
        return 'complete';
      default:
        break;
    }
    return 'bg2';
  }, [student]);

  return (
    <>
      {student.learningState !== 'Passed' && (
        <button
          className={`ui button free bg2 p18`}
          onClick={action}
          id="ACTION"
        >
          {actionText}
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
  lectureStructure: LectureStructure;
}

const LectureDocumentsStateView: React.FC<LectureDocumentsStateViewProps> = function LectureDocumentsStateView({
  lectureState,
  lectureWebpage,
  lectureStructure,
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

  const { pathname } = useLocation();

  return (
    <>
      {(student === undefined || student?.proposalState === 'Canceled') && (
        <CanceledView hookAction={hookAction} />
      )}
      {student?.proposalState === 'Approved' && (
        <ApprovedView
          pathname={pathname}
          hookAction={hookAction}
          student={student}
          lectureStructure={lectureStructure}
        />
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
