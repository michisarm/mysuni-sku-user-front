import moment from 'moment';
import { FieldType } from 'tracker/model/ActionType';
import { Field, PvInit } from 'tracker/model/ActionTrackModel';
import { lsTest } from 'tracker-react/utils';
import { LectureServiceType } from 'lecture/model';
import { ChapterParams } from 'lecture/detail/model/ChapterParams';
import { findCardCache } from 'lecture/detail/api/cardApi';
import { findCubeDetailCache } from 'lecture/detail/api/cubeApi';
import { findCollege } from 'college/present/apiclient/CollegeApi';
import { findChannel } from 'college/present/apiclient/ChannelApi';
import { findCommunity } from 'community/api/communityApi';
import { findBadge } from 'certification/api/BadgeApi';
import { findJsonUserGroup } from 'profile/present/apiclient/SkProfileApi';
import { requestLectureDiscussion } from 'lecture/detail/service/useLectureDiscussion/utility/requestLectureDiscussion';
import { requestChapter } from 'lecture/detail/service/useLectureChapter/requestChapter';
import { find } from 'lodash';
import { findAvailableCardBundlesCache } from '../../../lecture/shared/api/arrangeApi';

const FIELD_STORAGE_KEY = '_mysuni_field';
const AUTH_STORAGE_KEY = '_mysuni_auth';
const PV_INIT_STORAGE_KEY = '_mysuni_pv_init';

export const mobileCheck = () => {
  let check = false;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    check = true;
  }
  return check;
};

export const initPvInit = () => {
  return {
    area: 'INIT',
    referer: '',
    refererSearch: '',
    createDate: moment().toISOString(true)
  };
}

export const setPvInit = (pvParam: PvInit) => {
  const pvInit = initPvInit();
  try {
    if (lsTest()) {
      pvInit.area = pvParam.area;
      pvInit.referer = pvParam.referer;
      pvInit.refererSearch = pvParam.refererSearch;
      localStorage.setItem(PV_INIT_STORAGE_KEY, JSON.stringify(pvInit));
    }
  } catch {
    //
  }
}

export const getPvInit = () => {
  let pvInit = null;
  try {
    if (lsTest()) {
      const cachedPvInit = localStorage.getItem(PV_INIT_STORAGE_KEY);
      if (cachedPvInit) {
        const parsePvInit = JSON.parse(cachedPvInit);
        if(parsePvInit.createDate && moment(parsePvInit.createDate).diff(moment(), 'seconds') > -20){
          pvInit = parsePvInit;
        }
        localStorage.removeItem(PV_INIT_STORAGE_KEY);
      }
    }
  } catch {
    //
  }
  return pvInit;
}

export const initAuth = () => {
  const auth = {
    base: {
      group_field: '',
      group_name: '',
    },
    country: {
      group_field: '',
      group_name: '',
    },
    task: {
      group_field: '',
      group_name: '',
    },
    position: {
      group_field: '',
      group_name: '',
    },
    membership: {
      group_field: '',
      group_name: '',
    },
  };
  return auth;
};

export const setAuth = async () => {
  const auth = initAuth();
  try {
    await findJsonUserGroup().then((data) => {
      const userGroup = JSON.parse(data.jsonUserGroup);
      Object.keys(userGroup).forEach((key) => {
        if (key === '기본') {
          auth.base.group_field = key;
          auth.base.group_name = userGroup[key];
        } else if (key === '국가') {
          auth.country.group_field = key;
          auth.country.group_name = userGroup[key];
        } else if (key === '직무') {
          auth.task.group_field = key;
          auth.task.group_name = userGroup[key];
        } else if (key === '직책') {
          auth.position.group_field = key;
          auth.position.group_name = userGroup[key];
        } else if (key === '멤버십') {
          auth.membership.group_field = key;
          auth.membership.group_name = userGroup[key];
        }
      });
    });
    if (lsTest()) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    }
  } catch {
    //
  }
  return auth;
};

