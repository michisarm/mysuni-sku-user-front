import { Cube } from "../../../lecture/model/Cube";
import { CubeContents } from "../../../lecture/model/CubeContents";
import { CubeMaterial } from "../../../lecture/model/CubeMaterial";
import { CubeSdo } from "./CubeSdo";

export interface CreateCubeDetail {
  cube: Cube;
  cubeContents: CubeContents;
  cubeMaterial: CubeMaterial;
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
    description: cubeContents.description,
    organizerId: cubeContents.organizerId,
    otherOrganizerName: cubeContents.otherOrganizerName,
    sharingCineroomIds: cube.sharingCineroomIds,
    tags: cubeContents.tags || [],
    materialSdo: {
      mediaSdo: {
        name: media?.name,
        meidaContents: media?.mediaContents,
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
      }
    },
  }
}