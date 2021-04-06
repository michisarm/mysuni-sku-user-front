import { useEffect } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { setLectureState } from '../../store/LectureStateStore';
import { requestLectureState } from './utility/requestLectureState';

export function useRequestLectureState() {
  const params = useLectureParams();
  useEffect(() => {
    if (params?.cubeId === undefined || params?.cubeType === undefined) {
      return;
    }
    const { cubeId, cubeType } = params;
    requestLectureState(cubeId, cubeType);
    return setLectureState;
  }, [params?.cubeId]);
}
