import { CubeState, IdName, SearchFilter, CreatorModel, CategoryModel, IconBox } from 'shared';
import { CubeContentsModel } from './CubeContentsModel';

export class PersonalCubeCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';

  name: string = '';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  iconBox: IconBox = new IconBox();
  creator: CreatorModel = new CreatorModel();
  searchFilter: SearchFilter = SearchFilter.SearchOff;
  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  contents: CubeContentsModel = new CubeContentsModel();
  cubeIntro: IdName = new IdName();
  tags: string[] = [];
  cubeState: CubeState = CubeState.Created;
}
