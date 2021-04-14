import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChapterParams } from '../../model/ChapterParams';
import { getLearningContent } from '../../store/LearningContentStore';
import { getLearningContentCube } from '../../store/LearningContentCubeStore';
import { LectureChpaterCubeList } from '../../viewModel/LectureChpaterCubeList';

export function useLectureCubeList() {
  const [combineCubeList, setCombineCubeList] = useState<
    LectureChpaterCubeList[]
  >([]);
  const { contentId, cardId } = useParams<ChapterParams>();
  const learningContents = getLearningContent();
  const cubeList = getLearningContentCube();

  const learningContentWithCubeList: LectureChpaterCubeList[] = [];

  useEffect(() => {
    if (learningContents && cubeList) {
      for (let i = 0; i < learningContents.children.length; i++) {
        const course = {
          name: learningContents.children[i].name,
          description: learningContents.children[i].description,
          type: cubeList[i].type,
          learningTime: cubeList[i].learningTime,
        };
        learningContentWithCubeList.push(course);
      }
    }

    setCombineCubeList(learningContentWithCubeList);
  }, [cardId, contentId]);
  // return learningContentWithCubeList;

  return combineCubeList;
}
