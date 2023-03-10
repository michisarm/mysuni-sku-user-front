/* eslint-disable dot-notation */
import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useRef,
} from 'react';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxOptions from '../model/CheckBoxOption';
import {
  filterCard,
  findCard,
  findExpert,
  getEmptyQueryOptions,
  QueryOptions,
  findPreCard,
} from '../api/searchApi';
import { createStore } from '../../../community/store/Store';
import moment from 'moment';
import { reactAlert } from '@nara.platform/accent';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';
import { SearchCard, SearchCardCategory } from '../model/SearchCard';
import { CardCategory } from '../../../shared/model/CardCategory';
import { SearchExpert } from '../model/SearchExpert';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  isOnFilter: boolean;
  searchValue: string;
  closeOnFilter?: () => void;
}

const SELECT_ALL = getPolyglotText('Select All', '통검-필레팝-모두선택');
const InitialConditions: FilterCondition = {
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

export type FilterCondition = {
  all_college_name_query: string[]; // 컬리지
  cube_type_query: string[]; // 학습유형
  difficulty_level_json_query: string[]; // 난이도
  learning_time_query: string[]; // 교육기간
  organizer_query: string[]; // 교육기관
  hasRequired: boolean; // 핵인싸
  notRequired: boolean; // 핵인싸
  stamp: boolean;
  badge: boolean;
  learning_start_date_str: Date | null; // 교육일정 startDate
  learning_end_date_str: Date | null; // 교육일정 endDate
  applying: boolean; // 수강신청 가능 학습
};

export enum FilterConditionName {
  College = '컬리지',
  LearningType = '교육유형',
  DifficultyLevel = '난이도',
  LearningTime = '학습시간',
  Organizer = '교육기관',
  Required = '핵인싸',
  Certification = 'Certification',
  LearningSchedule = '교육일정',
}

export function filterConditionNamePolyglot(s: string) {
  if (s === '교육유형') {
    return getPolyglotText('교육유형', '통검-필레팝-교육유형');
  } else if (s === '컬리지') {
    return getPolyglotText('컬리지', '통검-필레팝-컬리지');
  } else if (s === '난이도') {
    return getPolyglotText('난이도', '통검-필레팝-난이도');
  } else if (s === '학습시간') {
    return getPolyglotText('학습시간', '통검-필레팝-학습시간');
  } else if (s === '교육기관') {
    return getPolyglotText('교육기관', '통검-필레팝-교육기관');
  } else if (s === '핵인싸') {
    return getPolyglotText('핵인싸', '통검-필레팝-핵인싸');
  } else if (s === 'Certification') {
    return getPolyglotText('Certification', '통검-필레팝-자격증명');
  } else if (s === '교육일정') {
    return getPolyglotText('교육일정', '통검-필레팝-교육일정');
  } else {
    return '';
  }
}

export const insiderInclude = getPolyglotText(
  '핵인싸 포함',
  '필터-핵인싸-포함'
);
export const insiderExclude = getPolyglotText(
  '핵인싸 비포함',
  '필터-핵인싸-비포함'
);
interface Options {
  key: string;
  text: string;
  value: string;
  count?: number;
}

interface Tag {
  key: string;
  text: string;
  removeMe: () => void;
}

export const [
  setFilterCondition,
  onFilterCondition,
  getFilterCondition,
  useFilterCondition,
] = createStore<FilterCondition>(InitialConditions);
export const [
  setQueryOptions,
  onQueryOptions,
  getQueryOptions,
  useQueryOptions,
] = createStore<QueryOptions>(getEmptyQueryOptions());
export const [setTags, onTags, getTags, useTags] = createStore<Tag[]>([]);
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

export const [setCard, onCard, getCard, useCard] = createStore<SearchCard[]>();
export const [setDisplayCard, onDisplayCard, getDisplayCard, useDisplayCard] =
  createStore<SearchCard[]>();

export const [setExpert, onExpert, getExpert, useExpert] =
  createStore<SearchExpert[]>();

function toggle_all_all_college_name_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const collegeOptions = getCollegeOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined ||
    collegeOptions === undefined
  ) {
    return;
  }

  const all_all_college_name_condition =
    filterCondition.all_college_name_query.length === collegeOptions.length;

  if (all_all_college_name_condition) {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: [],
    });
    const nextTags = tags.filter(
      (tag) => !collegeOptions.some((c) => c.value === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: collegeOptions.map(({ value }) => value),
    });
    const nextTags = [...tags];
    collegeOptions.forEach((c) => {
      if (!tags.some((tag) => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter((d) => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            all_college_name_query:
              mFilterCondition.all_college_name_query.filter((e) => e !== text),
          });
        };
        nextTags.push({ key: text, text, removeMe });
      }
    });
    setTags(nextTags);
  }
}

