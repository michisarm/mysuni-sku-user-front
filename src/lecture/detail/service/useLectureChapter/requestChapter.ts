import { findCardCache } from '../../../detail/api/cardApi';
import { ChapterParams } from '../../model/ChapterParams';
import { getContents } from './utility/getContent';
import { getCombineCubeAndContentCubeList } from './utility/getCombineCubeAndContentCubeList';
import { findCubesByIdsCache } from '../../api/cubeApi';
import { setLearningContent } from '../../store/LearningContentStore';
import { setLearningContentCube } from '../../store/LearningContentCubeStore';
import { LearningContentChildren } from '../../../model/LearningContentChildren';

export async function requestChapter(params: ChapterParams) {
  const { cardId, contentId } = params;

  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);

  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }

  const { card, cardContents } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }

  //params id 값으로 해당 챕터 값 찾아오는 함수
  const learningContent = getContents(cardContents.learningContents, contentId);

  const cubeIds: string[] = [];
  const discussionList: LearningContentChildren[] = [];
  const cubeList: LearningContentChildren[] = [];

  learningContent?.children.map(item => {
    if (item.learningContentType === 'Cube') {
      cubeIds.push(item.contentId);
      cubeList.push(item);
    }

    if (item.learningContentType === 'Discussion') {
      discussionList.push(item);
    }
  });

  const contentCubeList = cubeList;
  const CubeDetaillList = await findCubesByIdsCache(cubeIds);

  const learningContentWithCubeList = getCombineCubeAndContentCubeList(
    contentCubeList,
    discussionList,
    CubeDetaillList
  );

  setLearningContent(learningContent);
  setLearningContentCube(learningContentWithCubeList);
}
