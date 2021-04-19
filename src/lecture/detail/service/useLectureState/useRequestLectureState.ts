import { useEffect } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { setLectureState } from '../../store/LectureStateStore';
import { requestLectureState } from './utility/requestLectureState';

export function useRequestLectureState() {
  const params = useLectureParams();
  useEffect(() => {
    if (
      params?.cardId === undefined ||
      params?.cubeId === undefined ||
      params?.cubeType === undefined
    ) {
      return;
    }
    const { cardId, cubeId, cubeType } = params;
    requestLectureState(cardId, cubeId, cubeType);
    return setLectureState;
  }, [params?.cubeId]);
}
