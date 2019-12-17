
import { BoardService } from '@sku/personalcube';
import { PersonalCubeService } from './personalcube';

export { MyPostListPage } from './community';

export const personalCubeStores = {
  personalCube: {
    personalCubeService: PersonalCubeService.instance,
    boardService: BoardService.instance,
  },
};

export {
  PersonalCubeService,
  BoardService,
};
