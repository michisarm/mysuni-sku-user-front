import { axiosApi } from '@nara.platform/accent';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { SkProfileService } from '../../profile/stores';
import { Workspace } from '../../shared/api/Axios';
import { AxiosReturn } from '../../shared/api/AxiosReturn';
import { CardCategory } from '../../shared/model/CardCategory';
import { getCollgeName } from '../../shared/service/useCollege/useRequestCollege';
import {
  getCollegeOptions,
  getCubeTypeOptions,
  getFilterCondition,
  getOrganizerOptions,
} from '../Components/SearchFilter';
import CheckboxOptions from '../model/CheckBoxOption';
import { SearchCard, SearchCardCategory } from '../model/SearchCard';
import { SearchExpert } from '../model/SearchExpert';
import { UserWorkspace } from '../../approval/models/UserWorkspace';
import _ from 'lodash';
import { Token } from '../../shared/model/Token';
import { setSearchUI, getSearchUI } from '../model/SearchUI';
import { findMyUserWorkspaceCache } from 'lecture/detail/api/profileApi';

const ONE_DAY = 24 * 60 * 60 * 1000;
const BASE_URL = 'https://mysuni.sk.com/search/api/search';
const workspaces: { cineroomWorkspaces?: Workspace[] } =
  JSON.parse(localStorage.getItem('nara.workspaces') || '') || {};

interface SearchResult<T> {
  result: {
    total_count: number;
    rows: {
      fields: T;
    }[];
  };
  message: string;
  status: string;
}

interface CubeTypeGroup {
  fields: { 'count(*)': number; cube_type: string };
  sortkey: [string];
  location: {
    rowid: number;
    volume: string;
    table: string;
    netaddr: string;
  };
  copyof: number;
}

export function findCubeTypeGroup(text_idx: string, companyCode: string) {
  const url = encodeURI(
    `${BASE_URL}?select=cube_type,+count(*)&from=card.card&where=text_idx='${text_idx}'+allword+and+(subSidiaries_id+=+'${companyCode}'+or+subSidiaries_id+=+'ALL')+group+by+cube_type+order+by+count(*)+desc&limit=100&default-hilite=off&t=${Date.now()}`
  );
  return axiosApi.get<SearchResult<CubeTypeGroup>>(url).then(AxiosReturn);
}

interface ColleageGroup {
  fields: { 'count(*)': number; all_college_name: string };
  sortkey: [string];
  location: {
    rowid: number;
    volume: string;
    table: string;
    netaddr: string;
  };
  copyof: number;
}

export function findColleageGroup(text_idx: string, companyCode: string) {
  const url = encodeURI(
    `${BASE_URL}?select=all_college_name,+count(*)&from=card.card&where=text_idx='${text_idx}'+allword+and+(subSidiaries_id+=+'${companyCode}'+or+subSidiaries_id+=+'ALL')+group+by+all_college_name+order+by+count(*)+desc&limit=100&default-hilite=off&t=${Date.now()}`
  );
  return axiosApi.get<SearchResult<ColleageGroup>>(url).then(AxiosReturn);
}

interface CPGroup {
  fields: { 'count(*)': number; organizer: string };
  sortkey: [string];
  location: {
    rowid: number;
    volume: string;
    table: string;
    netaddr: string;
  };
  copyof: number;
}

export function findCPGroup(text_idx: string, companyCode: string) {
  const url = encodeURI(
    `${BASE_URL}?select=organizer,+count(*)&from=card.card&where=text_idx='${text_idx}'+allword+and+(subSidiaries_id+=+'${companyCode}'+or+subSidiaries_id+=+'ALL')+group+by+organizer+order+by+count(*)+desc&limit=100&default-hilite=off&t=${Date.now()}`
  );
  return axiosApi.get<SearchResult<CPGroup>>(url).then(AxiosReturn);
}

const FIND_CARD_COLUMNS =
  'id,name,categories,required_cinerooms,thumb_image_path,learning_time,stamp_count,additional_learning_time,type,simple_description,passed_student_count,student_count,star_count,used_in_badge,cube_types,difficulty_level,learning_start_date,learning_end_date,cube_organizer_names,paid';

