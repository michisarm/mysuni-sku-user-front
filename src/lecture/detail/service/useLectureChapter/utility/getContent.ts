import { LearningContent } from '../../../../model/LearningContent';

export function getContents(
  learningContents: LearningContent[],
  contentId: string
) {
  const result = learningContents.find(item => {
    const slicedContentId = item.contentId.slice(-4);
    if (slicedContentId === contentId) {
      return item;
    }
  });

  return result;
}
