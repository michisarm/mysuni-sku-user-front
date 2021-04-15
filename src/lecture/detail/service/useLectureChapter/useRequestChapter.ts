import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestChapter } from './requestChapter';
import { setLearningContent } from '../../store/LearningContentStore';
import { setLearningContentCube } from '../../store/LearningContentCubeStore';
import { ChapterParams } from '../../model/ChapterParams';

export function useRequestChapter() {
  const params = useParams<ChapterParams>();
  const { contentId, cardId } = params;

  useEffect(() => {
    if (contentId !== undefined && cardId !== undefined) {
      requestChapter(params);
    }

    return () => {
      setLearningContent();
      setLearningContentCube();
    };
  }, [contentId, cardId]);
}