export function findPreCard(text_idx: string) {
  const permitedCineroomsQuery = makePermitedCineroomsQuery();
  const url = encodeURI(
    `${BASE_URL}?select=${FIND_CARD_COLUMNS}&from=card_new.card_new&where=name='${text_idx}'+allword+and+${permitedCineroomsQuery}&offset=0&limit=999&t=${Date.now()}&default-hilite=off`
  );
  return axiosApi
    .get<SearchResult<SearchCard>>(url)
    .then(AxiosReturn)
    .then((c) => {
      if (c === undefined) {
        return undefined;
      }
      if (c.status !== undefined) {
        return c;
      }
      if ((c as unknown as string).replace !== undefined) {
        let s = JSON.stringify(c);
        s = s.replace(/\"{/gi, '{').replace(/}\"/gi, '}');
        s = s.replace(/\\\"/gi, '"');
        s = s.replace(/\\\\\"/gi, '\\"');
        try {
          const result = JSON.parse(s) as SearchResult<SearchCard>;
          return result;
        } catch (error) {
          return undefined;
        }
      }
    });
}

export function findCard(text_idx: string) {
  const transactionId = Date.now();
  setSearchUI({
    isLoading: true,
    transactionId,
  });
  const permitedCineroomsQuery = makePermitedCineroomsQuery();
  const url = encodeURI(
    `${BASE_URL}?select=${FIND_CARD_COLUMNS}&from=card_new.card_new&where=text_idx='${text_idx}'+allword+and+${permitedCineroomsQuery}&offset=0&limit=999&t=${Date.now()}&default-hilite=off`
  );
  return axiosApi
    .get<SearchResult<SearchCard>>(url)
    .then(AxiosReturn)
    .then((c) => {
      const searchUI = getSearchUI();
      if (searchUI?.transactionId !== transactionId) {
        return;
      }
      setSearchUI();
      if (c === undefined) {
        return undefined;
      }
      if (c.status !== undefined) {
        return c;
      }
      if ((c as unknown as string).replace !== undefined) {
        let s = JSON.stringify(c);
        s = s.replace(/\"{/gi, '{').replace(/}\"/gi, '}');
        s = s.replace(/\\\"/gi, '"');
        s = s.replace(/\\\\\"/gi, '\\"');
        try {
          const result = JSON.parse(s) as SearchResult<SearchCard>;
          return result;
        } catch (error) {
          return undefined;
        }
      }
    });
}

function parseToken() {
  const token = localStorage.getItem('nara.token');
  if (!_.isEmpty(token)) {
    const decoded = jwt_decode<Token>(token!);
    return decoded;
  }
}

function testBlacklistAccessRuleForPaidLecture(
  card: SearchCard,
  userWorkspaces: UserWorkspace,
  token: Token
) {
  if (
    userWorkspaces?.blacklistAccessRuleForPaidLecture?.groupSequences ===
      undefined ||
    !Array.isArray(
      userWorkspaces?.blacklistAccessRuleForPaidLecture?.groupSequences
    )
  ) {
    return true;
  }

  if (card.paid !== 'true') {
    return true;
  }

  const groupSequences =
    userWorkspaces.blacklistAccessRuleForPaidLecture.groupSequences;
  for (let i = 0; i < groupSequences.length; i++) {
    const index = groupSequences[i];
    if (token.userGroup[index] !== '1') {
      return true;
    }
  }

  return false;
}

export async function filterCard(cards?: SearchCard[]): Promise<SearchCard[]> {
  const userWorkspaces = await findMyUserWorkspaceCache();
  const token = parseToken();
  if (userWorkspaces === undefined || token === undefined) {
    return [];
  }
  let displayCards: SearchCard[] = cards || [];
  displayCards = displayCards.filter((c) =>
    testBlacklistAccessRuleForPaidLecture(c, userWorkspaces, token)
  );
  const filterCondition = getFilterCondition();
  if (filterCondition !== undefined) {
    if (filterCondition.all_college_name_query.length > 0) {
      displayCards = displayCards.filter((c) => {
        const mainCategory = (JSON.parse(c.categories) as SearchCardCategory[])
          .map<CardCategory>(({ channelId, collegeId, mainCategory }) => ({
            channelId,
            collegeId,
            mainCategory: mainCategory === 1,
          }))
          .find((c) => c.mainCategory === true);
        if (mainCategory !== undefined) {
          return filterCondition.all_college_name_query.includes(
            getCollgeName(mainCategory.collegeId)
          );
        }
        return false;
      });
    }
    if (filterCondition.applying === true) {
      displayCards = displayCards.filter((c) => {
        return (
          new Date(c.applying_start_date).getTime() <= Date.now() &&
          Date.now() < new Date(c.applying_end_date).getTime() + ONE_DAY
        );
      });
    }
    if (filterCondition.badge === true) {
      displayCards = displayCards.filter((c) => c.used_in_badge === '1');
    }
    if (filterCondition.cube_type_query.length > 0) {
      displayCards = displayCards.filter((c) => {
        return (JSON.parse(c.cube_types) as string[]).some((cube) =>
          filterCondition.cube_type_query.includes(cube)
        );
      });
    }
    if (filterCondition.difficulty_level_json_query.length > 0) {
      displayCards = displayCards.filter((c) =>
        filterCondition.difficulty_level_json_query.includes(c.difficulty_level)
      );
    }
    if (filterCondition.hasRequired === true) {
      if (Array.isArray(workspaces.cineroomWorkspaces)) {
        displayCards = displayCards.filter((c) =>
          workspaces.cineroomWorkspaces!.some((d) =>
            c.required_cinerooms.includes(d.id)
          )
        );
      } else {
        return [];
      }
    }
    if (filterCondition.learning_start_date_str !== null) {
      displayCards = displayCards.filter(
        (c) =>
          new Date(c.learning_start_date) >=
          filterCondition.learning_start_date_str!
      );
    }
    if (filterCondition.learning_end_date_str !== null) {
      displayCards = displayCards.filter(
        (c) =>
          new Date(c.learning_end_date) <=
          filterCondition.learning_end_date_str!
      );
    }
    if (filterCondition.learning_time_query.length > 0) {
      displayCards = displayCards.filter((c) => {
        const learningTime = parseInt(c.learning_time);
        if (filterCondition.learning_time_query.includes('type1')) {
          const r = learningTime < 30;
          if (r) {
            return r;
          }
        }
        if (filterCondition.learning_time_query.includes('type2')) {
          const r = learningTime >= 30 && learningTime < 60;
          if (r) {
            return r;
          }
        }
        if (filterCondition.learning_time_query.includes('type3')) {
          const r = learningTime >= 60 && learningTime < 4 * 60;
          if (r) {
            return r;
          }
        }
        if (filterCondition.learning_time_query.includes('type4')) {
          const r = learningTime >= 4 * 60 && learningTime < 12 * 60;
          if (r) {
            return r;
          }
        }
        if (filterCondition.learning_time_query.includes('type5')) {
          const r = learningTime > 12 * 60;
          if (r) {
            return r;
          }
        }
        return false;
      });
    }
    if (filterCondition.notRequired === true) {
      if (Array.isArray(workspaces.cineroomWorkspaces)) {
        displayCards = displayCards.filter(
          (c) =>
            !workspaces.cineroomWorkspaces!.some((d) =>
              c.required_cinerooms.includes(d.id)
            )
        );
      } else {
        return [];
      }
    }
    if (filterCondition.organizer_query.length > 0) {
      displayCards = displayCards.filter((c) =>
        filterCondition.organizer_query.some((d) =>
          c.cube_organizer_names.includes(d)
        )
      );
    }
    if (filterCondition.stamp === true) {
      displayCards = displayCards.filter((c) => parseInt(c.stamp_count) > 0);
    }
  }
  return displayCards;
}

export function findExpert(text_idx: string) {
  const queryOptions = parseFilterCondition();
  const companyCode = SkProfileService.instance.profileMemberCompanyCode;
  const query = makeQuery(text_idx, companyCode, queryOptions);
  const url = encodeURI(
    `${BASE_URL}?select=channel_name,department,id,name,photo_id,position&from=expert.expert&where=text_idx='${text_idx}'+allword+order+by+$MATCHFIELD(name,+department)${query}&offset=0&limit=96&t=${Date.now()}`
  );
  return axiosApi
    .get<SearchResult<SearchExpert>>(url)
    .then(AxiosReturn)
    .then((c) => {
      if (c === undefined) {
        return undefined;
      }
      if (c.status !== undefined) {
        return c;
      }
      if ((c as unknown as string).replace !== undefined) {
        let s = JSON.stringify(c);
        s = s.replace(/\"{/gi, '{').replace(/}\"/gi, '}');
        s = s.replace(/\\\"/gi, '"');
        s = s.replace(/\\\\\"/gi, '\\"');
        try {
          return JSON.parse(s) as SearchResult<SearchExpert>;
        } catch (error) {
          return undefined;
        }
      }
    });
}

export interface QueryOptions {
  all_college_name_query: string[];
  difficulty_level_json_query: string[];
  learning_time_query: number[];
  organizer_query: string[];
  cube_type_query: string[];
  reqCom_id_query?: boolean;
  badge_query?: boolean;
  stamp_query?: boolean;
  learning_start_date_str?: string;
  learning_end_date_str?: string;
  apply_start_date_str?: string;
  apply_end_date_str?: string;
}

export function getEmptyQueryOptions(): QueryOptions {
  return {
    all_college_name_query: [],
    difficulty_level_json_query: [],
    learning_time_query: [],
    organizer_query: [],
    cube_type_query: [],
  };
}

function makePermitedCineroomsQuery() {
  if (Array.isArray(workspaces?.cineroomWorkspaces)) {
    return `(${workspaces.cineroomWorkspaces
      .map(({ id }) => `(permitted_cinerooms+IN+{${id}})`)
      .join('+or+')})`;
  }
}

function makeSubQuery(column: string, keywords: string[]) {
  return `(${keywords
    .map((keyword) => `${column}+=+'${keyword}'`)
    .join('+AND+')})`;
}

function makeLearingTimeQuery(learning_time_query: number[]) {
  function makeStartQuery(start: number) {
    if (isNaN(start)) {
      return undefined;
    }
    return `learning_time+>=+${start}`;
  }
  function makeEndQuery(end: number) {
    if (isNaN(end)) {
      return undefined;
    }
    return `learning_time+<+${end}`;
  }
  function makePartialQuery(start: number, end: number) {
    const startQuery = makeStartQuery(start);
    const endQuery = makeEndQuery(end);
    if (startQuery !== undefined && endQuery !== undefined) {
      return `${startQuery}+and+${endQuery}`;
    } else if (startQuery !== undefined) {
      return startQuery;
    } else {
      return endQuery;
    }
  }
  // 1 = 30분 미만
  // 2 = 30 ~ 60
  // 3 = 60 ~ 240
  // 4 = 240 ~ 720
  // 5 = 720 ~
  const periods: [number, number][] = [];
  if (learning_time_query.includes(1)) {
    periods.push([NaN, 30]);
  }
  if (learning_time_query.includes(2)) {
    if (periods.length > 0 && periods[periods.length - 1][1] === 30) {
      periods[periods.length - 1][1] = 60;
    } else {
      periods.push([30, 60]);
    }
  }
  if (learning_time_query.includes(3)) {
    if (periods.length > 0 && periods[periods.length - 1][1] === 60) {
      periods[periods.length - 1][1] = 240;
    } else {
      periods.push([60, 240]);
    }
  }
  if (learning_time_query.includes(4)) {
    if (periods.length > 0 && periods[periods.length - 1][1] === 240) {
      periods[periods.length - 1][1] = 240;
    } else {
      periods.push([240, 720]);
    }
  }
  if (learning_time_query.includes(5)) {
    if (periods.length > 0 && periods[periods.length - 1][1] === 720) {
      periods[periods.length - 1][1] = NaN;
    } else {
      periods.push([720, NaN]);
    }
  }
  return `(${periods
    .map(([start, end]) => makePartialQuery(start, end))
    .join('+and+')})`;
}

function makeLearingDateQuery({
  learning_start_date_str,
  learning_end_date_str,
}: {
  learning_start_date_str?: string;
  learning_end_date_str?: string;
}) {
  if (
    learning_start_date_str !== undefined &&
    learning_end_date_str !== undefined
  ) {
    return `((learning_start_date_str+>=+'${learning_start_date_str}'+AND+learning_start_date_str+<=+'${learning_end_date_str}')+OR+(learning_end_date_str+>=+'${learning_start_date_str}'+AND+learning_end_date_str+<=+'${learning_end_date_str}'))`;
  } else if (learning_start_date_str !== undefined) {
    return `(learning_start_date_str+>=+'${learning_start_date_str}'+OR+learning_end_date_str+>=+'${learning_start_date_str}')`;
  } else {
    return `(learning_start_date_str+<=+'${learning_end_date_str}'+OR+learning_end_date_str+<=+'${learning_end_date_str}')`;
  }
}

function makeApplingQuery({
  apply_start_date_str,
  apply_end_date_str,
}: {
  apply_start_date_str: string;
  apply_end_date_str: string;
}) {
  return `(apply_start_date_str+<=+'${apply_start_date_str}'+AND+apply_end_date_str+>=+'${apply_end_date_str}')`;
}

export function parseFilterCondition(): QueryOptions {
  const queryOptions = getEmptyQueryOptions();
  const collegeOptions = getCollegeOptions()!;
  const organizerOptions = getOrganizerOptions()!;
  const cubeTypeOptions = getCubeTypeOptions()!;
  const filterCondition = getFilterCondition()!;

  if (
    filterCondition.all_college_name_query.length > 0 &&
    filterCondition.all_college_name_query.length !== collegeOptions.length
  ) {
    queryOptions.all_college_name_query = [
      ...filterCondition.all_college_name_query,
    ];
  }
  if (
    filterCondition.difficulty_level_json_query.length > 0 &&
    filterCondition.difficulty_level_json_query.length !==
      CheckboxOptions.difficulty_level_json_query.length
  ) {
    queryOptions.difficulty_level_json_query = [
      ...filterCondition.difficulty_level_json_query,
    ];
  }
  if (
    filterCondition.learning_time_query.length > 0 &&
    filterCondition.learning_time_query.length !==
      CheckboxOptions.learning_time_query.length
  ) {
    queryOptions.learning_time_query = filterCondition.learning_time_query.map(
      (c) => parseInt(c)
    );
  }
  if (
    filterCondition.organizer_query.length > 0 &&
    filterCondition.organizer_query.length !== organizerOptions.length
  ) {
    queryOptions.organizer_query = [...filterCondition.organizer_query];
  }
  if (
    filterCondition.cube_type_query.length > 0 &&
    filterCondition.cube_type_query.length !== cubeTypeOptions.length
  ) {
    queryOptions.cube_type_query = [...filterCondition.cube_type_query];
  }
  if (filterCondition.hasRequired) {
    queryOptions.reqCom_id_query = true;
  }
  if (filterCondition.notRequired) {
    queryOptions.reqCom_id_query = false;
  }
  if (filterCondition.stamp) {
    queryOptions.stamp_query = true;
  }
  if (filterCondition.badge) {
    queryOptions.badge_query = true;
  }
  if (filterCondition.learning_start_date_str !== null) {
    queryOptions.learning_start_date_str = moment(
      filterCondition.learning_start_date_str
    ).format('YYYYMMDD');
  }
  if (filterCondition.learning_end_date_str !== null) {
    queryOptions.learning_end_date_str = moment(
      filterCondition.learning_end_date_str
    ).format('YYYYMMDD');
  }
  if (filterCondition.applying) {
    queryOptions.apply_start_date_str = moment(new Date()).format('YYYYMMDD');
    queryOptions.apply_end_date_str = moment(new Date()).format('YYYYMMDD');
  }

  return queryOptions;
}

export function makeQuery(
  text_idx: string,
  companyCode: string,
  options: QueryOptions
) {
  const conditions: string[] = [];
  const {
    all_college_name_query,
    difficulty_level_json_query,
    learning_time_query,
    organizer_query,
    cube_type_query,
    reqCom_id_query,
    badge_query,
    stamp_query,
    learning_start_date_str,
    learning_end_date_str,
    apply_start_date_str,
    apply_end_date_str,
  } = options;
  if (all_college_name_query.length > 0) {
    conditions.push(makeSubQuery('all_college_name', all_college_name_query));
  }
  if (difficulty_level_json_query.length > 0) {
    conditions.push(
      makeSubQuery('difficulty_level_json', difficulty_level_json_query)
    );
  }
  if (learning_time_query.length > 0) {
    conditions.push(makeLearingTimeQuery(learning_time_query));
  }
  if (organizer_query.length > 0) {
    conditions.push(makeSubQuery('organizer', organizer_query));
  }
  if (cube_type_query.length > 0) {
    conditions.push(makeSubQuery('cube_type', cube_type_query));
  }
  if (reqCom_id_query === true) {
    conditions.push(`(reqCom_id+IN+{${companyCode}})`);
  }
  if (reqCom_id_query === false) {
    conditions.push(`not+(reqCom_id+IN+{${companyCode}})`);
  }
  if (badge_query === true) {
    conditions.push(`(badge_count+=+'1')`);
  }
  if (stamp_query === true) {
    conditions.push(`(stamp_count+=+'1')`);
  }
  if (
    learning_start_date_str !== undefined ||
    learning_end_date_str !== undefined
  ) {
    conditions.push(
      makeLearingDateQuery({ learning_start_date_str, learning_end_date_str })
    );
  }
  if (apply_start_date_str !== undefined && apply_end_date_str !== undefined) {
    conditions.push(
      makeApplingQuery({ apply_start_date_str, apply_end_date_str })
    );
  }
  if (conditions.length > 0) {
    return `+AND+${conditions.join('+AND+')}`;
  }
  return ``;
}

//where=text_idx='${text_idx}'+allword+and+(subSidiaries_id+=+'${companyCode}'+or+subSidiaries_id+='ALL')