export const getAuth = async () => {
  let auth;
  if (lsTest()) {
    const cachedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (cachedAuth) {
      auth = JSON.parse(cachedAuth);
    }
  }
  if (!auth) {
    auth = await setAuth();
  }
  return auth;
};

export const getAbtestUserTargets = async () => {
  const targets = '[]';
  // try {
  //   await getUserTargets().then((data) => {
  //     if (data) {
  //       targets = JSON.stringify(data);
  //     }
  //   });
  // } catch {
  //   //
  // }
  return targets;
};

export const getPathValue = (
  path: string,
  param: string,
  type: FieldType
): Field | null => {
  if (!path.includes('/' + param + '/')) {
    return null;
  }
  const reg = new RegExp('/' + param + '/([^/]+)(/|$)');
  const matches = reg.exec(path);
  if (matches && matches.length) {
    let checkId;
    switch (type) {
      case FieldType.College:
        checkId = 'CLG';
        break;
      case FieldType.Channel:
        checkId = 'CHN';
        break;
      case FieldType.Card:
        checkId = 'CARD';
        break;
      case FieldType.Cube:
        checkId = 'CUBE';
        break;
      case FieldType.Community:
        checkId = 'COMMUNITY';
        break;
      case FieldType.Badge:
        checkId = 'BADGE';
        break;
      default:
        checkId = 'NONE';
        break;
    }
    return matches[1].includes(checkId) ? { type, id: matches[1] } : null;
  } else {
    return null;
  }
};

export const getCardRelId = async (cardId: string) => {
  let returnFields: Field[] = [];
  const relation = 'relation';
  let field;
  let collegeId;
  let channelId;
  let addId = false;
  if (lsTest()) {
    const cachedFiled = localStorage.getItem(FIELD_STORAGE_KEY);
    if (cachedFiled) {
      field = JSON.parse(cachedFiled);
      if (field && field[FieldType.Card]) {
        const rel = field[FieldType.Card][relation];
        if (rel && rel[cardId]) {
          collegeId = rel[cardId].collegeId;
          channelId = rel[cardId].channelId;
        }
      }
    }
  }

  if (!(collegeId && channelId)) {
    const result = await findCardCache(cardId);
    if (result?.card?.categories) {
      result?.card?.categories
        .filter((o) => o.mainCategory === true)
        .map((o) => {
          collegeId = o.collegeId;
          channelId = o.channelId;
          addId = true;
        });
    }
  }

  let tempObj;
  let tempRel;
  if (lsTest() && addId) {
    const value = { collegeId, channelId };
    if (field) {
      if (field[FieldType.Card]) {
        tempObj = field[FieldType.Card];
        tempRel = field[FieldType.Card][relation];
        if (tempRel) {
          if (!tempRel[cardId]) {
            // relation add
            field[FieldType.Card][relation][cardId] = value;
            tempObj = {
              ...field,
              ...{ [FieldType.Card]: field[FieldType.Card] },
            };
          } else {
            tempObj = field;
          }
        } else {
          // relation new
          tempObj = {
            ...field,
            ...{ ...tempObj, relation: { [cardId]: value } },
          };
        }
      } else {
        // card new
        tempObj = {
          ...field,
          [FieldType.Card]: { relation: { [cardId]: value } },
        };
      }
    } else {
      // field new
      tempObj = {
        [FieldType.Card]: { relation: { [cardId]: value } },
        createDate: moment().toISOString(true),
      };
    }
    localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(tempObj));
  }

  const fields = [];
  if (collegeId) fields.push({ type: FieldType.College, id: collegeId });
  if (channelId) fields.push({ type: FieldType.Channel, id: channelId });
  returnFields = fields;

  return returnFields;
};

export const getServiceType = (path: string) => {
  let serviceType = null;
  if (path.includes('/cube/')) {
    serviceType = LectureServiceType.Cube.toUpperCase();
  } else if (path.includes('/card/')) {
    serviceType = LectureServiceType.Card.toUpperCase();
  }
  return serviceType;
};

