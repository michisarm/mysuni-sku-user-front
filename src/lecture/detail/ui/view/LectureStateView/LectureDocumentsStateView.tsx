import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileDownloadPop from '../../../../../personalcube/shared/OverviewField/sub/FileDownloadPop';
import Student from '../../../../model/Student';
import {
  clearFindMyCardRelatedStudentsCache,
  registerStudent,
} from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import {
  completeLearning,
  startLearning,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { updateCardLectureStructure } from '../../../service/useLectureStructure/utility/updateCardLectureStructure';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { getActiveCubeStructureItem } from '../../../utility/lectureStructureHelper';
import LectureState from '../../../viewModel/LectureState';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import LectureWebpage from '../../../viewModel/LectureWebpage';
import { Action, ActionType, Area } from 'tracker/model';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

const DOWNLOAD = getPolyglotText('다운로드', 'CollageState-Document-다운로드');
const PROGRESS = getPolyglotText('학습중', 'CollageState-Document-학습중');
const COMPLETE = getPolyglotText('학습완료', 'CollageState-Document-학습완료');
const WAIT = getPolyglotText('학습예정', 'CollageState-Document-학습예정');

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
        clearFindMyCardRelatedStudentsCache();
        updateCardLectureStructure(params.cardId);
      });
    }
  }, []);
  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
        id="ACTION"
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-name={`${DOWNLOAD} 클릭`}
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
}

function ApprovedView(props: ApprovedViewProps) {
  const { student, lectureStructure, pathname } = props;
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
      {student.learningState !== 'Passed' && (
        <button
          className={`ui button free bg2 p18`}
          onClick={action}
          id="ACTION"
          data-area={
            window.location.pathname.includes('/cube')
              ? Area.CUBE_HEADER
              : Area.CARD_HEADER
          }
          data-action={Action.CLICK}
          data-action-type={ActionType.STUDY}
          data-action-name={`${actionText} 클릭`}
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
      {student?.proposalState === 'Approved' && (
        <ApprovedView
          pathname={pathname}
          student={student}
          lectureStructure={lectureStructure}
        />
      )}

      {(student === undefined ||
        student?.proposalState === 'Canceled' ||
        student.learningState === 'Passed') && (
        <CanceledView hookAction={hookAction} />
      )}
      {fileDonwloadPopShow && (
        <FileDownloadPop
          fileBoxIds={[lectureWebpage.fileBoxId]}
          onClose={closeFileDonwloadPop}
        />
      )}
    </>
  );
};

export default LectureDocumentsStateView;
