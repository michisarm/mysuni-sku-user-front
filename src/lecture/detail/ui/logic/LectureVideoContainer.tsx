import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import { getLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import { getLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';
import React, { useCallback, useEffect } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import WatchLog from 'lecture/detail/model/Watchlog';
import { getLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';
import { useLectureState } from 'lecture/detail/service/useLectureState/useLectureState';
import { useLectureClassroom } from 'lecture/detail/service/useLectureClassroom/useLectureClassroom';
import { useLectureStructure } from 'lecture/detail/service/useLectureStructure/useLectureStructure';

function LectureVideoContainer() {
  useLectureMedia();

  const [,,checkStudent] = useLectureMedia();
  const params = useLectureRouterParams();
  
  return <LectureVideoView params={params} checkStudent={checkStudent}/>;
}

export default LectureVideoContainer;