export const getCubeType = (path: string) => {
  let cubeType = null;
  if (/(^\/suni-main)?\/lecture\/card\/.*?\/cube\/.*?\/.*?\/(.*)/.test(path)) {
    cubeType = RegExp.$2;
  }
  return cubeType;
};

export const getPathKey = (path: string, param: string) => {
  if (!path.includes('/' + param)) {
    return null;
  }
  const reg = new RegExp('/(' + param + '.*?)(/|$)');
  const matches = reg.exec(path);
  if (matches && matches.length) {
    return matches[1];
  } else {
    return null;
  }
};

export const getKoreaName = (name: any) => {
  return (name = name.ko
    ? name.ko
    : name.en
    ? name.en
    : name.zh
    ? name.zh
    : name
    ? name
    : '');
};

// localstorage cached 처리
const getFieldName = async (id: string, type: string) => {
  let name;
  let field;
  if (lsTest()) {
    const cachedFiled = localStorage.getItem(FIELD_STORAGE_KEY);
    if (cachedFiled) {
      field = JSON.parse(cachedFiled);
      if (field && field[type]) {
        name = field[type][id];
      }
    }
  }
  if (!name) {
    // if (type === FieldType.Course) {
    // const coursePlan = await findCoursePlan(id);
    // name = coursePlan?.name;
    if (type === FieldType.Card) {
      const result = await findCardCache(id);
      name = result?.card?.name;
    } else if (type === FieldType.Cube) {
      const result = await findCubeDetailCache(id);
      name = result?.cube?.name;
    } else if (type === FieldType.College) {
      const college = await findCollege(id);
      name = college?.name;
    } else if (type === FieldType.Channel) {
      const channel = await findChannel(id);
      name = channel?.name;
    } else if (type === FieldType.Community) {
      const community = await findCommunity(id);
      name = community?.name;
    } else if (type === FieldType.Badge) {
      const badge = await findBadge(id);
      name = badge?.name;
    } else if (type === FieldType.CardBundle) {
      // id기반 api 없는지 확인
      const cardBundles = await findAvailableCardBundlesCache();
      const cardBundle = find(cardBundles, { id });
      let type = cardBundle?.type || 'none';
      switch (type) {
        case 'Normal':
          type = '일반과정';
          break;
        case 'Popular':
          type = '인기과정';
          break;
        case 'New':
          type = '신규과정';
          break;
        case 'Recommended':
          type = '추천과정';
          break;
        case 'HotTopic':
          type = '핫토픽';
          break;
      }
      if (cardBundle) {
        const text = await getKoreaName(cardBundle.displayText);
        name = type + '::' + text;
      } else {
        name = type + '::';
      }
    } else if (type === FieldType.Chapter) {
      const ids = id.split(',');
      if (ids && ids?.[0] && ids?.[1]) {
        const params = {} as ChapterParams;
        params.cardId = ids?.[0];
        params.contentId = ids?.[1];
        await requestChapter(params).then((result) => {
          name = result?.name;
        });
      }
    } else if (type === FieldType.Discussion) {
      const ids = id.split(',');
      if (ids && ids?.[0] && ids?.[1]) {
        const id = ids?.[0];
        const contentId = ids?.[1];
        await requestLectureDiscussion(id, contentId).then((result) => {
          name = result?.name;
        });
      }
    }
    if (name) {
      name = getKoreaName(name);
    }
    if (lsTest() && name) {
      let tempObj;
      if (field) {
        tempObj = field[type];
        if (tempObj) {
          // 1달 단위 or 100개 단위 refresh
          if (
            moment(field.createDate).diff(moment(), 'months') < 0 ||
            Object.keys(field[type]).length > 100
          ) {
            tempObj = {
              [type]: { [id]: name },
              createDate: moment().toISOString(true),
            };
          } else {
            // add
            field[type][id] = name;
            tempObj = { ...field, ...{ [type]: field[type] } };
          }
        } else {
          // type new
          tempObj = { ...field, ...{ [type]: { [id]: name } } };
        }
      } else {
        // new
        tempObj = {
          [type]: { [id]: name },
          createDate: moment().toISOString(true),
        };
      }
      localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(tempObj));
    }
  }
  return name;
};

