import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import { getLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import { getLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';
import React, { useCallback } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureAudioView from '../view/LectureAudioView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import WatchLog from 'lecture/detail/model/Watchlog';
import { getLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';
import { useLectureState } from 'lecture/detail/service/useLectureState/useLectureState';
import { useLectureClassroom } from 'lecture/detail/service/useLectureClassroom/useLectureClassroom';

function LectureAudioContainer() {
  useLectureMedia();

  const params = useLectureRouterParams();

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
  

  return <LectureAudioView params={params} hookAction={hookAction}/>;
}

export default LectureAudioContainer;