function toggle_all_difficulty_level_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const all_difficulty_level_condition =
    filterCondition.difficulty_level_json_query.length ===
    CheckBoxOptions.difficulty_level_json_query.length;

  if (all_difficulty_level_condition) {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query: [],
    });
    const nextTags = tags.filter(
      (tag) =>
        !CheckBoxOptions.difficulty_level_json_query.some(
          (c) => c.value === tag.text
        )
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query:
        CheckBoxOptions.difficulty_level_json_query.map(({ value }) => value),
    });
    const nextTags = [...tags];
    CheckBoxOptions.difficulty_level_json_query.forEach((c) => {
      if (!tags.some((tag) => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter((d) => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            difficulty_level_json_query:
              mFilterCondition.difficulty_level_json_query.filter(
                (e) => e !== text
              ),
          });
        };
        nextTags.push({ key: text, text, removeMe });
      }
    });
    setTags(nextTags);
  }
}

function toggle_all_learning_time_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const all_learning_time_condition =
    filterCondition.learning_time_query.length ===
    CheckBoxOptions.learning_time_query.length;

  if (all_learning_time_condition) {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: [],
    });
    const nextTags = tags.filter(
      (tag) =>
        !CheckBoxOptions.learning_time_query.some((c) => c.text === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: CheckBoxOptions.learning_time_query.map(
        ({ value }) => value
      ),
    });
    const nextTags = [...tags];
    CheckBoxOptions.learning_time_query.forEach((c) => {
      if (!tags.some((tag) => c.text === tag.text)) {
        const text = c.text;
        const value = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter((d) => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            learning_time_query: mFilterCondition.learning_time_query.filter(
              (e) => e !== value
            ),
          });
        };
        nextTags.push({ key: text, text, removeMe });
      }
    });
    setTags(nextTags);
  }
}

function toggle_all_organizer_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const organizerOptions = getOrganizerOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined ||
    organizerOptions === undefined
  ) {
    return;
  }
  const all_organizer_condition =
    filterCondition.organizer_query.length === organizerOptions.length;

  if (all_organizer_condition) {
    setFilterCondition({
      ...filterCondition,
      organizer_query: [],
    });
    const nextTags = tags.filter(
      (tag) => !organizerOptions.some((c) => c.value === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      organizer_query: organizerOptions.map(({ value }) => value),
    });
    const nextTags = [...tags];
    organizerOptions.forEach((c) => {
      if (!tags.some((tag) => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter((d) => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            organizer_query: mFilterCondition.organizer_query.filter(
              (e) => e !== text
            ),
          });
        };
        nextTags.push({ key: text, text, removeMe });
      }
    });
    setTags(nextTags);
  }
}

function toggle_all_cube_type_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const cubeTypeOptions = getCubeTypeOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined ||
    cubeTypeOptions === undefined
  ) {
    return;
  }
  const all_cube_type_condition =
    filterCondition.cube_type_query.length === cubeTypeOptions.length;

  if (all_cube_type_condition) {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: [],
    });
    const nextTags = tags.filter(
      (tag) => !cubeTypeOptions.some((c) => c.value === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: cubeTypeOptions.map(({ value }) => value),
    });
    const nextTags = [...tags];
    cubeTypeOptions.forEach((c) => {
      if (!tags.some((tag) => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter((d) => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            cube_type_query: mFilterCondition.cube_type_query.filter(
              (e) => e !== text
            ),
          });
        };
        nextTags.push({ key: text, text, removeMe });
      }
    });
    setTags(nextTags);
  }
}

function toggle_all_college_name_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const exist = filterCondition.all_college_name_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: filterCondition.all_college_name_query.filter(
        (c) => c !== value
      ),
    });
    const nextTags = tags.filter((tag) => tag.text !== value);
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: [
        ...filterCondition.all_college_name_query,
        value,
      ],
    });
    const nextTags = [...tags];
    const removeMe = () => {
      const mTags = getTags();
      if (mTags === undefined) {
        return;
      }
      setTags(mTags.filter((d) => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        all_college_name_query: mFilterCondition.all_college_name_query.filter(
          (e) => e !== value
        ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
    setTags(nextTags);
  }
}

function toggle_difficulty_level_json_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const exist = filterCondition.difficulty_level_json_query.some(
    (c) => c === value
  );

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query:
        filterCondition.difficulty_level_json_query.filter((c) => c !== value),
    });
    const nextTags = tags.filter((tag) => tag.text !== value);
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query: [
        ...filterCondition.difficulty_level_json_query,
        value,
      ],
    });
    const nextTags = [...tags];
    const removeMe = () => {
      const mTags = getTags();
      if (mTags === undefined) {
        return;
      }
      setTags(mTags.filter((d) => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        difficulty_level_json_query:
          mFilterCondition.difficulty_level_json_query.filter(
            (e) => e !== value
          ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
    setTags(nextTags);
  }
}

function toggle_learning_time_query(text: string, value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const exist = filterCondition.learning_time_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: filterCondition.learning_time_query.filter(
        (c) => c !== value
      ),
    });
    const nextTags = tags.filter((tag) => tag.text !== text);
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: [...filterCondition.learning_time_query, value],
    });
    const nextTags = [...tags];
    const removeMe = () => {
      const mTags = getTags();
      if (mTags === undefined) {
        return;
      }
      setTags(mTags.filter((d) => d.text !== text));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        learning_time_query: mFilterCondition.learning_time_query.filter(
          (e) => e !== value
        ),
      });
    };
    nextTags.push({ key: text, text, removeMe });
    setTags(nextTags);
  }
}