export const setResultName = async (field: Field) => {
  const result: Field = {
    type: field.type,
    id: field.id,
  };
  const name = await getFieldName(field.id, field.type);
  if (name) {
    result.name = name;
  }
  return result;
};

export const getPathName = async (path: string, search: string) => {
  // console.log('path : ', path, search);
  let pathName;
  switch (true) {
    case /^(\/suni-main\/pages|\/pages)\/(\d+)$/.test(path):
      pathName = '메인';
      break;
    case /(^\/suni-main)?\/my-training\/.*/.test(path):
      switch (true) {
        case /(^\/suni-main)?\/my-training\/(.*?)\/(.*?)\/.*/.test(path):
          switch (RegExp.$2) {
            case 'learning':
              pathName = 'Learning';
              switch (RegExp.$3) {
                case 'InProgress':
                  pathName += '::학습중';
                  break;
                case 'InMyList':
                  pathName += '::관심목록';
                  break;
                case 'Required':
                  pathName += '::권장과정';
                  break;
                case 'Enrolled':
                  pathName += '::학습예정';
                  break;
                case 'Completed':
                  pathName += '::학습완료';
                  break;
                case 'PersonalCompleted':
                  pathName += '::개인학습';
                  break;
                case 'Retry':
                  pathName += '::취소/미이수';
                  break;
              }
              break;
            case 'new-learning':
              pathName = 'Main-Section';
              switch (RegExp.$3) {
                case 'New':
                  pathName += '::신규과정';
                  break;
                case 'Popular':
                  pathName += '::인기과정';
                  break;
                case 'Recommend':
                  pathName += '::추천과정';
                  break;
                case 'Enrolling':
                  pathName += '::수강신청과정';
                  break;
                default:
                  await setResultName({
                    type: FieldType.CardBundle,
                    id: RegExp.$3,
                  }).then((result) => {
                    pathName = 'Main-Section::' + result.name;
                  });
                  break;
              }
              break;
            case 'my-page':
              pathName = 'mypage';
              switch (RegExp.$3) {
                case 'EarnedBadgeList':
                  pathName += '::badge';
                  break;
                case 'EarnedStampList':
                  pathName += '::stamp';
                  break;
                  case 'EarnedNoteList':
                  pathName += '::note';
                  break;
              }
              break;
          }
          break;
        case /(^\/suni-main)?\/my-training\/(.*?)\/(.*)/.test(path):
          switch (RegExp.$2) {
            case 'apl':
              pathName = '';
              switch (RegExp.$3) {
                case 'create':
                  pathName += '개인학습등록';
                  break;
              }
              break;
            case 'my-page':
              pathName = 'mypage';
              switch (RegExp.$3) {
                case 'MyProfile':
                  pathName += '::profile';
                  break;
              }
          }
          break;
      }
      break;
    case /(^\/suni-main)?\/hot-topic\/(.*)/.test(path):
      pathName = 'Main-Section::HotTopic';
      await setResultName({
        type: FieldType.CardBundle,
        id: RegExp.$2,
      }).then((result) => {
        pathName = 'Main-Section::' + result.name;
      });
      break;
    case /(^\/suni-main)?\/lecture\/recommend\/(.*?)\/(.*)/.test(path):
      pathName = 'Recommend';
      if (RegExp.$2 && RegExp.$2 === 'channel' && RegExp.$3) {
        await setResultName({
          type: FieldType.Channel,
          id: RegExp.$3,
        }).then(async (result) => {
          if (result.name) {
            pathName = 'Recommend::' + result.name;
          }
        });
        break;
      }
      break;
    case /(^\/suni-main)?\/lecture\/recommend/.test(path):
      pathName = 'Recommend';
      break;
    case /(^\/suni-main)?\/lecture\/college\/(.*?)\/.*/.test(path):
      await setResultName({
        type: FieldType.College,
        id: RegExp.$2,
      }).then(async (result) => {
        if (result.name) {
          switch (true) {
            case /(^\/suni-main)?\/lecture\/college\/(.*?)\/channels\/.*/.test(
              path
            ):
              pathName = 'Category::전체보기::' + result.name;
              break;
            case /(^\/suni-main)?\/lecture\/college\/(.*?)\/channel\/(.*)/.test(
              path
            ):
              await setResultName({
                type: FieldType.Channel,
                id: RegExp.$3,
              }).then((r) => {
                pathName =
                  'Category::채널별보기::' + result.name + '::' + r.name;
              });
              break;
          }
        }
      });
      break;
    case /(^\/suni-main)?\/lecture\/card\/.*/.test(path):
      pathName = '콘텐츠';
      switch (true) {
        case /(^\/suni-main)?\/lecture\/card\/.*?\/cube\/(.*?)\/(.*?)\/(.*)/.test(
          path
        ):
          pathName += '::큐브';
          switch (RegExp.$3) {
            case 'view':
              pathName += '::View';
              break;
            case 'test':
              pathName += '::Test';
              break;
            case 'report':
              pathName += '::Report';
              break;
            case 'survey':
              pathName += '::Survey';
              break;
          }
          break;
        case /(^\/suni-main)?\/lecture\/card\/(.*?)\/(.*?)\/(.*)/.test(path):
          switch (RegExp.$3) {
            case 'chapter':
              await setResultName({
                type: FieldType.Chapter,
                id: RegExp.$2 + ',' + RegExp.$4,
              }).then((result) => {
                pathName = '콘텐츠::카드::Chapter::' + result.name;
              });
              break;
            case 'discussion':
              await setResultName({
                type: FieldType.Discussion,
                id: RegExp.$2 + ',' + RegExp.$4,
              }).then((result) => {
                pathName = '콘텐츠::카드::토론하기::' + result.name;
              });
              break;
          }
          break;
        case /(^\/suni-main)?\/lecture\/card\/(.*?)\/(.*)/.test(path):
          pathName += '::카드';
          switch (RegExp.$3) {
            case 'view':
              pathName += '::View';
              break;
            case 'test':
              pathName += '::Test';
              break;
            case 'report':
              pathName += '::Report';
              break;
            case 'survey':
              pathName += '::Survey';
              break;
          }
          break;
      }
      break;
    case /(^\/suni-main)?\/personalcube\/create\/(.*?)\/(.*)/.test(path):
      pathName = 'Create';
      switch (RegExp.$2) {
        case 'Create':
          pathName += '::Createlist';
          break;
        case 'Shared':
          pathName += '::sharedlist';
          break;
        case 'cubes':
          if (RegExp.$3.includes('new')) pathName += '::작성';
          break;
      }
      break;
    case /(^\/suni-main)?\/certification\/badge\/(.*?)\/(.*)/.test(path):
      pathName = 'Certification';
      switch (RegExp.$2) {
        case 'AllBadgeList':
          pathName += '::badgelist';
          break;
        case 'ChallengingBadgeList':
          pathName += '::도전badge';
          break;
        case 'EarnedBadgeList':
          pathName += '::획득badge';
          break;
        case 'badge-detail':
          await setResultName({
            type: FieldType.Badge,
            id: RegExp.$3,
          }).then((result) => {
            pathName = 'Certification::badge상세::' + result.name;
          });
          break;
      }
      break;
    case /(^\/suni-main)?\/community\/(.*)/.test(path):
      pathName = 'Community';
      const tempId = RegExp.$2.split('/')[0];
      switch (true) {
        case /(^\/suni-main)?\/community\/main\/?(.*)/.test(path):
          switch (RegExp.$2) {
            case '':
              pathName += '::mycommunity';
              break;
            case 'open-communities':
              pathName += '::Communitylist';
              break;
            case 'follow':
              pathName += '::Follow';
              break;
          }
          break;
        case /(^\/suni-main)?\/community\/my-profile\/?(.*)/.test(path):
          switch (RegExp.$2) {
            case '':
              pathName += '::profile';
              break;
            case 'feed':
              pathName += '::profile::feed';
              break;
            case 'communities':
              pathName += '::profile::mycommunity';
              break;
            case 'bookmark':
              pathName += '::profile::bookmark';
              break;
          }
          break;
        case /(^\/suni-main)?\/community\/profile\/(.*)/.test(path):
          switch (true) {
            case !/(^\/suni-main)?\/community\/profile\/(.*?)\/(.*)/.test(path):
              pathName += '::profile';
              break;
            case /(^\/suni-main)?\/community\/profile\/(.*?)\/(.*)/.test(path):
              if (RegExp.$3.includes('feed')) {
                pathName += '::profile::feed';
              } else if (RegExp.$3.includes('communities')) {
                pathName += '::profile::community';
              }
              break;
          }
          break;
        default:
          await setResultName({
            type: FieldType.Community,
            id: tempId,
          }).then((result) => {
            result.name && (pathName = 'Community::' + result.name);
          });
          break;
      }
      break;
    case /(^\/suni-main)?\/introduction\/(.*)/.test(path):
      pathName = 'Introduction';
      switch (RegExp.$2) {
        case 'MySuni':
          pathName += '::mySUNI소개';
          break;
        case 'College':
          const subTab = new URLSearchParams(search).get('subTab');
          switch (subTab) {
            case null:
              pathName += '::College소개';
              break;
            default:
              pathName += '::' + subTab;
              break;
          }
          break;
        case 'Certification':
          pathName += '::인증제도소개';
          break;
        case 'PromotionTab':
          pathName += '::홍보자료';
          break;
      }
      break;
    case /(^\/suni-main)?\/board\/support\/(.*)/.test(path):
      pathName = '';
      switch (RegExp.$2) {
        case 'Notice':
          pathName += '공지사항';
          break;
        case 'FAQ':
          pathName += 'FAQ';
          break;
        case 'Q&A':
          pathName += 'Q&A';
          break;
      }
      if (!pathName) {
        switch (true) {
          case RegExp.$2.includes('notice-detail'):
            pathName += '공지사항';
            break;
          case RegExp.$2.includes('faq-detail'):
            pathName += 'FAQ';
            break;
          case RegExp.$2.includes('answered-detail') ||
            RegExp.$2.includes('qna-detail'):
            pathName += 'Q&A';
            break;
        }
      }
      break;
    case /(^\/suni-main)?\/board\/support-qna/.test(path):
      pathName = 'Q&A작성';
    case /(^\/suni-main)?\/approval\/(.*?)\/(.*)/.test(path):
      pathName = '';
      switch (RegExp.$2) {
        case 'PaidCourse':
          pathName += '유료과정승인';
          break;
        case 'PersonalLearning':
          pathName += '개인학습승인';
          break;
      }
    case /(^\/suni-main)?\/search/.test(path):
      pathName = '검색';
      break;
    case /(^\/suni-main)?\/expert\/instructor\/(.*?)\/(.*)/.test(path):
      pathName = 'Expert';
      switch (RegExp.$3) {
        case 'Introduce':
          pathName += '::소개';
          break;
        case 'Lecture':
          pathName += '::강의';
          break;
        case 'cubes':
          if (RegExp.$3.includes('new')) pathName += '::작성';
          break;
      }
      break;
    default:
      break;
  }
  // console.log('pathName', pathName);
  return pathName;
};
