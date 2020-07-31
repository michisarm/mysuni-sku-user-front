
import { action, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';
import {ReviewService, CommentService, CommentCountRdoModel, ReviewSummaryModel} from '@nara.drama/feedback';
import _ from 'lodash';

import { IdName, CourseState } from 'shared/model';
import CoursePlanApi from '../apiclient/CoursePlanApi';
import CoursePlanFlowApi from '../apiclient/CoursePlanFlowApi';

import { CoursePlanModel, CoursePlanContentsModel, CoursePlanFlowCdoModel } from '../../model';
import { CoursePlanFlowUdoModel } from '../../model/CoursePlanFlowUdoModel';
import { CoursePlanQueryModel } from '../../model/CoursePlanQueryModel';
import { LearningCardModel } from '../../model/LearningCardModel';
import { CourseRequestCdoModel } from '../../model/CourseRequestCdoModel';
import AnswerSheetService from '../../../survey/answer/present/logic/AnswerSheetService';
import {SurveyCaseService} from '../../../survey/stores';
import CourseLectureService from '../../../lecture/shared/present/logic/CourseLectureService';
import {LectureService} from '../../../lecture/stores';
import AnswerSheetModel from '../../../survey/answer/model/AnswerSheetModel';
import SurveyCaseModel from '../../../survey/event/model/SurveyCaseModel';
import CourseLectureModel from '../../../lecture/model/CourseLectureModel';
import LectureViewModel from '../../../lecture/model/LectureViewModel';


const tempData = {
  'coursePlan': {
    'id': 'f4c96ac6-eb00-4a5d-a615-137f1af97d97',
    'entityVersion': 2,
    'patronKey': {
      'keyString': 'r46u-r@ne1-m2-c2',
      'patronType': 'Audience',
      'denizenKey': false,
      'audienceKey': true,
      'pavilionKey': false,
      'cineroomKey': false
    },
    'coursePlanId': 'COURSE-PLAN-7w',
    'category': {
      'college': {
        'id': 'CLG00001',
        'name': 'AI'
      },
      'channel': {
        'id': 'CHN00001',
        'name': 'AI Fundamentals'
      }
    },
    'subCategories': [
      {
        'college': {
          'id': 'CLG00001',
          'name': 'AI'
        },
        'channel': {
          'id': 'CHN00001',
          'name': 'AI Fundamentals'
        }
      }
    ],
    'name': '$$ [MSJ - TRS] 선수 코스 생성',
    'contentsId': '9a013c3c-d16e-4c55-8814-d93f7b5e697d',
    'courseOperator': {
      'employeeId': 'biz_test',
      'email': 'SKCC.biz_test@sk.com',
      'name': 'bi**',
      'company': 'SKCC'
    },
    'iconBox': {
      'iconType': 'SKUniversity',
      'iconUrl': 'h1-1',
      'baseUrl': 'data:image/png;base64,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'
    },
    'courseOpen': {
      'courseState': 'Opened',
      'searchFilter': 'SearchOn',
      'subsidiaries': [
        {
          'id': 'SUPEX',
          'name': 'SUPEX추구협의회'
        },
        {
          'id': 'SK',
          'name': 'SK주식회사 홀딩스'
        },
        {
          'id': 'SKCC',
          'name': 'SK주식회사 C&C'
        },
        {
          'id': 'SKI',
          'name': 'SK이노베이션'
        },
        {
          'id': 'SKT',
          'name': 'SK텔레콤'
        },
        {
          'id': 'SKENS',
          'name': 'SK E&S'
        },
        {
          'id': 'SKHY',
          'name': 'SK하이닉스'
        },
        {
          'id': 'SKD',
          'name': 'SK디스커버리'
        },
        {
          'id': 'SKCHEM',
          'name': 'SK케미칼'
        },
        {
          'id': 'SKN',
          'name': 'SK네트웍스'
        },
        {
          'id': 'SKC',
          'name': 'SKC'
        },
        {
          'id': 'SKE',
          'name': 'SK에너지'
        },
        {
          'id': 'SKGC',
          'name': 'SK종합화학'
        },
        {
          'id': 'SKL',
          'name': 'SK루브리컨츠'
        },
        {
          'id': 'SKEC',
          'name': 'SK건설'
        },
        {
          'id': 'SKGAS',
          'name': 'SK가스'
        },
        {
          'id': 'SKB',
          'name': 'SK브로드밴드'
        },
        {
          'id': 'SKMR',
          'name': 'SK머티리얼즈'
        },
        {
          'id': 'SKSL',
          'name': 'SK실트론'
        },
        {
          'id': 'SKBP',
          'name': 'SK바이오팜'
        },
        {
          'id': 'SKBT',
          'name': 'SK바이오텍'
        },
        {
          'id': 'MCNS',
          'name': 'MCNS'
        },
        {
          'id': 'SKTS',
          'name': 'SK텔레시스'
        },
        {
          'id': 'SKCHTM',
          'name': 'SKC HT&M'
        },
        {
          'id': 'SKDND',
          'name': 'SK디앤디'
        },
        {
          'id': 'SKADV',
          'name': 'SK어드밴스드'
        },
        {
          'id': 'SKIPC',
          'name': 'SK인천석유화학'
        },
        {
          'id': 'SKTI',
          'name': 'SK트레이딩인터내셔널'
        },
        {
          'id': 'SKIE',
          'name': 'SK아이이테크놀로지'
        },
        {
          'id': 'WH',
          'name': '워커힐'
        },
        {
          'id': 'SKMAGIC',
          'name': 'SK매직'
        },
        {
          'id': 'SKTL',
          'name': 'SK텔링크'
        },
        {
          'id': 'SKR',
          'name': 'SK렌터카'
        },
        {
          'id': 'SKNX',
          'name': 'SK넥실리스'
        },
        {
          'id': 'SKPIC',
          'name': 'SKPicglobal'
        }
      ],
      'requiredSubsidiaries': [
        {
          'id': 'SUPEX',
          'name': 'SUPEX추구협의회'
        },
        {
          'id': 'SK',
          'name': 'SK주식회사 홀딩스'
        },
        {
          'id': 'SKCC',
          'name': 'SK주식회사 C&C'
        },
        {
          'id': 'SKI',
          'name': 'SK이노베이션'
        },
        {
          'id': 'SKT',
          'name': 'SK텔레콤'
        },
        {
          'id': 'SKENS',
          'name': 'SK E&S'
        },
        {
          'id': 'SKHY',
          'name': 'SK하이닉스'
        },
        {
          'id': 'SKD',
          'name': 'SK디스커버리'
        },
        {
          'id': 'SKCHEM',
          'name': 'SK케미칼'
        },
        {
          'id': 'SKN',
          'name': 'SK네트웍스'
        },
        {
          'id': 'SKC',
          'name': 'SKC'
        },
        {
          'id': 'SKE',
          'name': 'SK에너지'
        },
        {
          'id': 'SKGC',
          'name': 'SK종합화학'
        },
        {
          'id': 'SKL',
          'name': 'SK루브리컨츠'
        },
        {
          'id': 'SKEC',
          'name': 'SK건설'
        },
        {
          'id': 'SKGAS',
          'name': 'SK가스'
        },
        {
          'id': 'SKB',
          'name': 'SK브로드밴드'
        },
        {
          'id': 'SKMR',
          'name': 'SK머티리얼즈'
        },
        {
          'id': 'SKSL',
          'name': 'SK실트론'
        },
        {
          'id': 'SKBP',
          'name': 'SK바이오팜'
        },
        {
          'id': 'SKBT',
          'name': 'SK바이오텍'
        },
        {
          'id': 'MCNS',
          'name': 'MCNS'
        },
        {
          'id': 'SKTS',
          'name': 'SK텔레시스'
        },
        {
          'id': 'SKCHTM',
          'name': 'SKC HT&M'
        },
        {
          'id': 'SKDND',
          'name': 'SK디앤디'
        },
        {
          'id': 'SKADV',
          'name': 'SK어드밴스드'
        },
        {
          'id': 'SKIPC',
          'name': 'SK인천석유화학'
        },
        {
          'id': 'SKTI',
          'name': 'SK트레이딩인터내셔널'
        },
        {
          'id': 'SKIE',
          'name': 'SK아이이테크놀로지'
        },
        {
          'id': 'WH',
          'name': '워커힐'
        },
        {
          'id': 'SKMAGIC',
          'name': 'SK매직'
        },
        {
          'id': 'SKTL',
          'name': 'SK텔링크'
        },
        {
          'id': 'SKR',
          'name': 'SK렌터카'
        },
        {
          'id': 'SKNX',
          'name': 'SK넥실리스'
        },
        {
          'id': 'SKPIC',
          'name': 'SKPicglobal'
        }
      ],
      'tags': []
    },
    'reportFileBox': null,
    'stamp': {
      'stampReady': true,
      'stampCount': 1
    },
    'creator': {
      'name': 'SK**',
      'email': '',
      'company': ''
    },
    'learningTime': 10,
    'time': 1595930221052,
    'stateUpdateDate': 1595930221052,
    'openRequests': [
      {
        'time': 1595930227769,
        'response': {
          'email': '',
          'name': 'SK**',
          'remark': null,
          'accepted': true,
          'time': 1595930227769
        }
      },
      {
        'time': 1595930228371,
        'response': {
          'email': '',
          'name': 'SK**',
          'remark': null,
          'accepted': true,
          'time': 1595930228371
        }
      }
    ]
  },
  'coursePlanContents': {
    'id': '9a013c3c-d16e-4c55-8814-d93f7b5e697d',
    'entityVersion': 0,
    'patronKey': {
      'keyString': 'r46u-r@ne1-m2-c2',
      'patronType': 'Audience',
      'denizenKey': false,
      'audienceKey': true,
      'pavilionKey': false,
      'cineroomKey': false
    },
    'description': '<p>ㄹㄹㄹㄹ</p>',
    'creator': {
      'name': '',
      'email': '',
      'company': ''
    },
    'learningPeriod': {
      'zoneId': '',
      'startDate': '2020-07-28',
      'endDate': '2020-07-28',
      'valid': false
    },
    'courseSet': {
      'type': 'Card',
      'learningCardSet': {
        'cards': [
          {
            'id': 'LEARNING-CARD-sg',
            'name': '$$ [MSJ]  신규 Video 20200727',
            'sequence': 1
          }
        ],
        'prerequisiteCards': []
      },
      'programSet': {
        'cards': [],
        'courses': [],
        'prerequisitePrograms': []
      }
    },
    'surveyId': '741b636c-0c91-48b9-8d3c-a621df1a00f1',
    'surveyCaseId': '5c1876fa-1187-4531-8de3-f86e7fad4c3b',
    'testId': '9a013c3c-d16e-4c55-8814-d93f7b5e697d',
    'paperId': '20-060',
    'fileBoxId': '1v'
  },
  'answerSheet': null,
  'surveyCase': {
    'id': '5c1876fa-1187-4531-8de3-f86e7fad4c3b',
    'entityVersion': 0,
    'patronKey': {
      'keyString': 'r46u@ne1-m2',
      'patronType': 'Denizen',
      'denizenKey': true,
      'audienceKey': false,
      'pavilionKey': false,
      'cineroomKey': false
    },
    'managementNumber': null,
    'titles': {
      'defaultLanguage': 'ko',
      'langStringMap': {
        'ko': 'test11'
      }
    },
    'surveyFormId': '741b636c-0c91-48b9-8d3c-a621df1a00f1',
    'multipleRound': false,
    'time': 1595930220877,
    'roundParts': [
      {
        'id': '1c62512f-7484-4b81-8ce6-c2af5de37a29',
        'entityVersion': 1,
        'patronKey': {
          'keyString': 'r46u@ne1-m2',
          'patronType': 'Denizen',
          'denizenKey': true,
          'audienceKey': false,
          'pavilionKey': false,
          'cineroomKey': false
        },
        'round': 1,
        'descriptions': {
          'defaultLanguage': 'ko',
          'langStringMap': {}
        },
        'surveyProgress': 'Open',
        'surveyEvent': {
          'targetId': '9a013c3c-d16e-4c55-8814-d93f7b5e697d',
          'targetNames': null,
          'categoryCode': null
        },
        'period': {
          'zoneId': 'seoul',
          'startDate': '2020-01-01',
          'endDate': '2020-12-31',
          'valid': false
        },
        'operator': {
          'usid': null,
          'names': null,
          'email': null,
          'phoneNumber': null,
          'company': null
        },
        'anonymous': false,
        'targetRespondentCount': 0,
        'supportedLanguages': [],
        'time': 0,
        'surveyCaseId': '5c1876fa-1187-4531-8de3-f86e7fad4c3b'
      }
    ]
  },
  'courseLecture': {
    'id': '06c36b81-e704-4b1b-8309-a03df9b343c4',
    'entityVersion': 0,
    'patronKey': {
      'keyString': 'r46u-r@ne1-m2-c2',
      'patronType': 'Audience',
      'denizenKey': false,
      'audienceKey': true,
      'pavilionKey': false,
      'cineroomKey': false
    },
    'usid': 'C-LECTURE-3j',
    'coursePlanId': 'COURSE-PLAN-7w',
    'lectureCardUsids': [
      'LECTURE-CARD-21b'
    ],
    'reviewId': 'a877cb12-a864-495c-b1eb-ca0caf7561b3',
    'commentId': 'da83ffa6-b77c-42ac-8206-a81bf141be80',
    'studentCount': 0,
    'passedStudentCount': 0,
    'starCount': 0,
    'time': 1595930227957,
    'lectureCards': null
  },
  'lectureViews' :[
    {
      'id': '3facb0fc-0317-432c-a0aa-09bb4fb1bd17',
      'entityVersion': 1,
      'patronKey': {
        'keyString': 'r46u-r@ne1-m2-c2',
        'patronType': 'Audience',
        'pavilionKey': false,
        'cineroomKey': false,
        'denizenKey': false,
        'audienceKey': true
      },
      'serviceType': 'CARD',
      'serviceId': 'LECTURE-CARD-21e',
      'cubeId': 'CUBE-2fm',
      'coursePlanId': null,
      'name': '$$ [Cube] TS - 02',
      'cubeType': 'Video',
      'category': {
        'college': {
          'id': 'CLG00001',
          'name': 'AI'
        },
        'channel': {
          'id': 'CHN00002',
          'name': 'AI Biz. Implementation'
        }
      },
      'iconBox': null,
      'creationDate': 1595987572391,
      'learningTime': 40,
      'learningPeriod': null,
      'lectureCardUsids': null,
      'learningCardId': 'LEARNING-CARD-sj',
      'sumViewSeconds': 0,
      'learningState': null,
      'personalCube': {
        'id': '20d64312-a969-46a5-a4a8-f70e0f51a06f',
        'entityVersion': 1,
        'patronKey': {
          'keyString': 'r46u-r@ne1-m2-c2',
          'patronType': 'Audience',
          'pavilionKey': false,
          'cineroomKey': false,
          'denizenKey': false,
          'audienceKey': true
        },
        'personalCubeId': 'CUBE-2fm',
        'name': '$$ [Cube] TS - 02',
        'category': {
          'college': {
            'id': 'CLG00001',
            'name': 'AI'
          },
          'channel': {
            'id': 'CHN00002',
            'name': 'AI Biz. Implementation'
          }
        },
        'subCategories': [
          {
            'college': {
              'id': 'CLG00001',
              'name': 'AI'
            },
            'channel': {
              'id': 'CHN00002',
              'name': 'AI Biz. Implementation'
            }
          }
        ],
        'contents': {
          'type': 'Video',
          'contents': {
            'id': '31b79d10-a769-4f02-bf13-c124539b6e79',
            'name': ''
          },
          'lengthInMinute': 0,
          'surveyId': '8d3e545f-ebdc-47c7-a181-681be2f54c4c',
          'surveyCaseId': 'cbe856d0-2fd9-4fb6-8e7b-29875b5af5f5',
          'examId': 'CUBE-2fm',
          'paperId': '20-028',
          'fileBoxId': ''
        },
        'cubeIntro': {
          'id': '4a3b7a0d-7c44-4779-bcbb-5d7e5828502f',
          'name': '$$ [Cube] TS - 02'
        },
        'tags': [],
        'stateUpdateDate': 1595987543138,
        'time': 1595987543138,
        'openRequests': [
          {
            'time': 1595987572115,
            'response': {
              'email': 'r46u-r@ne1-m2-c2',
              'name': 'SK**',
              'remark': '',
              'accepted': true,
              'time': 1595987572115
            }
          }
        ]
      },
      'rollBooks' : [
        {
          'id': '38dc794d-8ab1-4b49-aa75-5facaf005847',
          'entityVersion': 1,
          'patronKey': {
            'keyString': 'r46u-r@ne1-m2-c2',
            'patronType': 'Audience',
            'pavilionKey': false,
            'cineroomKey': false,
            'denizenKey': false,
            'audienceKey': true
          },
          'round': 1,
          'name': '$$ [Cube] TS - 02',
          'studentCount': 1,
          'passedStudentCount': 0,
          'lectureCardId': 'LECTURE-CARD-21e'
        }
      ]
    }
  ],
  'reviewSummary': {
    'id': 'a877cb12-a864-495c-b1eb-ca0caf7561b3',
    'entityVersion': 0,
    'patronKey': {
      'keyString': null,
      'patronType': 'Audience',
      'denizenKey': false,
      'audienceKey': true,
      'pavilionKey': false,
      'cineroomKey': false
    },
    'versionBased': false,
    'maxStarCount': 5,
    'reviewerCount': 0,
    'average': 0,
    'starCounts': [
      {
        'left': 1,
        'right': 0
      },
      {
        'left': 2,
        'right': 0
      },
      {
        'left': 3,
        'right': 0
      },
      {
        'left': 4,
        'right': 0
      },
      {
        'left': 5,
        'right': 0
      }
    ],
    'versionStarCountMap': {},
    'versionReviewerCountMap': {}
  },
  'commentCountRdo': {
    'feedbackId': 'da83ffa6-b77c-42ac-8206-a81bf141be80',
    'count': 0
  }
};


@autobind
class CoursePlanService {
  //
  static instance: CoursePlanService;

  coursePlanApi: CoursePlanApi;
  coursePlanFlowApi: CoursePlanFlowApi;

  answerSheetService: AnswerSheetService = AnswerSheetService.instance;
  surveyCaseService: SurveyCaseService = SurveyCaseService.instance;
  courseLectureService: CourseLectureService = CourseLectureService.instance;

  lectureService: LectureService = LectureService.instance;  //  lectureViews(LectureViewModel[])
  reviewService: ReviewService = ReviewService.instance;     // reviewSummary(ReviewSummaryModel)
  commentService: CommentService = CommentService.instance;  //  commentCountRdo(CommentCountRdoModel)

  @observable
  coursePlans: OffsetElementList<CoursePlanModel> = { results: [], totalCount: 0 };

  @observable
  coursePlan: CoursePlanModel = new CoursePlanModel();

  @observable
  coursePlanContents: CoursePlanContentsModel = new CoursePlanContentsModel();

  @observable
  coursePlanListModalOpen: boolean = false;

  @observable
  courseRequestCdo: CourseRequestCdoModel = new CourseRequestCdoModel();

  @observable
  coursePlanQuery: CoursePlanQueryModel = new CoursePlanQueryModel();

  @observable
  cardSet: LearningCardModel[] = [];

  @observable
  cardIdSet: string[] = [];

  @observable
  courseSet: CoursePlanModel[] = [];

  @observable
  courseIdSet: string[] = [];

  @observable
  isSelectedCardSet: boolean = false;

  @observable
  isSelectedCourseSet: boolean = false;

  @observable
  channelsMap: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();

  @observable
  preCourseSet: CoursePlanModel[] = [];

  @observable
  preCourseIdSet: string[] = [];




  constructor(coursePlanApi: CoursePlanApi, coursePlanFlowApi: CoursePlanFlowApi) {
    this.coursePlanApi = coursePlanApi;
    this.coursePlanFlowApi = coursePlanFlowApi;
  }

  registerCoursePlan(coursePlan: CoursePlanModel) {
    //
    return this.coursePlanApi.registerCoursePlan(coursePlan);
  }

  // CoursePlans -------------------------------------------------------------------------------------------------------

  @action
  async findAllCoursePlan() {
    //
    const coursePlans = await this.coursePlanApi.findAllCoursePlan();
    return runInAction(() => this.coursePlans = coursePlans);
  }

  @action
  async findAllCoursePlanByQuery(coursePlanQuery: CoursePlanQueryModel) {
    //
    const coursePlans = await this.coursePlanApi.findAllCoursePlanByQuery(CoursePlanQueryModel.asCoursePlanRdo(coursePlanQuery));
    return runInAction(() => this.coursePlans = coursePlans);
  }

  // CoursePlan --------------------------------------------------------------------------------------------------------

  @action
  clearCoursePlan() {
    //
    this.coursePlan = new CoursePlanModel();
  }

  @action
  async findCoursePlan(coursePlanId: string) {
    //
    const courseData: any = tempData; //await this.coursePlanApi.findCoursePlan(coursePlanId);

    return runInAction(() => {
      if (courseData) {
        const coursePlan: CoursePlanModel = JSON.parse(JSON.stringify(courseData.coursePlan));
        const coursePlanContents: CoursePlanContentsModel = JSON.parse(JSON.stringify(courseData.coursePlanContents));
        const answerSheet: AnswerSheetModel = JSON.parse(JSON.stringify(courseData.answerSheet));
        const surveyCase: SurveyCaseModel = JSON.parse(JSON.stringify(courseData.surveyCase));
        const courseLecture: CourseLectureModel = JSON.parse(JSON.stringify(courseData.courseLecture));
        const lectureViews: LectureViewModel[] = JSON.parse(JSON.stringify(courseData.lectureViews));
        const reviewSummary: ReviewSummaryModel = JSON.parse(JSON.stringify(courseData.reviewSummary));
        const commentCountRdo: CommentCountRdoModel = JSON.parse(JSON.stringify(courseData.commentCountRdo));

        this.coursePlan = new CoursePlanModel(coursePlan);
        this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents);
        this.answerSheetService.setAnswerSheet(answerSheet);
        this.surveyCaseService.setSurveyCase(surveyCase);
        this.courseLectureService.setCourseLecture(courseLecture);
        this.lectureService.setLectureViews(lectureViews);
        this.reviewService.reviewSummary = reviewSummary;
        this.commentService.commentCount = commentCountRdo;
      }
      return courseData;
    });
  }

  modifyCoursePlan(coursePlanId: string, coursePlan: CoursePlanModel) {
    //
    this.coursePlanApi.modifyCoursePlan(coursePlanId, CoursePlanModel.asNameValues(coursePlan));
  }

  @action
  changeCoursePlanProps(name: string, value: string | {}) {
    //
    this.coursePlan = _.set(this.coursePlan, name, value);
  }


  // CoursePlanContents ------------------------------------------------------------------------------------------------

  @action
  clearCoursePlanContents() {
    //
    return runInAction(() => this.coursePlanContents = new CoursePlanContentsModel());
  }

  registerCoursePlanContents(coursePlanContents: CoursePlanContentsModel) {
    //
    return this.coursePlanApi.registerCoursePlanContents(coursePlanContents);
  }

  @action
  async findCoursePlanContents(coursePlanContentsId: string) {
    //
    const coursePlanContents = await this.coursePlanApi.findCoursePlanContents(coursePlanContentsId);

    return runInAction(() => this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents));
  }

  @action
  async findCoursePlanContentsV2(coursePlanContentsId: string) {
    //
    const coursePlanContents = await this.coursePlanApi.findCoursePlanContentsV2(coursePlanContentsId);

    return runInAction(() => this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents));
  }

  modifyCoursePlanContents(coursePlanContentsId: string, coursePlanContents: CoursePlanContentsModel) {
    //
    this.coursePlanApi.modifyCoursePlanContents(coursePlanContentsId, CoursePlanContentsModel.asNameValues(coursePlanContents));
  }

  @action
  changeCoursePlanContentsProps(name: string, value: string | Date | IdName[]) {
    //
    this.coursePlanContents = _.set(this.coursePlanContents, name, value);
  }

  @action
  cleanCoursePlanContents() {
    //
    this.coursePlanContents = new CoursePlanContentsModel();
  }


  @action
  changeCourseRequestProps(name: string, value: string) {
    //
    this.courseRequestCdo = _.set(this.courseRequestCdo, name, value);
  }

  @action
  courseRequestOpen() {
    //
    this.courseRequestCdo = _.set(this.courseRequestCdo, 'courseState', CourseState.Opened);
    return this.coursePlanFlowApi.coursePlanRequestOpen(this.courseRequestCdo);
  }

  @action
  courseRequestReject() {
    //
    this.courseRequestCdo = _.set(this.courseRequestCdo, 'courseState', CourseState.Rejected);
    return this.coursePlanFlowApi.coursePlanRequestReject(this.courseRequestCdo);
  }


  makeCoursePlan(coursePlan: CoursePlanModel, coursePlanContents: CoursePlanContentsModel) {
    //
    return this.coursePlanFlowApi.makeCoursePlan(
      new CoursePlanFlowCdoModel(
        CoursePlanModel.asCdo(coursePlan),
        CoursePlanContentsModel.asCdo(coursePlanContents)
      )
    );
  }

  modifyCoursePlanFlow(coursePlanId: string, coursePlan: CoursePlanModel, coursePlanContents: CoursePlanContentsModel) {
    //
    this.coursePlanFlowApi.modifyCoursePlan(coursePlanId, new CoursePlanFlowUdoModel(coursePlan, coursePlanContents));
  }

  removeCoursePlanFlow(coursePlanId: string) {
    //
    this.coursePlanFlowApi.removeCoursePlan(coursePlanId);
  }

  @action
  changeCoursePlanListModalOpen(open: boolean) {
    //
    this.coursePlanListModalOpen = open;
  }

  @action
  changeCoursePlanQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    //
    this.coursePlanQuery = _.set(this.coursePlanQuery, name, value);
    if (typeof value === 'object' && nameSub) {
      this.coursePlanQuery = _.set(this.coursePlanQuery, nameSub, valueSub);
    }
  }

  @action
  clearCoursePlanQuery() {
    //
    this.coursePlanQuery = new CoursePlanQueryModel();
  }

  @action
  setIsPopup() {
    //
    this.coursePlanQuery = _.set(this.coursePlanQuery, 'isPopup', false);
  }

  @action
  changeCardSetProps(cardSet: LearningCardModel[]) {
    this.cardSet = cardSet;
  }

  @action
  changeCardIdSetProps(cardSet: string[]) {
    this.cardIdSet = cardSet;
  }

  @action
  changeCourseSetProps(courseSet: CoursePlanModel[]) {
    this.courseSet = courseSet;
  }

  @action
  changeCourseIdSetProps(courseIdSet: string[]) {
    this.courseIdSet = courseIdSet;
  }

  @action
  changeIsSelectedCardSet() {
    this.isSelectedCardSet = !!this.cardSet.length;
  }

  @action
  changeIsSelectedCourseSet() {
    this.isSelectedCourseSet = !!this.courseSet.length;
  }

  @action
  changeChannelsMapProps(channelsMap: Map<IdName, IdName[]>) {
    //
    this.channelsMap = channelsMap;
  }

  @action
  setCardSet(cardSet: LearningCardModel) {
    //
    this.cardSet = [...this.cardSet].concat([cardSet]);
  }

  @action
  setCourseSet(courseSet: CoursePlanModel) {
    //
    this.courseSet = [...this.courseSet].concat([courseSet]);
  }

  @action
  async findAllPrecedenceCourseList( coursePlanId: string) {
    const precedenceSet = await this.coursePlanApi.findAllPrecedenceCourseList( coursePlanId );
    if (precedenceSet) {
      return precedenceSet.results;
      /*return runInAction( () => {
        this.preCourseSet = precedenceSet.results.map(result => new CoursePlanModel(result));
      });*/
    } else {
      return null;
    }
  }

  @action
  async findAllPreCourseIdList( coursePlanId: string) {
    const preCourseIdSet = await this.coursePlanApi.findAllPreCourseIdList( coursePlanId );
    if (preCourseIdSet) {
      console.log( 'preCourseIdSet : ', preCourseIdSet );
      this.preCourseIdSet = preCourseIdSet;
      return preCourseIdSet;
    } else {
      return null;
    }
  }
}

Object.defineProperty(CoursePlanService, 'instance', {
  value: new CoursePlanService(CoursePlanApi.instance, CoursePlanFlowApi.instance),
  writable: false,
  configurable: false,
});

export default CoursePlanService;
