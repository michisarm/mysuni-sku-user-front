
import { CubeState, IdName, CreatorModel, CategoryModel, SearchFilterType, IconBoxModel } from 'shared/model';
import { CubeContentsModel } from './CubeContentsModel';


export class PersonalCubeCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';

  name: string = '';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  iconBox: IconBoxModel = new IconBoxModel();
  creator: CreatorModel = new CreatorModel();
  searchFilter: SearchFilterType = SearchFilterType.SearchOff;
  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  contents: CubeContentsModel = new CubeContentsModel();
  cubeIntro: IdName = new IdName();
  tags: string[] = [];
  cubeState: CubeState = CubeState.Created;
}
