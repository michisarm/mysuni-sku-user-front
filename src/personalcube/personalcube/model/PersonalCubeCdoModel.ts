import { IdName } from 'shared';
import { CreatorModel } from './CreatorModel';
import { CubeContentsModel } from './CubeContentsModel';
import { CategoryModel } from '../../../shared/model/CategoryModel';
import { IconBox } from './IconBox';
import { CubeState } from './CubeState';
import { SearchFilter } from './SearchFilter';

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
