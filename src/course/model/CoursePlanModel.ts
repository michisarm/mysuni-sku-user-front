import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName, NameValueList, CategoryModel, CreatorModel, IconBox } from 'shared';
import { CourseOperatorModel } from './CourseOperatorModel';
import { CourseOpenModel } from '../../shared/model/CourseOpenModel';
import { StampModel } from './StampModel';
import { ReportFileBoxModel } from './ReportFileBoxModel';
import { OpenRequestModel } from './OpenRequestModel';
import { CoursePlanCdoModel } from './CoursePlanCdoModel';

export class CoursePlanModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  coursePlanId: string = '';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  name: string = '';
  contentsId: string = '';
  courseOperator: CourseOperatorModel = new CourseOperatorModel();
  iconBox: IconBox = new IconBox();
  courseOpen: CourseOpenModel = new CourseOpenModel();
  feedbackId: string = '';
  reportFileBox: ReportFileBoxModel = new ReportFileBoxModel();
  stamp: StampModel = new StampModel();
  creator: CreatorModel = new CreatorModel();
  time: number = 0;
  openRequests: OpenRequestModel[] = [];

  constructor(coursePlan?: CoursePlanModel) {
    if (coursePlan) {
      const category = coursePlan.category && new CategoryModel(coursePlan.category) || this.category;
      const courseOperator = coursePlan.courseOperator && new CourseOperatorModel(coursePlan.courseOperator) || this.courseOperator;
      const iconBox = coursePlan.iconBox && new IconBox(coursePlan.iconBox) || this.iconBox;
      const courseOpen = coursePlan.courseOpen && new CourseOpenModel(coursePlan.courseOpen) || this.courseOpen;
      const reportFileBox = coursePlan.reportFileBox && new ReportFileBoxModel(coursePlan.reportFileBox) || this.reportFileBox;
      const stamp = coursePlan.stamp && new StampModel(coursePlan.stamp) || this.stamp;
      const creator = coursePlan.creator && new CreatorModel(coursePlan.creator) || this.creator;

      Object.assign(this, { ...coursePlan, category, courseOperator, iconBox, courseOpen, reportFileBox, stamp, creator });
    }
  }

  static  asNameValues(coursePlan: CoursePlanModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'name',
          value: coursePlan.name,
        },
        {
          name: 'courseOperator',
          value: JSON.stringify(coursePlan.courseOperator),
        },
        {
          name: 'courseOpen',
          value: JSON.stringify(coursePlan.courseOpen),
        },
        {
          name: 'category',
          value: JSON.stringify(coursePlan.category),
        },
        {
          name: 'subCategories',
          value: JSON.stringify(coursePlan.subCategories),
        },
        {
          name: 'reportFileBox',
          value: JSON.stringify(coursePlan.reportFileBox),
        },
        {
          name: 'openRequests',
          value: JSON.stringify(coursePlan.openRequests),
        },
        // {
        //   name: 'contentsId',
        //   value: coursePlan.contentsId,
        // },
        //
        // {
        //   name: 'iconBox',
        //   value: JSON.stringify(coursePlan.iconBox),
        // },
        // {
        //   name: 'feedbackId',
        //   value: coursePlan.feedbackId,
        // },
        // {
        //   name: 'stamp',
        //   value: JSON.stringify(coursePlan.stamp),
        // },
      ],
    };

    return asNameValues;
  }

  static isBlank(coursePlan: CoursePlanModel) : string {
    // if (!coursePlan.channel) return '대표 카테고리';
    // if (!coursePlan.channel.channel) return '대표 카테고리';
    // if (!coursePlan.channel.college) return '대표 카테고리';
    // if (!coursePlan.channelList) return '서브 카테고리';
    // if (!coursePlan.channelList.channels.length) return '서브 카테고리';
    // if (!coursePlan.name) return 'Course명';
    // if (!coursePlan.stamp) return 'Stamp 발급 여부';
    return 'success';
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

  static asCdo(coursePlan: CoursePlanModel): CoursePlanCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        category: coursePlan.category,
        subCategories: coursePlan.subCategories,
        name: coursePlan.name,
        contentsId: coursePlan.contentsId,
        courseOperator: coursePlan.courseOperator,
        iconBox: coursePlan.iconBox,
        courseOpen: coursePlan.courseOpen,
        reportFileBox: coursePlan.reportFileBox,
        stamp: coursePlan.stamp,
        creator: coursePlan.creator,
      }
    );
  }
}

decorate(CoursePlanModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  coursePlanId: observable,
  category: observable,
  subCategories: observable,
  name: observable,
  contentsId: observable,
  courseOperator: observable,
  iconBox: observable,
  courseOpen: observable,
  feedbackId: observable,
  reportFileBox: observable,
  stamp: observable,
  creator: observable,
  time: observable,
  openRequests: observable,
});
