import { Cube } from '../../../../model/Cube';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';
import { LearningContentChildren } from '../../../../model/LearningContentChildren';
import { find } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export function getCombineCubeAndContentCubeList(
  contentCubeList?: LearningContentChildren[],
  discussionList?: LearningContentChildren[],
  cubeList?: Cube[]
) {
  const learningContentWithCubeList: LectureChpaterCubeList[] = [];
  if (contentCubeList && cubeList) {
    for (let i = 0; i < contentCubeList.length; i++) {
      const filterCubeList = find(cubeList, {
        id: contentCubeList[i].contentId,
      });

      const course: LectureChpaterCubeList = {
        cubeId: filterCubeList?.id || '',
        name: parsePolyglotString(contentCubeList[i].name),
        description: contentCubeList[i].description,
        type: filterCubeList?.type || 'None',
        learningTime: filterCubeList?.learningTime || 0,
        isCube: true,
      };
      learningContentWithCubeList.push(course);
    }
  }

  if (discussionList) {
    discussionList.map((item) => {
      const course: LectureChpaterCubeList = {
        cubeId: item.contentId.slice(-4),
        name: parsePolyglotString(item.name),
        description: '',
        type: 'None', // Discussion 에 해당하는 타입이 없어서 None으로 처리.
        learningTime: 0,
        isCube: false,
      };
      learningContentWithCubeList.push(course);
    });
  }

  return learningContentWithCubeList;
}
