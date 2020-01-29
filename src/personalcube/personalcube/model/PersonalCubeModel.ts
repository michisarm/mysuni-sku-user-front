
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';

import { CategoryModel, CreatorModel, CubeState, IconBox, IdName, NameValueList, SearchFilter } from 'shared';
import { CubeContentsModel } from './CubeContentsModel';
import { PersonalCubeCdoModel } from './PersonalCubeCdoModel';
import { OpenRequest } from './OpenRequest';


export class PersonalCubeModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  personalCubeId: string = '';
  name: string = '';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  iconBox: IconBox = new IconBox();
  creator: CreatorModel = new CreatorModel();
  cubeState: CubeState = CubeState.Created;
  searchFilter: SearchFilter = SearchFilter.SearchOff;

  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  contents: CubeContentsModel = new CubeContentsModel();
  cubeIntro: IdName = new IdName();
  tags: string[] = [];
  time: number = 0;

  openRequests: OpenRequest[] = [];


  //UI
  required: boolean = false;

  constructor(personalCube?: PersonalCubeModel) {
    if (personalCube) {
      const creator = personalCube.creator && new CreatorModel(personalCube.creator) || this.creator;
      const contents = personalCube.contents && new CubeContentsModel(personalCube.contents) || this.contents;
      const cubeIntro = personalCube.cubeIntro && new IdName(personalCube.cubeIntro) || this.cubeIntro;
      const category = personalCube.category && new CategoryModel(personalCube.category) || this.category;
      const iconBox = personalCube.iconBox && new IconBox(personalCube.iconBox) || this.iconBox;

      Object.assign(this, { ...personalCube, creator, contents, cubeIntro, category, iconBox });

      // UI Model
      const companyCode = patronInfo.getPatronCompanyCode();

      this.required = personalCube.requiredSubsidiaries
        && personalCube.requiredSubsidiaries.some((subsidiary) => subsidiary.id === companyCode);
    }
  }

  static getBlankRequiredField(personalCubeModel: PersonalCubeModel) : string {
    //
    if (!personalCubeModel.category.channel.name) return '메인채널';
    if (!personalCubeModel.subCategories.length) return '서브채널';
    if (!personalCubeModel.name) return '강좌정보';
    if (personalCubeModel.tags.length > 10) return '태그는 10개까지 입력 가능합니다.';
    if (personalCubeModel.contents.type === 'None') return '교육형태';
    return 'success';
  }

  static asNameValues(cube: PersonalCubeModel): NameValueList {
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
          name: 'iconBox',
          value: JSON.stringify(cube.iconBox),
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
          name: 'requiredSubsidiaries',
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

  static makeChannelsIdNameMap(channelList: CategoryModel[]) {
    const channelListMap = new Map<IdName, IdName[]>();

    channelList.map(channel => {
      if (!channelListMap.get(channel.college)) {
        channelListMap.set(channel.college, [channel.channel]);
      } else {
        const channelList = channelListMap.get(channel.college);
        if (channelList) {
          channelList.push(channel.channel);
          channelListMap.set(channel.college, channelList);
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
        requiredSubsidiaries: personalCube.subsidiaries,
        contents: personalCube.contents,
        cubeIntro: personalCube.cubeIntro && personalCube.cubeIntro,
        tags: personalCube.tags,
        cubeState: personalCube.cubeState,
      }
    );
  }

  static getSubCategoriesGroupByCollege(personalCube: PersonalCubeModel): CategoryModel[][] {
    //
    const collegeMap: Map<string, CategoryModel[]> = new Map();
    const subCategories = personalCube.subCategories;

    subCategories.map((subCategory) => {
      //
      const collegeChannels = collegeMap.get(subCategory.college.id);

      if (collegeChannels) {
        collegeChannels.push(subCategory);
      }
      else {
        collegeMap.set(subCategory.college.id, [subCategory]);
      }
    });

    return Array.from(collegeMap.values());
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
  required: observable,
});

