import Category from './Category';
import Creator from './Creator';
import CubeContents from './CubeContents';
import CubeState from './CubeState';
import IconBox from './IconBox';
import IdName from './IdName';
import OpenRequest from './OpenRequest';
import SearchFilter from './SearchFilter';

export default interface PersonalCube {
  id: string;
  personalCubeId: string;
  name: string;
  category: Category;
  subCategories: Category[];
  iconBox: IconBox;
  creator: Creator;
  cubeState: CubeState;
  searchFilter: SearchFilter;
  subsidiaries: IdName[];
  requiredSubsidiaries: IdName[];
  contents: CubeContents;
  cubeIntro: IdName;
  tags: string[];
  stateUpdateDate: number;
  time: number;
  openRequests: OpenRequest[];
}
