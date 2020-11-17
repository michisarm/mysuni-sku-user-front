import { getLectureTaskCreateBoardId, onLectureTaskCreateBoardId, onLectureTaskCreateItem, setLectureTaskCreateItem } from 'lecture/detail/store/LectureTaskCreateStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getCubeLectureTaskBoardId } from './utility/getCubeLectureTaskCreate';

type LectureTaskCreateValue = LectureTaskDetail | undefined;

let subscriberIdRef = 0;
export function useLectureTaskCreate(
): [LectureTaskCreateValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskCreateValue, setTaskCreateValue] = useState<LectureTaskCreateValue>();

  const params = useLectureRouterParams();
  
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { contentId } = params;

    getCubeLectureTaskBoardId(contentId)
  }, [params]);

  useEffect(() => {
    const next = `useLectureTaskCreate-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskCreateItem(next => {
      setTaskCreateValue(next)

    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskCreateBoardId(next => {
      if(next !== undefined) {
        setLectureTaskCreateItem({
          id: next,
          fileBoxId: '',
          title: '',
          writer: {
            employeeId: '',
            email: '',
            name: '',
            companyCode: '',
            companyName: '',
          },
          name: '',
          contents: '',
          time: 0,
          readCount: 0,
          commentFeedbackId: '',
          notice: false,
        })
      }
    }, subscriberId);
  }, [subscriberId]);

  return [taskCreateValue];
}
