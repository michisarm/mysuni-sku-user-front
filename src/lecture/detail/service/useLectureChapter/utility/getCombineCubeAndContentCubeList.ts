import { Cube } from '../../../../model/Cube';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';
import { LearningContentChildren } from '../../../../model/LearningContentChildren';
import { isEmpty } from 'lodash';

export function getCombineCubeAndContentCubeList(
  contentCubeList?: LearningContentChildren[],
  discussionList?: LearningContentChildren[],
  cubeList?: Cube[]
) {
  const learningContentWithCubeList: LectureChpaterCubeList[] = [];

  if (contentCubeList && cubeList) {
    for (let i = 0; i < contentCubeList.length; i++) {
      const course: LectureChpaterCubeList = {
        cubeId: cubeList[i].id,
        name: contentCubeList[i].name,
        description: contentCubeList[i].description,
        type: cubeList[i].type,
        learningTime: cubeList[i].learningTime,
      };
      learningContentWithCubeList.push(course);
    }
  }

  if (discussionList) {
    discussionList.map(item => {
      const course: LectureChpaterCubeList = {
        cubeId: item.contentId.slice(-4),
        name: item.name,
        description: '',
        type: 'None', // Discussion 에 해당하는 타입이 없어서 None으로 처리.
        learningTime: 0,
      };
      learningContentWithCubeList.push(course);
    });
  }

  return learningContentWithCubeList;
}
