/* eslint-disable dot-notation */
import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxOptions from '../model/CheckBoxOption';
import {
  findColleageGroup,
  findCPGroup,
  findCubeTypeGroup,
  getEmptyQueryOptions,
  QueryOptions,
} from '../api/searchApi';
import { createStore } from '../../community/store/Store';

interface Props {
  isOnFilter: boolean;
  searchValue: string;
}

const SELECT_ALL = 'Select All';
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

interface Options {
  key: string;
  text: string;
  value: string;
}

interface Tag {
  key: string;
  text: string;
  removeMe: () => void;
}

const [
  setFilterCondition,
  onFilterCondition,
  getFilterCondition,
  useFilterCondition,
] = createStore<FilterCondition>(InitialConditions);
const [
  setQueryOptions,
  onQueryOptions,
  getQueryOptions,
  useQueryOptions,
] = createStore<QueryOptions>(getEmptyQueryOptions());
const [setTags, onTags, getTags, useTags] = createStore<Tag[]>([]);
const [
  setCollegeOptions,
  onCollegeOptions,
  getCollegeOptions,
  useCollegeOptions,
] = createStore<Options[]>([]);
const [
  setOrganizerOptions,
  onOrganizerOptions,
  getOrganizerOptions,
  useOrganizerOptions,
] = createStore<Options[]>([]);
const [
  setCubeTypeOptions,
  onCubeTypeOptions,
  getCubeTypeOptions,
  useCubeTypeOptions,
] = createStore<Options[]>([]);

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
      tag => !collegeOptions.some(c => c.value === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: collegeOptions.map(({ value }) => value),
    });
    const nextTags = [...tags];
    collegeOptions.forEach(c => {
      if (!tags.some(tag => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter(d => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            all_college_name_query: mFilterCondition.all_college_name_query.filter(
              e => e !== text
            ),
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
      tag =>
        !CheckBoxOptions.difficulty_level_json_query.some(
          c => c.value === tag.text
        )
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query: CheckBoxOptions.difficulty_level_json_query.map(
        ({ value }) => value
      ),
    });
    const nextTags = [...tags];
    CheckBoxOptions.difficulty_level_json_query.forEach(c => {
      if (!tags.some(tag => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter(d => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            difficulty_level_json_query: mFilterCondition.difficulty_level_json_query.filter(
              e => e !== text
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
      tag =>
        !CheckBoxOptions.learning_time_query.some(c => c.value === tag.text)
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
    CheckBoxOptions.learning_time_query.forEach(c => {
      if (!tags.some(tag => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter(d => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            learning_time_query: mFilterCondition.learning_time_query.filter(
              e => e !== text
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
      tag => !organizerOptions.some(c => c.value === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      organizer_query: organizerOptions.map(({ value }) => value),
    });
    const nextTags = [...tags];
    organizerOptions.forEach(c => {
      if (!tags.some(tag => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter(d => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            organizer_query: mFilterCondition.organizer_query.filter(
              e => e !== text
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
      tag => !cubeTypeOptions.some(c => c.value === tag.text)
    );
    setTags(nextTags);
  } else {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: cubeTypeOptions.map(({ value }) => value),
    });
    const nextTags = [...tags];
    cubeTypeOptions.forEach(c => {
      if (!tags.some(tag => c.value === tag.text)) {
        const text = c.value;
        const removeMe = () => {
          const mTags = getTags();
          if (mTags === undefined) {
            return;
          }
          setTags(mTags.filter(d => d.text !== text));
          const mFilterCondition = getFilterCondition();
          if (mFilterCondition === undefined) {
            return;
          }
          setFilterCondition({
            ...mFilterCondition,
            cube_type_query: mFilterCondition.cube_type_query.filter(
              e => e !== text
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
  const exist = filterCondition.all_college_name_query.some(c => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: filterCondition.all_college_name_query.filter(
        c => c !== value
      ),
    });
    const nextTags = tags.filter(tag => tag.text !== value);
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
      setTags(mTags.filter(d => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        all_college_name_query: mFilterCondition.all_college_name_query.filter(
          e => e !== value
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
    c => c === value
  );

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query: filterCondition.difficulty_level_json_query.filter(
        c => c !== value
      ),
    });
    const nextTags = tags.filter(tag => tag.text !== value);
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
      setTags(mTags.filter(d => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        difficulty_level_json_query: mFilterCondition.difficulty_level_json_query.filter(
          e => e !== value
        ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
    setTags(nextTags);
  }
}

function toggle_learning_time_query(value: string) {
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
  const exist = filterCondition.learning_time_query.some(c => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: filterCondition.learning_time_query.filter(
        c => c !== value
      ),
    });
    const nextTags = tags.filter(tag => tag.text !== value);
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
      setTags(mTags.filter(d => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        learning_time_query: mFilterCondition.learning_time_query.filter(
          e => e !== value
        ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
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
  const exist = filterCondition.organizer_query.some(c => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      organizer_query: filterCondition.organizer_query.filter(c => c !== value),
    });
    const nextTags = tags.filter(tag => tag.text !== value);
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
      setTags(mTags.filter(d => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        organizer_query: mFilterCondition.organizer_query.filter(
          e => e !== value
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
  const exist = filterCondition.cube_type_query.some(c => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: filterCondition.cube_type_query.filter(c => c !== value),
    });
    const nextTags = tags.filter(tag => tag.text !== value);
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
      setTags(mTags.filter(d => d.text !== value));
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        cube_type_query: mFilterCondition.cube_type_query.filter(
          e => e !== value
        ),
      });
    };
    nextTags.push({ key: value, text: value, removeMe });
    setTags(nextTags);
  }
}

const SearchFilter: React.FC<Props> = ({ isOnFilter, searchValue }) => {
  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    findColleageGroup(searchValue).then(searchResult => {
      if (searchResult === undefined) {
        setCollegeOptions([]);
      } else {
        setCollegeOptions(
          searchResult.result.rows.map(({ fields }) => ({
            key: fields['all_college_name'],
            value: fields['all_college_name'],
            text: `${fields['all_college_name']}(${fields['count(*)']})`,
          }))
        );
      }
    });
    findCPGroup(searchValue).then(searchResult => {
      if (searchResult === undefined) {
        setOrganizerOptions([]);
      } else {
        setOrganizerOptions(
          searchResult.result.rows.map(({ fields }) => ({
            key: fields['organizer'],
            value: fields['organizer'],
            text: `${fields['organizer']}(${fields['count(*)']})`,
          }))
        );
      }
    });
    findCubeTypeGroup(searchValue).then(searchResult => {
      if (searchResult === undefined) {
        setCubeTypeOptions([]);
      } else {
        setCubeTypeOptions(
          searchResult.result.rows.map(({ fields }) => ({
            key: fields['cube_type'],
            value: fields['cube_type'],
            text: `${fields['cube_type']}(${fields['count(*)']})`,
          }))
        );
      }
    });
    return () => {
      setFilterCondition({ ...InitialConditions });
      setQueryOptions(getEmptyQueryOptions());
      setTags([]);
      setCollegeOptions([]);
      setOrganizerOptions([]);
      setCubeTypeOptions([]);
    };
  }, [searchValue]);

  const onClearAll = useCallback(() => {
    setFilterCondition(InitialConditions);
  }, []);

  const filterCondition = useFilterCondition();
  const queryOptions = useQueryOptions();
  const tags = useTags();
  const collegeOptions = useCollegeOptions();
  const organizerOptions = useOrganizerOptions();
  const cubeTypeOptions = useCubeTypeOptions();
  const [cpOpened, setCpOpened] = useState<boolean>(true);
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
    filterCondition.all_college_name_query.length === collegeOptions.length;

  const all_difficulty_level_condition =
    filterCondition.difficulty_level_json_query.length ===
    CheckBoxOptions.difficulty_level_json_query.length;

  const all_learning_time_condition =
    filterCondition.learning_time_query.length ===
    CheckBoxOptions.learning_time_query.length;

  const all_organizer_condition =
    filterCondition.organizer_query.length === organizerOptions.length;

  const all_cube_type_condition =
    filterCondition.cube_type_query.length === cubeTypeOptions.length;

  return (
    <div className={classNames('filter-table', isOnFilter ? 'on' : '')}>
      <div className="title">
        Filter
        <a className="result-button">
          {/* <img src={ResultBtn} alt="btn" className="result-btn-img" /> */}
          <span className="result-text">결과보기</span>
        </a>
      </div>
      <table>
        <tbody>
          <tr>
            <th>{FilterConditionName.College}</th>
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
                    name={FilterConditionName.College}
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
            <th>{FilterConditionName.DifficultyLevel}</th>
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
                      name={FilterConditionName.DifficultyLevel}
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
            <th>{FilterConditionName.LearningTime}</th>
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
                      name={FilterConditionName.LearningTime}
                      label={learningTime.text}
                      value={learningTime.value}
                      checked={filterCondition.learning_time_query.includes(
                        learningTime.value
                      )}
                      onChange={() =>
                        toggle_learning_time_query(learningTime.value)
                      }
                    />
                  </Fragment>
                )
              )}
            </td>
          </tr>
          <tr>
            <th>
              {FilterConditionName.Organizer}
              {/*확장버튼 추가*/}
              <button
                type="button"
                className={`btn_filter_extend ${cpOpened ? 'open' : ''}`}
                onClick={() => setCpOpened(!cpOpened)}
              >
                펼치기
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
                      name={FilterConditionName.Organizer}
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
                        name={FilterConditionName.Organizer}
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
            <th>{FilterConditionName.LearningType}</th>
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
                    name={FilterConditionName.LearningType}
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
            <th>{FilterConditionName.Required}</th>
            <td>
              <Checkbox
                className="base"
                name={FilterConditionName.Required}
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
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      hasRequired: false,
                      notRequired: false,
                    });
                  }
                }}
              />
              <Checkbox
                className="base"
                name={FilterConditionName.Required}
                label="포함"
                checked={filterCondition.hasRequired === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  setFilterCondition({
                    ...mFilterCondition,
                    hasRequired: !mFilterCondition.hasRequired,
                  });
                }}
              />
              <Checkbox
                className="base"
                name={FilterConditionName.Required}
                label="비포함"
                checked={filterCondition.notRequired === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  setFilterCondition({
                    ...mFilterCondition,
                    notRequired: !mFilterCondition.notRequired,
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.Certification}</th>
            <td>
              <Checkbox
                className="base"
                name={FilterConditionName.Certification}
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
                  } else {
                    setFilterCondition({
                      ...mFilterCondition,
                      stamp: false,
                      badge: false,
                    });
                  }
                }}
              />
              <Checkbox
                className="base"
                name={FilterConditionName.Certification}
                label="Stamp"
                checked={filterCondition.stamp === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  setFilterCondition({
                    ...mFilterCondition,
                    stamp: !mFilterCondition.stamp,
                  });
                }}
              />
              <Checkbox
                className="base"
                name={FilterConditionName.Certification}
                label="Badge"
                checked={filterCondition.badge === true}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  setFilterCondition({
                    ...mFilterCondition,
                    badge: !mFilterCondition.badge,
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.LearningSchedule}</th>
            <td>
              <div className="calendar-cell">
                <div className="ui h40 calendar" id="rangeStart">
                  <div className="ui input right icon">
                    <label>시작일</label>
                    <DatePicker
                      selected={filterCondition.learning_start_date_str}
                      onChange={learning_start_date_str => {
                        const mFilterCondition = getFilterCondition();
                        if (mFilterCondition === undefined) {
                          return;
                        }
                        setFilterCondition({
                          ...mFilterCondition,
                          learning_start_date_str,
                        });
                      }}
                      selectsStart
                      dateFormat="YYYY.MM.DD"
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
                <span className="dash">-</span>
                <div className="ui h40 calendar" id="rangeEnd">
                  <div className="ui input right icon">
                    <label>종료일</label>
                    <DatePicker
                      selected={filterCondition.learning_end_date_str}
                      onChange={learning_end_date_str => {
                        const mFilterCondition = getFilterCondition();
                        if (mFilterCondition === undefined) {
                          return;
                        }
                        setFilterCondition({
                          ...mFilterCondition,
                          learning_end_date_str,
                        });
                      }}
                      selectsEnd
                      minDate={filterCondition.learning_start_date_str}
                      dateFormat="YYYY.MM.DD"
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
              </div>
              <Checkbox
                className="base"
                label="수강신청 가능 학습만 보기"
                value="true"
                checked={filterCondition.applying}
                onChange={() => {
                  const mFilterCondition = getFilterCondition();
                  if (mFilterCondition === undefined) {
                    return;
                  }
                  setFilterCondition({
                    ...mFilterCondition,
                    applying: !filterCondition.applying,
                  });
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
                <span>전체해제</span>
              </th>
              {tags.map(tag => (
                <td key={tag.key}>
                  <Button
                    className="del"
                    content={tag.text}
                    onClick={tag.removeMe}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="moreAll">
        <span className="arrow-more">→</span>
        <a className="more-text">결과보기</a>
      </div>
    </div>
  );
};

export default SearchFilter;
