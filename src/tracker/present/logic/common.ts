import moment from 'moment';
import { FieldType, Field } from 'tracker/model';
import { lsTest } from 'ucomp-tracker-react/utils';
import { LectureServiceType } from 'lecture/model';
import { findCoursePlan } from 'lecture/detail/api';
import { findPersonalCube } from 'personalcube/personalcube/present/apiclient/PersonalCubeApi';
import { findCollege } from 'college/present/apiclient/CollegeApi';
import { findChannel } from 'college/present/apiclient/ChannelApi';
import { findCommunity } from 'community/api/communityApi';

const FIELD_STORAGE_KEY = '_mysuni_field';

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
      case FieldType.Course:
        checkId = 'COURSE';
        break;
      case FieldType.Cube:
        checkId = 'CUBE';
        break;
      case FieldType.Community:
        checkId = 'COMMUNITY';
        break;
    }
    return matches[1].includes(checkId) ? { type, id: matches[1] } : null;
  } else {
    return null;
  }
};

export const getServiceType = (path: string) => {
  let serviceType = null;
  if (path.includes('/Course/')) {
    serviceType = LectureServiceType.Course.toUpperCase();
  } else if (path.includes('/Program/')) {
    serviceType = LectureServiceType.Program.toUpperCase();
  } else if (path.includes('/lecture-card/')) {
    serviceType = LectureServiceType.Card.toUpperCase();
  }
  return serviceType;
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
    if (type === FieldType.Course) {
      const coursePlan = await findCoursePlan(id);
      name = coursePlan?.name;
    } else if (type === FieldType.Cube) {
      const cube = await findPersonalCube(id);
      name = cube?.name;
    } else if (type === FieldType.College) {
      const college = await findCollege(id);
      name = college?.name;
    } else if (type === FieldType.Channel) {
      const channel = await findChannel(id);
      name = channel?.name;
    } else if (type === FieldType.Community) {
      const community = await findCommunity(id);
      name = community?.name;
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
                  pathName += '-학습중';
                  break;
                case 'InMyList':
                  pathName += '-관심목록';
                  break;
                case 'Required':
                  pathName += '-권장과정';
                  break;
                case 'Enrolled':
                  pathName += '-학습예정';
                  break;
                case 'Completed':
                  pathName += '-학습완료';
                  break;
                case 'PersonalCompleted':
                  pathName += '-개인학습';
                  break;
                case 'Retry':
                  pathName += '-취소/미이수';
                  break;
              }
              break;
            case 'my-page':
              pathName = 'mypage';
              switch (RegExp.$3) {
                case 'EarnedBadgeList':
                  pathName += '-badge';
                  break;
                case 'EarnedStampList':
                  pathName += '-stamp';
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
          }
          break;
      }
      break;
    case /(^\/suni-main)?\/lecture\/recommend\/(.*?)\/.*/.test(path):
      pathName = 'Recommend';
      break;
    case /(^\/suni-main)?\/lecture\/college\/(.*?)\/.*/.test(path):
      await setResultName({
        type: FieldType.College,
        id: RegExp.$2,
      }).then(async result => {
        if (result.name) {
          switch (true) {
            case /(^\/suni-main)?\/lecture\/college\/(.*?)\/channels\/.*/.test(
              path
            ):
              pathName = 'Category-전체보기-' + result.name;
              break;
            case /(^\/suni-main)?\/lecture\/college\/(.*?)\/channel\/(.*)/.test(
              path
            ):
              await setResultName({
                type: FieldType.Channel,
                id: RegExp.$3,
              }).then(r => {
                pathName = 'Category-채널별보기-' + result.name + '-' + r.name;
              });
              break;
          }
        }
      });
      break;
    case /(^\/suni-main)?\/lecture\/cineroom\/.*/.test(path):
      pathName = '콘텐츠 상세보기';
      switch (true) {
        case /(^\/suni-main)?\/lecture\/cineroom\/.*?\/college\/.*?\/course-plan\/.*?\/(.*)/.test(
          path
        ):
          if (RegExp.$2.includes('/cube')) {
            pathName += '-큐브';
          } else {
            pathName += '-코스';
          }
          break;
        case /(^\/suni-main)?\/lecture\/cineroom\/.*?\/college\/.*?\/cube\/.*?\/(.*)/.test(
          path
        ):
          pathName += '-큐브';
          break;
      }
      break;
    case /(^\/suni-main)?\/personalcube\/create\/(.*?)\/(.*)/.test(path):
      pathName = 'Create';
      switch (RegExp.$2) {
        case 'Create':
          pathName += '-Createlist';
          break;
        case 'Shared':
          pathName += '-sharedlist';
          break;
        case 'cubes':
          if (RegExp.$3.includes('new')) pathName += '-작성';
          break;
      }
      break;
    case /(^\/suni-main)?\/certification\/badge\/(.*?)\/(.*)/.test(path):
      pathName = 'Certification';
      switch (RegExp.$2) {
        case 'AllBadgeList':
          pathName += '-badgelist';
          break;
        case 'ChallengingBadgeList':
          pathName += '-도전badge';
          break;
        case 'EarnedBadgeList':
          pathName += '-획득badge';
          break;
        case 'badge-detail':
          pathName += '-badge상세';
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
              pathName += '-mycommunity';
              break;
            case 'open-communities':
              pathName += '-Communitylist';
              break;
            case 'follow':
              pathName += '-Follow';
              break;
          }
          break;
        case /(^\/suni-main)?\/community\/my-profile\/?(.*)/.test(path):
          switch (RegExp.$2) {
            case '':
              pathName += '-profile';
              break;
            case 'feed':
              pathName += '-profile-feed';
              break;
            case 'communities':
              pathName += '-profile-mycommunity';
              break;
            case 'bookmark':
              pathName += '-profile-bookmark';
              break;
          }
          break;
        case /(^\/suni-main)?\/community\/profile\/(.*)/.test(path):
          switch (true) {
            case !/(^\/suni-main)?\/community\/profile\/(.*?)\/(.*)/.test(path):
              pathName += '-profile';
              break;
            case /(^\/suni-main)?\/community\/profile\/(.*?)\/(.*)/.test(path):
              if (RegExp.$3.includes('feed')) {
                pathName += '-profile-feed';
              } else if (RegExp.$3.includes('communities')) {
                pathName += '-profile-community';
              }
              break;
          }
          break;
        default:
          await setResultName({
            type: FieldType.Community,
            id: tempId,
          }).then(result => {
            result.name && (pathName = 'Community-' + result.name);
          });
          break;
      }
      break;
    case /(^\/suni-main)?\/introduction\/(.*)/.test(path):
      pathName = 'Introduction';
      switch (RegExp.$2) {
        case 'MySuni':
          pathName += '-mySUNI소개';
          break;
        case 'College':
          const subTab = new URLSearchParams(search).get('subTab');
          switch (subTab) {
            case null:
              pathName += '-College소개';
              break;
            default:
              pathName += '-' + subTab;
              break;
          }
          break;
        case 'Certification':
          pathName += '-인증제도소개';
          break;
        case 'PromotionTab':
          pathName += '-홍보자료';
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
          pathName += '-소개';
          break;
        case 'Lecture':
          pathName += '-강의';
          break;
        case 'cubes':
          if (RegExp.$3.includes('new')) pathName += '-작성';
          break;
      }
      break;
    default:
      break;
  }
  // console.log('pathName', pathName);
  return pathName;
};
