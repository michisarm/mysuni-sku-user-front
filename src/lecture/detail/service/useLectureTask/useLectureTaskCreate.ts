import {
  onLectureTaskCreateBoardId,
  onLectureTaskCreateItem,
  setLectureTaskCreateItem,
} from 'lecture/detail/store/LectureTaskCreateStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import { useEffect, useState } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { getCubeLectureTaskBoardId } from './utility/getCubeLectureTaskCreate';

type LectureTaskCreateValue = LectureTaskDetail | undefined;

let subscriberIdRef = 0;
export function useLectureTaskCreate(): [LectureTaskCreateValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskCreateValue, setTaskCreateValue] =
    useState<LectureTaskCreateValue>();

  const params = useLectureParams();

  useEffect(() => {
    if (params?.cubeId === undefined) {
      return;
    }
    getCubeLectureTaskBoardId(params?.cubeId);
  }, [params?.cubeId]);

  useEffect(() => {
    const next = `useLectureTaskCreate-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskCreateItem((next) => {
      setTaskCreateValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskCreateBoardId((next) => {
      if (next !== undefined) {
        setLectureTaskCreateItem({
          id: next,
          fileBoxId: '',
          title: '',
          writer: {
            employeeId: '',
            email: '',
            name: null,
            companyCode: '',
            companyName: null,
          },
          name: '',
          contents: '',
          time: 0,
          readCount: 0,
          commentFeedbackId: '',
          notice: false,
          pinned: 0, // postpinned -> number = 0
          writerPatronKeyString: '',
        });
      }
    }, subscriberId);
  }, [subscriberId]);

  return [taskCreateValue];
}
