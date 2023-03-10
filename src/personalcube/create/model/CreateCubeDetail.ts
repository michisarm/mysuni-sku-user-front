import { Cube } from '../../../lecture/model/Cube';
import { CubeContents } from '../../../lecture/model/CubeContents';
import { CubeMaterial } from '../../../lecture/model/CubeMaterial';
import { CubeSdo } from './CubeSdo';
import { CubeCategory } from '../../../shared/model/CubeCategory';
import { UserCube } from './UserCube';
import { OpenRequest } from './OpenRequest';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';

export interface CreateCubeDetail {
  cube: Cube;
  cubeContents: CubeContents;
  cubeMaterial: CubeMaterial;
  userCube: UserCube;
}

export function getMainCategory(categories: CubeCategory[]) {
  return categories.find((category) => category.mainCategory === true);
}

export function getSubCategories(categories: CubeCategory[]) {
  return categories.filter((category) => category.mainCategory === false);
}

export function getRemark(openRequests: OpenRequest[]) {
  if (openRequests.length > 0 && openRequests[0].response) {
    return openRequests[0].response.remark;
  }

  return '';
}

export function getCubeSdo(cubeDetail: CreateCubeDetail): CubeSdo {
  const { cube, cubeContents, cubeMaterial } = cubeDetail;
  const { media, board, officeWeb } = cubeMaterial;

  return {
    name: cube.name,
    type: cube.type,
    categories: cube.categories,
    learningTime: cube.learningTime,
    difficultyLevel: cubeContents.difficultyLevel,
    description: {
      goal: cubeContents.description.goal,
      applicants: cubeContents.description.applicants,
      description: cubeContents.description.description,
      completionTerms: cubeContents.description.completionTerms,
      guide: cubeContents.description.guide,
    },
    organizerId: cubeContents.organizerId,
    otherOrganizerName: cubeContents.otherOrganizerName,
    tags: cubeContents.tags || { en: null, ko: null, zh: null },
    fileBoxId: cubeContents.fileBoxId,
    materialSdo: {
      mediaSdo: {
        name: media?.name,
        mediaContents: media?.mediaContents,
        mediaType: media?.mediaType,
      },
      boardSdo: {
        name: board?.name,
        config: board?.config,
        learningPeriod: board?.learningPeriod,
      },
      officeWebSdo: {
        name: officeWeb?.name,
        fileBoxId: officeWeb?.fileBoxId,
        webPageUrl: officeWeb?.webPageUrl,
        learningPeriod: officeWeb?.learningPeriod,
      },
    },
    operator: cubeContents.operator,
  };
}
