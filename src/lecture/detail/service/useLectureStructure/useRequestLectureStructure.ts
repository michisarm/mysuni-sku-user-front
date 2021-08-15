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
          title: getPolyglotText('권한이 없습니다.', 'learning-권한-권한없음'),
          message: getPolyglotText(
            '본 콘텐츠는 아직 서비스 준비가 되지 않았습니다. 각 사 담당자와 협의 후, 추후 오픈하겠습니다.<br/>관련 문의는 Q&A를 이용해주시기 바랍니다.',
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
