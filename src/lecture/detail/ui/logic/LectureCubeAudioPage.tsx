import React, { Fragment, useEffect } from 'react';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { requestCubeLectureMedia } from '../../service/useLectureMedia/utility/requestCubeLectureMedia';
import { setLectureMedia } from '../../store/LectureMediaStore';
import { useLectureParams } from '../../store/LectureParamsStore';
import { setTranscriptCount } from '../../store/TranscriptCountStore';
import LectureAudioContainer from './LectureAudioContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeAudioPage() {
  const params = useLectureParams();
  useEffect(() => {
    if (params?.cubeId !== undefined && params?.cubeType !== undefined) {
      requestCubeLectureMedia(params.cubeId, params.cubeType);
    }
    return () => {
      setLectureMedia();
      setTranscriptCount();
    };
  }, [params?.cubeId, params?.cubeType]);

  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureAudioContainer />
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeAudioPage;
