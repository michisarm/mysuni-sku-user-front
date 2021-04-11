import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { setLectureStructure } from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import { requestCardLectureStructure } from './utility/requestCardLectureStructure';

export function useRequestLectureStructure() {
  const { cardId } = useParams<LectureParams>();
  const { pathname } = useLocation();
  useEffect(() => {
    if (cardId !== undefined) {
      requestCardLectureStructure(cardId);
    }
    return setLectureStructure;
  }, [cardId]);
}
