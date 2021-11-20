//import { createStore } from './store/createStore';
import { PageElement } from 'lecture/shared/model/PageElement';
import { createStore } from 'shared/store/Store';
import { getEmptyQueryOptions, QueryOptions } from './api/searchApi';
import {
  SearchLecture,
  SearchBadge,
  SearchUI,
  SearchCommunity,
  SearchInstructor,
  FilterCondition,
  Options,
  SearchCard,
  SearchExpert,
  SearchSuggestion,
} from './search.models';

export const [setSearchUI, onSearchUI, getSearchUI, useSearchUI] =
  createStore<SearchUI>();

// 필터
export const InitialConditions: FilterCondition = {
  all_college_name_query: [],
  cube_type_query: [],
  difficulty_level_json_query: [],
  learning_time_query: [],
  organizer_query: [],
  stamp: false,
  badge: false,
  hasRequired: false,
  notRequired: false,
  learning_start_date_str: null,
  learning_end_date_str: null,
  applying: null,
  support_lang_json_query: [],
};

export const [
  setFilterCondition,
  onFilterCondition,
  getFilterCondition,
  useFilterCondition,
] = createStore<FilterCondition>(InitialConditions);

export const [
  setCollegeOptions,
  onCollegeOptions,
  getCollegeOptions,
  useCollegeOptions,
] = createStore<Options[]>([]);
export const [
  setOrganizerOptions,
  onOrganizerOptions,
  getOrganizerOptions,
  useOrganizerOptions,
] = createStore<Options[]>([]);
export const [
  setCubeTypeOptions,
  onCubeTypeOptions,
  getCubeTypeOptions,
  useCubeTypeOptions,
] = createStore<Options[]>([]);
export const [
  setQueryOptions,
  onQueryOptions,
  getQueryOptions,
  useQueryOptions,
] = createStore<QueryOptions>(getEmptyQueryOptions());
//  // 필터
export const [setCard, onCard, getCard, useCard] = createStore<SearchCard[]>();
export const [setDisplayCard, onDisplayCard, getDisplayCard, useDisplayCard] =
  createStore<SearchCard[]>();
export const [setExpert, onExpert, getExpert, useExpert] =
  createStore<SearchExpert[]>();
export const [setAllowedCard, onAllowedCard, getAllowedCard, useAllowedCard] =
  createStore<SearchCard[]>();
export const [setExpertOri, onExpertOri, getExpertOri, useExpertOri] =
  createStore<SearchExpert[]>();

export const [setPreRef, onPreRef, getPreRef, usePreRef] =
  createStore<string>('pre');
// 결과 목록
export const [
  setSearchLectureList,
  onSearchLectureList,
  getSearchLectureList,
  useSearchLectureList,
] = createStore<SearchLecture[]>([]);

export const [
  setSearchBadgeList,
  onSearchBadgeList,
  getSearchBadgeList,
  useSearchBadgeList,
] = createStore<SearchBadge[]>([]);

export const [
  setSearchCommunityList,
  onSearchCommunityList,
  getSearchCommunityList,
  useSearchCommunityList,
] = createStore<SearchCommunity[]>([]);

export const [
  setSearchBadgeOriList,
  onSearchBadgeOriList,
  getSearchBadgeOriList,
  useSearchBadgeOriList,
] = createStore<SearchBadge[]>([]);

export const [
  setSearchCommunityOriList,
  onSearchCommunityOriList,
  getSearchCommunityOriList,
  useSearchCommunityOriList,
] = createStore<SearchCommunity[]>([]);

export const [
  setSearchInstructorList,
  onSearchInstructorList,
  getSearchInstructorList,
  useSearchInstructorList,
] = createStore<SearchInstructor[]>([]);
//  // 결과 목록

// 최근검색어
export const [
  setSearchRecentList,
  onSearchRecentList,
  getSearchRecentList,
  useSearchRecentList,
] = createStore<string[]>([]);
// 인기검색어
export const [
  setSearchPopular1MList,
  onSearchPopular1MList,
  getSearchPopular1MList,
  useSearchPopular1MList,
] = createStore<string[]>([]);
export const [
  setSearchPopular6MList,
  onSearchPopular6MList,
  getSearchPopular6MList,
  useSearchPopular6MList,
] = createStore<string[]>([]);
export const [
  setSearchPopular1YList,
  onSearchPopular1YList,
  getSearchPopular1YList,
  useSearchPopular1YList,
] = createStore<string[]>([]);
// 연관검색어
export const [
  setSearchRelatedList,
  onSearchRelatedList,
  getSearchRelatedList,
  useSearchRelatedList,
] = createStore<string[]>([]);

// // 결과내재검색
// const InitialSearchInSearchInfo = {
//   checkSearchInSearch: false,
//   parentSearchValue: '',
//   searchValue: '',
// };
// export const [
//   setSearchInSearchInfo,
//   onSearchInSearchInfo,
//   getSearchInSearchInfo,
//   useSearchInSearchInfo,
// ] = createStore(InitialSearchInSearchInfo);

export const [setMenuAuth, onMenuAuth, getMenuAuth, useMenuAuth] = createStore<
  PageElement[]
>([]);
