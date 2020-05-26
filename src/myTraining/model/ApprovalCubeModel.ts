
import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';

import { CategoryModel, CreatorModel, CubeState, IconBoxModel, IdName, NameValueList, SearchFilterType } from 'shared/model';
import { CubeContentsModel } from './CubeContentsModel';
import { PersonalCubeCdoModel } from './PersonalCubeCdoModel';
import { OpenRequest } from './OpenRequest';
import { FreeOfChargeModel } from './FreeOfChargeModel';
import { EnrollingModel } from './EnrollingModel';
import { OperationModel } from './OperationModel';

export class ApprovalCubeModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  personalCubeId: string = '';
  name: string = '';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  iconBox: IconBoxModel = new IconBoxModel();
  creator: CreatorModel = new CreatorModel();
  cubeState: CubeState = CubeState.Created;
  searchFilter: SearchFilterType = SearchFilterType.SearchOff;

  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  contents: CubeContentsModel = new CubeContentsModel();
  cubeIntro: IdName = new IdName();
  tags: string[] = [];
  time: number = 0;

  openRequests: OpenRequest[] = [];


  //UI
  required: boolean = false;

  studentId: string = '';
  rollBookId: string = '';
  classroomId: string = '';
  memberName: string = '';
  memberDepartment: string = '';
  cubeName: string = '';

  round: number = 0;
  studentCount: number = 0;
  capacity: number = 0;

  freeOfCharge: FreeOfChargeModel = new FreeOfChargeModel();
  operation: OperationModel = new OperationModel();
  enrolling: EnrollingModel = new EnrollingModel();                     // 신청/취소/학습 기간/신청유무
  lectureCardId: String = '';
  cubeType: String = '';
  proposalState: String = '';
  remark: String = '';

  constructor(approvalCube?: ApprovalCubeModel) {
    if (approvalCube) {
      const creator = approvalCube.creator && new CreatorModel(approvalCube.creator) || this.creator;
      const contents = approvalCube.contents && new CubeContentsModel(approvalCube.contents) || this.contents;
      const cubeIntro = approvalCube.cubeIntro && new IdName(approvalCube.cubeIntro) || this.cubeIntro;
      const category = approvalCube.category && new CategoryModel(approvalCube.category) || this.category;
      const iconBox = approvalCube.iconBox && new IconBoxModel(approvalCube.iconBox) || this.iconBox;
      const freeOfCharge = approvalCube.freeOfCharge && new FreeOfChargeModel(approvalCube.freeOfCharge) || this.freeOfCharge;
      const operation = approvalCube.operation && new OperationModel(approvalCube.operation) || this.operation;
      const enrolling = approvalCube.enrolling && new EnrollingModel(approvalCube.enrolling) || this.enrolling;

      Object.assign(this, { ...approvalCube, creator, contents, cubeIntro, category, iconBox, freeOfCharge, operation, enrolling });

      // UI Model
      const companyCode = patronInfo.getPatronCompanyCode();

      this.required = approvalCube.requiredSubsidiaries
        && approvalCube.requiredSubsidiaries.some((subsidiary) => subsidiary.id === companyCode);
    }
  }

  static getBlankRequiredField(approvalCubeModel: ApprovalCubeModel) : string {
    //
    if (!approvalCubeModel.category.channel.name) return '메인채널';
    if (!approvalCubeModel.subCategories.length) return '서브채널';
    if (!approvalCubeModel.name) return '강좌정보';
    if (approvalCubeModel.tags.length > 10) return '태그는 10개까지 입력 가능합니다.';
    if (approvalCubeModel.contents.type === 'None') return '교육형태';
    if (approvalCubeModel.subsidiaries.length < 1) return '관계사 공개 범위';
    return 'success';
  }

  static asNameValues(cube: ApprovalCubeModel): NameValueList {
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

  static asCdo(approvalCube: ApprovalCubeModel): PersonalCubeCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        name: approvalCube.name,
        category: approvalCube.category,
        subCategories: approvalCube.subCategories,
        iconBox: approvalCube.iconBox,
        creator: approvalCube.creator,
        searchFilter: approvalCube.searchFilter,
        subsidiaries: approvalCube.subsidiaries,
        requiredSubsidiaries: approvalCube.subsidiaries,
        contents: approvalCube.contents,
        cubeIntro: approvalCube.cubeIntro && approvalCube.cubeIntro,
        tags: approvalCube.tags,
        cubeState: approvalCube.cubeState,
      }
    );
  }

  static getSubCategoriesGroupByCollege(approvalCube: ApprovalCubeModel): CategoryModel[][] {
    //
    const collegeMap: Map<string, CategoryModel[]> = new Map();
    const subCategories = approvalCube.subCategories;

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

decorate(ApprovalCubeModel, {
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

  studentId: observable,
  rollBookId: observable,
  classroomId: observable,
  memberName: observable,
  memberDepartment: observable,
  cubeName: observable,

  round: observable,
  studentCount: observable,
  capacity: observable,

  freeOfCharge: observable,
  operation: observable,
  enrolling: observable,
  lectureCardId: observable,
  cubeType: observable,
  proposalState: observable,
  remark: observable,
});

