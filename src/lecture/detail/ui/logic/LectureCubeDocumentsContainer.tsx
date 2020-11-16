import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import { getLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import { getLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';
import React, { useCallback } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import WatchLog from 'lecture/detail/model/Watchlog';
import { getLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';
import { useLectureState } from 'lecture/detail/service/useLectureState/useLectureState';
import { useLectureClassroom } from 'lecture/detail/service/useLectureClassroom/useLectureClassroom';
import { useLectureWebpage } from 'lecture/detail/service/useLectureWebpage/useLectureWebpage';
import LectureDocumentsView from '../view/LectureDocumentsView';

function LectureCubeDocumentsContainer() {
  const [lectureWebpage] = useLectureWebpage();

  const [lectureState] = useLectureState();
  
  // const ClassroomModalViewRef = useRef<ClassroomModalView>(null);
  const [lectureClassroom] = useLectureClassroom(true);
  /* eslint-disable */
  const hookAction = useCallback<() => void>(() => {
    // if (lectureClassroom !== undefined) {
    //   return ClassroomModalViewRef.current?.show();
    // }
    
    if (lectureState !== undefined && lectureState.action !== undefined) {
      return lectureState.action();
    }
  }, [lectureState, lectureClassroom]);
  /* eslint-enable */
  const params = useLectureRouterParams();

 
  return (
      <>
        {(lectureWebpage && <LectureDocumentsView fileBoxId = {lectureWebpage.fileBoxId} hookAction={hookAction} learningState={lectureState?.learningState} params={params} />)}
      </>
    )
}

export default LectureCubeDocumentsContainer;
