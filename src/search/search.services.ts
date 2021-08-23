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
  useSearchLectureList,
  setSearchLectureList,
  getSearchLectureList,
  onSearchLectureList,
] = createStore<SearchLecture[]>();

export const [
  useSearchBadgeList,
  setSearchBadgeList,
  getSearchBadgeList,
  onSearchBadgeList,
] = createStore<SearchBadge[]>();

export const [
  useSearchCommunityList,
  setSearchCommunityList,
  getSearchCommunityList,
  onSearchCommunityList,
] = createStore<SearchCommunity[]>();

export const [
  useSearchInstructorList,
  setSearchInstructorList,
  getSearchInstructorList,
  onSearchInstructorList,
] = createStore<SearchInstructor[]>();
//  // 결과 목록
