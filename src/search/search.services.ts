//import { createStore } from './store/createStore';
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
  applying: false,
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
