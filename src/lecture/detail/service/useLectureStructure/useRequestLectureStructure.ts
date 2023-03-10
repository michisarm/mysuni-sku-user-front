import { reactAlert } from '@nara.platform/accent';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getCurrentHistory } from '../../../../shared/store/HistoryStore';
import { setLectureStructure } from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import { requestCardLectureStructure } from './utility/requestCardLectureStructure';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function useRequestLectureStructure() {
  const { cardId } = useParams<LectureParams>();
  useEffect(() => {
    if (cardId !== undefined) {
      requestCardLectureStructure(cardId).catch(() => {
        reactAlert({
          title: getPolyglotText(
            '본 컨텐츠에 접근할 수 없습니다.',
            'learning-권한-권한없음'
          ),
          message: getPolyglotText(
            '보다 자세한 사항은 1:1 문의나 전화 상담(02-6323-9002)을 이용해 주세요.',
            'learning-권한-접근불가'
          ),
          onClose: () => {
            const history = getCurrentHistory();
            history?.push('/board/support/Q&A');
          },
        });
      });
    }
    return () => {
      setLectureStructure();
    };
  }, [cardId]);
}