function toggle_organizer_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const exist = filterCondition.organizer_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      organizer_query: filterCondition.organizer_query.filter(
        (c) => c !== value
      ),
    });
    const nextTags = tags.filter((tag) => tag.text !== value);
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      organizer_query: [...filterCondition.organizer_query, value],
    });
    const nextTags = [...tags];
    const removeMe = () => {
      const mTags = getTags();
      if (mTags === undefined) {
        return;
      }
      setTags(mTags.filter((d) => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        organizer_query: mFilterCondition.organizer_query.filter(
          (e) => e !== value
        ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
    setTags(nextTags);
  }
}

function toggle_cube_type_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const tags = getTags();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return;
  }
  const exist = filterCondition.cube_type_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: filterCondition.cube_type_query.filter(
        (c) => c !== value
      ),
    });
    const nextTags = tags.filter((tag) => tag.text !== value);
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: [...filterCondition.cube_type_query, value],
    });
    const nextTags = [...tags];
    const removeMe = () => {
      const mTags = getTags();
      if (mTags === undefined) {
        return;
      }
      setTags(mTags.filter((d) => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        cube_type_query: mFilterCondition.cube_type_query.filter(
          (e) => e !== value
        ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
    setTags(nextTags);
  }
}

async function search(searchValue: string, closeOnFilter?: () => void) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    .replace(/&/g, ' ')
    .replace(/%/g, ' ');
  if (decodedSearchValue === '') {
    return;
  }
  if (decodedSearchValue.replace(/ /g, '').length < 2) {
    reactAlert({
      title: getPolyglotText('검색', '통검-필레팝얼-검색'),
      message: getPolyglotText(
        '두 글자 이상 입력 후 검색하셔야 합니다.',
        '통검-필레팝얼-두글자'
      ),
    });
    return;
  }
  setDisplayCard(await filterCard(getCard()));
  closeOnFilter && closeOnFilter();
  await findExpert(decodedSearchValue).then((response) => {
    if (response && response.result && response.result.rows) {
      setExpert(response.result.rows.map((c) => c.fields));
    } else {
      setExpert();
    }
  });
}

const SearchFilter: React.FC<Props> = ({
  isOnFilter,
  searchValue,
  closeOnFilter,
}) => {
  const preRef = useRef<string>('pre');
  useEffect(() => {
    setCard([]);
    setDisplayCard([]);
    const decodedSearchValue = searchValue
      .replace(/'/g, ' ')
      .replace(/&/g, ' ')
      .replace(/%/g, ' ');
    if (decodedSearchValue === '') {
      return;
    }
    if (decodedSearchValue.replace(/ /g, '').length < 2) {
      reactAlert({
        title: getPolyglotText('검색', '통검-필레팝얼-검색2'),
        message: getPolyglotText(
          '두 글자 이상 입력 후 검색하셔야 합니다.',
          '통검-필레팝얼-두글자2'
        ),
      });
      return;
    }
    findPreCard(decodedSearchValue).then((searchResult) => {
      if (searchResult === undefined) {
        setCollegeOptions([]);
        setOrganizerOptions([]);
        setCubeTypeOptions([]);
        return;
      }
      const displayCard: SearchCard[] = [];
      searchResult.result.rows
        .map((c) => c.fields)
        .forEach((c) => {
          const queries = decodedSearchValue
            .split(' ')
            .filter((c) => c.trim() !== '');
          if (c.name !== undefined && c.name !== null) {
            if (
              queries.some(
                (query) =>
                  query !== undefined &&
                  query !== null &&
                  c.name.toLowerCase().includes(query.toLowerCase())
              )
            ) {
              displayCard.push(c);
            }
          }
        });
      searchResult.result.rows
        .map((c) => c.fields)
        .forEach((c) => {
          if (!displayCard.some((d) => d.id === c.id)) {
            displayCard.push(c);
          }
        });
      setCard(displayCard);
      setDisplayCard([...displayCard]);
      const collegeOptions: Options[] = searchResult.result.rows.reduce<
        Options[]
      >((r, c) => {
        try {
          const {
            fields: { categories },
          } = c;
          const category = (
            JSON.parse(categories) as SearchCardCategory[]
          ).find((d) => d.mainCategory === 1);
          if (category !== undefined) {
            const a = r.find((d) => d.key === category.collegeId);
            if (a !== undefined) {
              a.count = (a.count || 0) + 1;
              a.text = `${a.value}(${a.count})`;
            } else {
              r.push({
                key: category.collegeId,
                value: getCollgeName(category.collegeId),
                text: `${getCollgeName(category.collegeId)}(1)`,
                count: 1,
              });
            }
          }
        } catch {
          //
        }

        return r;
      }, []);
      setCollegeOptions(collegeOptions);

      const organizerOptions: Options[] = searchResult.result.rows.reduce<
        Options[]
      >((r, c) => {
        try {
          const {
            fields: { cube_organizer_names },
          } = c;
          (JSON.parse(cube_organizer_names) as string[]).forEach(
            (organizer) => {
              const a = r.find((d) => d.key === organizer);
              if (a !== undefined) {
                a.count = (a.count || 0) + 1;
                a.text = `${a.value}(${a.count})`;
              } else {
                r.push({
                  key: organizer,
                  value: organizer,
                  text: `${organizer}(1)`,
                  count: 1,
                });
              }
            }
          );
        } catch {
          //
        }

        return r;
      }, []);
      setOrganizerOptions(organizerOptions);

      const cubeTypeOptions: Options[] = searchResult.result.rows.reduce<
        Options[]
      >((r, c) => {
        try {
          const {
            fields: { cube_types },
          } = c;
          (JSON.parse(cube_types) as string[])
            .reduce<string[]>((r, c) => {
              if (!r.includes(c)) {
                r.push(c);
              }
              return r;
            }, [])
            .forEach((cube) => {
              const a = r.find((d) => d.key === cube);
              if (a !== undefined) {
                a.count = (a.count || 0) + 1;
                a.text = `${a.value}(${a.count})`;
              } else {
                r.push({
                  key: cube,
                  value: cube,
                  text: `${cube}(1)`,
                  count: 1,
                });
              }
            });
        } catch {
          //
        }

        return r;
      }, []);
      setCubeTypeOptions(cubeTypeOptions);
      search(decodedSearchValue);
    });

    findCard(decodedSearchValue, preRef.current).then((searchResult) => {
      if (searchResult === undefined) {
        setCollegeOptions([]);
        setOrganizerOptions([]);
        setCubeTypeOptions([]);
        return;
      }
      const displayCard: SearchCard[] = [];
      searchResult.result.rows
        .map((c) => c.fields)
        .forEach((c) => {
          const queries = decodedSearchValue
            .split(' ')
            .filter((c) => c.trim() !== '');
          if (c.name !== undefined && c.name !== null) {
            if (
              queries.some(
                (query) =>
                  query !== undefined &&
                  query !== null &&
                  c.name.toLowerCase().includes(query.toLowerCase())
              )
            ) {
              displayCard.push(c);
            }
          }
        });
      searchResult.result.rows
        .map((c) => c.fields)
        .forEach((c) => {
          if (!displayCard.some((d) => d.id === c.id)) {
            displayCard.push(c);
          }
        });
      setCard(displayCard);
      setDisplayCard([...displayCard]);
      const collegeOptions: Options[] = searchResult.result.rows.reduce<
        Options[]
      >((r, c) => {
        try {
          const {
            fields: { categories },
          } = c;
          const category = (
            JSON.parse(categories) as SearchCardCategory[]
          ).find((d) => d.mainCategory === 1);
          if (category !== undefined) {
            const a = r.find((d) => d.key === category.collegeId);
            if (a !== undefined) {
              a.count = (a.count || 0) + 1;
              a.text = `${a.value}(${a.count})`;
            } else {
              r.push({
                key: category.collegeId,
                value: getCollgeName(category.collegeId),
                text: `${getCollgeName(category.collegeId)}(1)`,
                count: 1,
              });
            }
          }
        } catch {
          //
        }

        return r;
      }, []);
      setCollegeOptions(collegeOptions);

      const organizerOptions: Options[] = searchResult.result.rows.reduce<
        Options[]
      >((r, c) => {
        try {
          const {
            fields: { cube_organizer_names },
          } = c;
          (JSON.parse(cube_organizer_names) as string[]).forEach(
            (organizer) => {
              const a = r.find((d) => d.key === organizer);
              if (a !== undefined) {
                a.count = (a.count || 0) + 1;
                a.text = `${a.value}(${a.count})`;
              } else {
                r.push({
                  key: organizer,
                  value: organizer,
                  text: `${organizer}(1)`,
                  count: 1,
                });
              }
            }
          );
        } catch {
          //
        }

        return r;
      }, []);
      setOrganizerOptions(organizerOptions);

      const cubeTypeOptions: Options[] = searchResult.result.rows.reduce<
        Options[]
      >((r, c) => {
        try {
          const {
            fields: { cube_types },
          } = c;
          (JSON.parse(cube_types) as string[])
            .reduce<string[]>((r, c) => {
              if (!r.includes(c)) {
                r.push(c);
              }
              return r;
            }, [])
            .forEach((cube) => {
              const a = r.find((d) => d.key === cube);
              if (a !== undefined) {
                a.count = (a.count || 0) + 1;
                a.text = `${a.value}(${a.count})`;
              } else {
                r.push({
                  key: cube,
                  value: cube,
                  text: `${cube}(1)`,
                  count: 1,
                });
              }
            });
        } catch {
          //
        }

        return r;
      }, []);
      setCubeTypeOptions(cubeTypeOptions);
      search(decodedSearchValue);
    });

    return () => {
      setFilterCondition({ ...InitialConditions });
      setQueryOptions(getEmptyQueryOptions());
      setTags([]);
      setCollegeOptions([]);
      setOrganizerOptions([]);
      setCubeTypeOptions([]);
      setCard();
      setExpert();
      preRef.current = searchValue;
    };
  }, [searchValue]);

  const onClearAll = useCallback(() => {
    setFilterCondition(InitialConditions);
    setTags([]);
  }, []);

  const filterCondition = useFilterCondition();
  const queryOptions = useQueryOptions();
  const tags = useTags();
  const collegeOptions = useCollegeOptions();
  const organizerOptions = useOrganizerOptions();
  const cubeTypeOptions = useCubeTypeOptions();
  const [cpOpened, setCpOpened] = useState<boolean>(false);
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    tags === undefined
  ) {
    return null;
  }
  if (
    collegeOptions === undefined ||
    organizerOptions === undefined ||
    cubeTypeOptions === undefined
  ) {
    return null;
  }

  const all_all_college_name_condition =
    filterCondition.all_college_name_query.length !== 0 &&
    filterCondition.all_college_name_query.length === collegeOptions.length;

  const all_difficulty_level_condition =
    filterCondition.difficulty_level_json_query.length !== 0 &&
    filterCondition.difficulty_level_json_query.length ===
      CheckBoxOptions.difficulty_level_json_query.length;

  const all_learning_time_condition =
    filterCondition.learning_time_query.length !== 0 &&
    filterCondition.learning_time_query.length ===
      CheckBoxOptions.learning_time_query.length;

  const all_organizer_condition =
    filterCondition.organizer_query.length !== 0 &&
    filterCondition.organizer_query.length === organizerOptions.length;

  const all_cube_type_condition =
    filterCondition.cube_type_query.length !== 0 &&
    filterCondition.cube_type_query.length === cubeTypeOptions.length;

  return (
    <div className={classNames('filter-table', isOnFilter ? 'on' : '')}>
      <div className="title">
        <PolyglotText id="통검-필레팝-타이틀" defaultString="Filter" />
        <a className="result-button">
          {/* <img src={ResultBtn} alt="btn" className="result-btn-img" /> */}
          <span
            className="result-text"
            onClick={() => search(searchValue, closeOnFilter)}
          >
            <PolyglotText id="통검-필레팝-결과1" defaultString="결과보기" />
          </span>
        </a>
      </div>
      <table>
        <tbody>
          <tr>
            <th>{filterConditionNamePolyglot(FilterConditionName.College)}</th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
                checked={all_all_college_name_condition}
                onClick={toggle_all_all_college_name_query}
              />
              {collegeOptions.map((college, index) => (
                <Fragment key={`checkbox-college-${index}`}>
                  <Checkbox
                    className="base"
                    name={filterConditionNamePolyglot(
                      FilterConditionName.College
                    )}
                    label={college.text}
                    value={college.value}
                    checked={filterCondition.all_college_name_query.includes(
                      college.value
                    )}
                    onChange={() =>
                      toggle_all_college_name_query(college.value)
                    }
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>
              {filterConditionNamePolyglot(FilterConditionName.DifficultyLevel)}
            </th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
                checked={all_difficulty_level_condition}
                onClick={toggle_all_difficulty_level_query}
              />
              {CheckBoxOptions.difficulty_level_json_query.map(
                (levels, index) => (
                  <Fragment
                    key={`checkbox-difficulty_level_json_query-${index}`}
                  >
                    <Checkbox
                      className="base"
                      name={filterConditionNamePolyglot(
                        FilterConditionName.DifficultyLevel
                      )}
                      label={levels.text}
                      value={levels.value}
                      checked={filterCondition.difficulty_level_json_query.includes(
                        levels.value
                      )}
                      onChange={() =>
                        toggle_difficulty_level_json_query(levels.value)
                      }
                    />
                  </Fragment>
                )
              )}
            </td>
          </tr>
          <tr>
            <th>
              {filterConditionNamePolyglot(FilterConditionName.LearningTime)}
            </th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
                checked={all_learning_time_condition}
                onClick={toggle_all_learning_time_query}
              />
              {CheckBoxOptions.learning_time_query.map(
                (learningTime, index) => (
                  <Fragment key={`checkbox-learningTime-${index}`}>
                    <Checkbox
                      className="base"
                      name={filterConditionNamePolyglot(
                        FilterConditionName.LearningTime
                      )}
                      label={learningTime.text}
                      value={learningTime.value}
                      checked={filterCondition.learning_time_query.includes(
                        learningTime.value
                      )}
                      onChange={() =>
                        toggle_learning_time_query(
                          learningTime.text,
                          learningTime.value
                        )
                      }
                    />
                  </Fragment>
                )
              )}
            </td>
          </tr>
          <tr>
            <th>
              {filterConditionNamePolyglot(FilterConditionName.Organizer)}
              {/*확장버튼 추가*/}
              <button
                type="button"
                className={`btn_filter_extend ${cpOpened ? 'open' : ''}`}
                onClick={() => setCpOpened(!cpOpened)}
              >
                <PolyglotText id="통검-필레팝-펼치기" defaultString="펼치기" />
              </button>
              {/*<button type="button" className="btn_filter_extend">펼치기</button>*/}
            </th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
                checked={all_organizer_condition}
                onClick={toggle_all_organizer_query}
              />
              {organizerOptions
                .filter((_, i) => i < 3)
                .map((organizer, index) => (
                  <Fragment key={`checkbox-organizer-${index}`}>
                    <Checkbox
                      className="base"
                      name={filterConditionNamePolyglot(
                        FilterConditionName.Organizer
                      )}
                      label={organizer.text}
                      value={organizer.value}
                      checked={filterCondition.organizer_query.includes(
                        organizer.value
                      )}
                      onChange={() => toggle_organizer_query(organizer.value)}
                    />
                  </Fragment>
                ))}
              {/*확장 item area : 기본노출을 제외한 item들을 div로 한번 더 감싸줌.
                            확장시 'on' class 추가.*/}
              {cpOpened && (
                <div className="extend_area on">
                  {organizerOptions
                    .filter((_, i) => i >= 3)
                    .map((organizer, index) => (
                      <Checkbox
                        key={`checkbox-organizer-${index}`}
                        className="base"
                        name={filterConditionNamePolyglot(
                          FilterConditionName.Organizer
                        )}
                        label={organizer.text}
                        value={organizer.value}
                        checked={filterCondition.organizer_query.includes(
                          organizer.value
                        )}
                        onChange={() => toggle_organizer_query(organizer.value)}
                      />
                    ))}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th>
              {filterConditionNamePolyglot(FilterConditionName.LearningType)}
            </th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
                checked={all_cube_type_condition}
                onClick={toggle_all_cube_type_query}
              />
              {cubeTypeOptions.map((learningType, index) => (
                <Fragment key={`checkbox-learningType-${index}`}>
                  <Checkbox
                    className="base"
                    name={filterConditionNamePolyglot(
                      FilterConditionName.LearningType
                    )}
                    label={learningType.text}
                    value={learningType.value}
                    checked={filterCondition.cube_type_query.includes(
                      learningType.value
                    )}
                    onChange={() => toggle_cube_type_query(learningType.value)}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{filterConditionNamePolyglot(FilterConditionName.Required)}</th>
            <td>
              <Checkbox
                className="base"
                name={filterConditionNamePolyglot(FilterConditionName.Required)}
                label={`${SELECT_ALL}`}
                checked={
                  filterCondition.hasRequired && filterCondition.notRequired
                }
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  if (
                    mFilterCondition.hasRequired === false ||
                    mFilterCondition.notRequired === false
                  ) {
                    setFilterCondition({
                      ...mFilterCondition,
                      hasRequired: true,
                      notRequired: true,
                    });
                    setTags([
                      ...getTags()!.filter(
                        (c) =>
                          c.text !== insiderInclude && c.text !== insiderExclude
                      ),
                      {
                        key: insiderInclude,
                        text: insiderInclude,
                        removeMe: () => {
                          setTags(
                            getTags()!.filter((d) => d.text !== insiderInclude)
                          );
                          setFilterCondition({
                            ...getFilterCondition()!,
                            hasRequired: false,
                          });
                        },
                      },
                      {
                        key: insiderExclude,
                        text: insiderExclude,
                        removeMe: () => {
                          setTags(
                            getTags()!.filter((d) => d.text !== insiderExclude)
                          );
                          setFilterCondition({
                            ...getFilterCondition()!,
                            notRequired: false,
                          });
                        },
                      },
                    ]);
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      hasRequired: false,
                      notRequired: false,
                    });
                    setTags([
                      ...getTags()!.filter(
                        (c) =>
                          c.text !== insiderInclude && c.text !== insiderExclude
                      ),
                    ]);
                  }
                }}
              />
              <Checkbox
                className="base"
                name={filterConditionNamePolyglot(FilterConditionName.Required)}
                label={getPolyglotText('포함', '통검-필레팝-핵포함')}
                checked={filterCondition.hasRequired === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  if (mFilterCondition.hasRequired) {
                    setFilterCondition({
                      ...mFilterCondition,
                      hasRequired: false,
                    });
                    setTags(
                      getTags()!.filter((c) => c.text !== insiderInclude)
                    );
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      hasRequired: true,
                    });
                    setTags([
                      ...getTags()!,
                      {
                        key: insiderInclude,
                        text: insiderInclude,
                        removeMe: () => {
                          setTags(
                            getTags()!.filter((d) => d.text !== insiderInclude)
                          );
                          setFilterCondition({
                            ...getFilterCondition()!,
                            hasRequired: false,
                          });
                        },
                      },
                    ]);
                  }
                }}
              />
              <Checkbox
                className="base"
                name={filterConditionNamePolyglot(FilterConditionName.Required)}
                label={getPolyglotText('비포함', '통검-필레팝-핵비포')}
                checked={filterCondition.notRequired === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  if (mFilterCondition.notRequired) {
                    setFilterCondition({
                      ...mFilterCondition,
                      notRequired: false,
                    });
                    setTags(
                      getTags()!.filter((c) => c.text !== insiderExclude)
                    );
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      notRequired: true,
                    });
                    setTags([
                      ...getTags()!,
                      {
                        key: insiderExclude,
                        text: insiderExclude,
                        removeMe: () => {
                          setTags(
                            getTags()!.filter((d) => d.text !== insiderExclude)
                          );
                          setFilterCondition({
                            ...getFilterCondition()!,
                            notRequired: false,
                          });
                        },
                      },
                    ]);
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <th>
              {filterConditionNamePolyglot(FilterConditionName.Certification)}
            </th>
            <td>
              <Checkbox
                className="base"
                name={filterConditionNamePolyglot(
                  FilterConditionName.Certification
                )}
                label={`${SELECT_ALL}`}
                checked={filterCondition.stamp && filterCondition.badge}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  if (
                    mFilterCondition.stamp === false ||
                    mFilterCondition.badge === false
                  ) {
                    setFilterCondition({
                      ...mFilterCondition,
                      stamp: true,
                      badge: true,
                    });
                    setTags([
                      ...getTags()!.filter(
                        (c) => c.text !== 'Stamp' && c.text !== 'Badge'
                      ),
                      {
                        key: 'Stamp',
                        text: 'Stamp',
                        removeMe: () => {
                          setTags(getTags()!.filter((d) => d.text !== 'Stamp'));
                          setFilterCondition({
                            ...getFilterCondition()!,
                            stamp: false,
                          });
                        },
                      },
                      {
                        key: 'Badge',
                        text: 'Badge',
                        removeMe: () => {
                          setTags(getTags()!.filter((d) => d.text !== 'Badge'));
                          setFilterCondition({
                            ...getFilterCondition()!,
                            badge: false,
                          });
                        },
                      },
                    ]);
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      stamp: false,
                      badge: false,
                    });
                    setTags([
                      ...getTags()!.filter(
                        (c) => c.text !== 'Stamp' && c.text !== 'Badge'
                      ),
                    ]);
                  }
                }}
              />
              <Checkbox
                className="base"
                name={filterConditionNamePolyglot(
                  FilterConditionName.Certification
                )}
                label="Stamp"
                checked={filterCondition.stamp === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  if (mFilterCondition.stamp) {
                    setFilterCondition({
                      ...mFilterCondition,
                      stamp: false,
                    });
                    setTags(getTags()!.filter((c) => c.text !== 'Stamp'));
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      stamp: true,
                    });
                    setTags([
                      ...getTags()!,
                      {
                        key: 'Stamp',
                        text: 'Stamp',
                        removeMe: () => {
                          setTags(getTags()!.filter((d) => d.text !== 'Stamp'));
                          setFilterCondition({
                            ...getFilterCondition()!,
                            stamp: false,
                          });
                        },
                      },
                    ]);
                  }
                }}
              />
              <Checkbox
                className="base"
                name={filterConditionNamePolyglot(
                  FilterConditionName.Certification
                )}
                label="Badge"
                checked={filterCondition.badge === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  if (mFilterCondition.badge) {
                    setFilterCondition({
                      ...mFilterCondition,
                      badge: false,
                    });
                    setTags(getTags()!.filter((c) => c.text !== 'Badge'));
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      badge: true,
                    });
                    setTags([
                      ...getTags()!,
                      {
                        key: 'Badge',
                        text: 'Badge',
                        removeMe: () => {
                          setTags(getTags()!.filter((d) => d.text !== 'Badge'));
                          setFilterCondition({
                            ...getFilterCondition()!,
                            badge: false,
                          });
                        },
                      },
                    ]);
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <th>
              {filterConditionNamePolyglot(
                FilterConditionName.LearningSchedule
              )}
            </th>
            <td>
              <div className="calendar-cell">
                <div className="ui h40 calendar" id="rangeStart">
                  <div className="ui input right icon">
                    <label>
                      <PolyglotText
                        id="통검-필레팝-시작일"
                        defaultString="시작일"
                      />
                    </label>
                    <DatePicker
                      selected={filterCondition.learning_start_date_str}
                      onChange={(learning_start_date_str) => {
                        const mFilterCondition = getFilterCondition();
                        const mtags = getTags();
                        if (
                          mFilterCondition === undefined ||
                          mtags === undefined
                        ) {
                          return;
                        }
                        setFilterCondition({
                          ...mFilterCondition,
                          learning_start_date_str,
                        });

                        const nextTags = mtags.filter(
                          (c) =>
                            c.key !== 'learning_start_date_str' &&
                            c.key !== 'learning_end_date_str' &&
                            c.key !== 'learning_date_str'
                        );

                        //tag
                        if (mFilterCondition.learning_end_date_str !== null) {
                          const text = `${moment(
                            learning_start_date_str
                          ).format('YYYY.MM.DD')}~${moment(
                            mFilterCondition.learning_end_date_str
                          ).format('YYYY.MM.DD')}`;
                          const key = 'learning_date_str';

                          const removeMe = () => {
                            const mmtags = getTags();
                            if (mmtags === undefined) {
                              return;
                            }

                            setTags(
                              mmtags.filter(
                                (c) =>
                                  c.key !== 'learning_start_date_str' &&
                                  c.key !== 'learning_end_date_str' &&
                                  c.key !== 'learning_date_str'
                              )
                            );
                            setFilterCondition({
                              ...getFilterCondition()!,
                              learning_start_date_str: null,
                              learning_end_date_str: null,
                            });
                          };
                          setTags([...nextTags, { key, text, removeMe }]);
                          return;
                        }
                        const text = moment(learning_start_date_str).format(
                          'YYYY.MM.DD'
                        );
                        const removeMe = () => {
                          const mmtags = getTags();
                          if (mmtags === undefined) {
                            return;
                          }
                          setTags(
                            mmtags.filter(
                              (c) =>
                                c.key !== 'learning_start_date_str' &&
                                c.key !== 'learning_end_date_str' &&
                                c.key !== 'learning_date_str'
                            )
                          );
                          setFilterCondition({
                            ...getFilterCondition()!,
                            learning_start_date_str: null,
                            learning_end_date_str: null,
                          });
                        };
                        setTags([
                          ...nextTags,
                          { key: 'learning_start_date_str', text, removeMe },
                        ]);
                      }}
                      selectsStart
                      dateFormat="yyyy.MM.dd"
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
                <span className="dash">-</span>
                <div className="ui h40 calendar" id="rangeEnd">
                  <div className="ui input right icon">
                    <label>
                      <PolyglotText
                        id="통검-필레팝-종료일"
                        defaultString="종료일"
                      />
                    </label>
                    <DatePicker
                      selected={filterCondition.learning_end_date_str}
                      onChange={(learning_end_date_str) => {
                        const mFilterCondition = getFilterCondition();
                        const mtags = getTags();
                        if (
                          mFilterCondition === undefined ||
                          mtags === undefined
                        ) {
                          return;
                        }
                        setFilterCondition({
                          ...mFilterCondition,
                          learning_end_date_str,
                        });

                        const nextTags = mtags.filter(
                          (c) =>
                            c.key !== 'learning_start_date_str' &&
                            c.key !== 'learning_end_date_str' &&
                            c.key !== 'learning_date_str'
                        );

                        //tag
                        if (mFilterCondition.learning_start_date_str !== null) {
                          const text = `${moment(
                            mFilterCondition.learning_start_date_str
                          ).format('YYYY.MM.DD')}~${moment(
                            learning_end_date_str
                          ).format('YYYY.MM.DD')}`;
                          const key = 'learning_date_str';

                          const removeMe = () => {
                            const mmtags = getTags();
                            if (mmtags === undefined) {
                              return;
                            }

                            setTags(
                              mmtags.filter(
                                (c) =>
                                  c.key !== 'learning_start_date_str' &&
                                  c.key !== 'learning_end_date_str' &&
                                  c.key !== 'learning_date_str'
                              )
                            );
                            setFilterCondition({
                              ...getFilterCondition()!,
                              learning_start_date_str: null,
                              learning_end_date_str: null,
                            });
                          };
                          setTags([...nextTags, { key, text, removeMe }]);
                          return;
                        }
                        const text = moment(learning_end_date_str).format(
                          'YYYY.MM.DD'
                        );
                        const removeMe = () => {
                          const mmtags = getTags();
                          if (mmtags === undefined) {
                            return;
                          }
                          setTags(
                            mmtags.filter(
                              (c) =>
                                c.key !== 'learning_start_date_str' &&
                                c.key !== 'learning_end_date_str' &&
                                c.key !== 'learning_date_str'
                            )
                          );
                          setFilterCondition({
                            ...getFilterCondition()!,
                            learning_start_date_str: null,
                            learning_end_date_str: null,
                          });
                        };
                        setTags([
                          ...nextTags,
                          { key: 'learning_start_date_str', text, removeMe },
                        ]);
                      }}
                      selectsEnd
                      minDate={filterCondition.learning_start_date_str}
                      dateFormat="yyyy.MM.dd"
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
              </div>
              <Checkbox
                className="base"
                label={getPolyglotText(
                  '수강신청 가능 학습만 보기',
                  '통검-필레팝-날짜옵션'
                )}
                value="true"
                checked={filterCondition.applying}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  const text = getPolyglotText(
                    '수강신청 가능 학습만 보기',
                    '통검-필레팝-날짜옵션'
                  );
                  if (mFilterCondition.applying) {
                    setFilterCondition({
                      ...mFilterCondition,
                      applying: false,
                    });
                    setTags(getTags()!.filter((c) => c.text !== text));
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      applying: true,
                    });
                    setTags([
                      ...getTags()!,
                      {
                        key: text,
                        text,
                        removeMe: () => {
                          setFilterCondition({
                            ...getFilterCondition()!,
                            applying: false,
                          });
                          setTags(getTags()!.filter((c) => c.text !== text));
                        },
                      },
                    ]);
                  }
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="selected">
        <table>
          <tbody>
            <tr>
              <th>
                <button className="clear" onClick={onClearAll}>
                  <Icon className="reset" />
                  <span className="blind">reset</span>
                </button>
                <span>
                  <PolyglotText
                    id="통검-필레팝-전체해제"
                    defaultString="전체해제"
                  />
                </span>
              </th>
              <td>
                {tags.map((tag, index) => (
                  <Button
                    key={index}
                    className="del"
                    content={tag.text}
                    onClick={tag.removeMe}
                  />
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="moreAll">
        <a
          className="more-text"
          onClick={() => {
            search(searchValue, closeOnFilter);
          }}
        >
          <PolyglotText id="통검-필레팝-결과2" defaultString="결과보기" />
        </a>
      </div>
    </div>
  );
};

export default SearchFilter;
