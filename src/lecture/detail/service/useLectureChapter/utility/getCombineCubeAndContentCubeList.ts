import { Cube } from '../../../../model/Cube';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';
import { LearningContentChildren } from '../../../../model/LearningContentChildren';

export function getCombineCubeAndContentCubeList(
  contentCubeList?: LearningContentChildren[],
  cubeList?: Cube[]
) {
  const learningContentWithCubeList: LectureChpaterCubeList[] = [];

  if (contentCubeList && cubeList) {
    for (let i = 0; i < contentCubeList.length; i++) {
      const course = {
        cubeId: cubeList[i].id,
        name: contentCubeList[i].name,
        description: contentCubeList[i].description,
        type: cubeList[i].type,
        learningTime: cubeList[i].learningTime,
      };
      learningContentWithCubeList.push(course);
    }
  }

  return learningContentWithCubeList;
}
