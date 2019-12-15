import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName, NameValueList, CategoryModel } from 'shared';
import { CreatorModel } from './CreatorModel';
import { CubeState } from './CubeState';
import { CubeContentsModel } from './CubeContentsModel';
import { PersonalCubeCdoModel } from './PersonalCubeCdoModel';
import { SearchFilter } from './SearchFilter';
import { OpenRequest } from './OpenRequest';
import { IconBox } from './IconBox';

export class PersonalCubeModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  personalCubeId: string = '';
  name: string = '';
  creator: CreatorModel = new CreatorModel();
  contents: CubeContentsModel = new CubeContentsModel();
  cubeIntro: IdName = new IdName();
  tags: string[] = [];
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  iconBox: IconBox = new IconBox();
  cubeState: CubeState = CubeState.Created;
  searchFilter: SearchFilter = SearchFilter.SearchOff;
  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  time: number = 0;

  openRequests: OpenRequest[] = [];

  constructor(personalCube?: PersonalCubeModel) {
    if (personalCube) {
      const creator = personalCube.creator && new CreatorModel(personalCube.creator) || this.creator;
      const contents = personalCube.contents && new CubeContentsModel(personalCube.contents) || this.contents;
      const cubeIntro = personalCube.cubeIntro && new IdName(personalCube.cubeIntro) || this.cubeIntro;
      const category = personalCube.category && new CategoryModel(personalCube.category) || this.category;
      const iconBox = personalCube.iconBox && new IconBox(personalCube.iconBox) || this.iconBox;

      Object.assign(this, { ...personalCube, creator, contents, cubeIntro, category, iconBox });
    }
  }

  static isBlank(personalCubeModel: PersonalCubeModel) : string {
    if (!personalCubeModel.category.channel.name) return '대표 카테고리';
    if (!personalCubeModel.subCategories.length) return '서브 카테고리';
    if (!personalCubeModel.name) return '강좌정보';
    if (!personalCubeModel.contents.type) return '학습유형';
    return 'success';
  }

  static  asNameValues(cube: PersonalCubeModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'name',
          value: cube.name,
        },
        {
          name: 'category',
          value: JSON.stringify(cube.category),
        },
        {
          name: 'subCategories',
          value: JSON.stringify(cube.subCategories),
        },
        {
          name: 'contents',
          value: JSON.stringify(cube.contents),
        },
        {
          name: 'tags',
          value: JSON.stringify(cube.tags),
        },
        {
          name: 'openRequests',
          value: JSON.stringify(cube.openRequests),
        },
        {
          name: 'subsidiaries',
          value: JSON.stringify(cube.subsidiaries),
        },
        {
          name: 'cubeState',
          value: cube.cubeState,
        },
        {
          name: 'searchFilter',
          value: cube.searchFilter,
        },
      ],
    };

    return asNameValues;
  }

  static makeChannelsMap(channelList: CategoryModel[]) {
    const channelListMap = new Map<string, string[]>();

    channelList.map(channel => {
      if (!channelListMap.get(channel.college.name)) {
        channelListMap.set(channel.college.name, [channel.channel.name]);
      } else {
        const channelList = channelListMap.get(channel.college.name);
        if (channelList) {
          channelList.push(channel.channel.name);
          channelListMap.set(channel.college.name, channelList);
        }
      }
    });
    return channelListMap;
  }

  static asCdo(personalCube: PersonalCubeModel): PersonalCubeCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        name: personalCube.name,
        category: personalCube.category,
        subCategories: personalCube.subCategories,
        iconBox: personalCube.iconBox,
        creator: personalCube.creator,
        searchFilter: personalCube.searchFilter,
        subsidiaries: personalCube.subsidiaries,
        requiredSubsidiaries: personalCube.requiredSubsidiaries,
        contents: personalCube.contents,
        cubeIntro: personalCube.cubeIntro && personalCube.cubeIntro,
        tags: personalCube.tags,
        cubeState: personalCube.cubeState,
      }
    );
  }
}

decorate(PersonalCubeModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  personalCubeId: observable,
  name: observable,
  creator: observable,
  contents: observable,
  cubeIntro: observable,
  tags: observable,
  category: observable,
  subCategories: observable,
  iconBox: observable,
  cubeState: observable,
  searchFilter: observable,
  subsidiaries: observable,
  requiredSubsidiaries: observable,
  time: observable,
  openRequests: observable,
});

