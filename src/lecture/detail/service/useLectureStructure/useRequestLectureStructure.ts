import { reactAlert } from '@nara.platform/accent';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getCurrentHistory } from '../../../../shared/store/HistoryStore';
import { setLectureStructure } from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import { requestCardLectureStructure } from './utility/requestCardLectureStructure';

export function useRequestLectureStructure() {
  const { cardId } = useParams<LectureParams>();
  useEffect(() => {
    if (cardId !== undefined) {
      requestCardLectureStructure(cardId).catch(() => {
        reactAlert({
          title: '권한 없음',
          message:
            '본 콘텐츠에 접근할 수 없습니다. 보다 상세한 문의는 Help Desk(02-6323-9002)를 이용해주세요.',
          onClose: () => {
            const history = getCurrentHistory();
            history?.replace('/pages/1');
          },
        });
      });
    }
    return () => {
      setLectureStructure();
    };
  }, [cardId]);
}
