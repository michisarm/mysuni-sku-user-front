import React from 'react';
import { useLectureWebpage } from 'lecture/detail/service/useLectureWebpage/useLectureWebpage';
import LectureDocumentsView from '../view/LectureDocumentsView';
import { useLectureParams } from '../../store/LectureParamsStore';
import { useLectureState } from '../../store/LectureStateStore';

function LectureCubeDocumentsContainer() {
  const [lectureWebpage] = useLectureWebpage();
  const lectureState = useLectureState();

  const params = useLectureParams();

  return (
    <>
      {lectureWebpage && lectureState && (
        <LectureDocumentsView
          fileBoxId={lectureWebpage.fileBoxId}
          learningState={lectureState.student?.learningState}
          params={params}
        />
      )}
    </>
  );
}

export default LectureCubeDocumentsContainer;
