import { filterConditionNamePolyglot } from 'myTraining/model/FilterConditionName';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  filterClearAll,
  getQueryId,
  search,
  settingSearchFilter,
  toggle_all_college_name_query,
  toggle_cube_type_query,
  toggle_difficulty_level_json_query,
  toggle_learning_time_query,
} from 'search/search.events';
import { SearchParam, CheckboxOptions } from 'search/search.models';
import {
  getFilterCondition,
  setFilterCondition,
  useCollegeOptions,
  useCubeTypeOptions,
  useFilterCondition,
} from 'search/search.services';
import { Accordion, Button, Checkbox, Icon, Radio } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { CalendarView } from './CalendarView';

export function SearchContentsResultSideView() {
  //
  const [activeIndex, setActiveIndex] = useState<Number>(0);
  const [badgeOptionState, setBadgeOptionState] = useState<string>('');
  const [periodOptionState, setPeriodOptionState] = useState<string>('');
  const [collegeLimit, setCollegeLimit] = useState<Number>(5);
  const [cubeTypeLimit, setCubeTypeLimit] = useState<Number>(5);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleBadgeOptionStateChange = (e: any, value: any) => {
    setBadgeOptionState(value.value);
  };

  const handlePeriodOptionStateChange = (e: any, value: any) => {
    setPeriodOptionState(value.value);
  };

  const params = useParams<SearchParam>();
  const queryId = getQueryId();
  useEffect(() => {
    settingSearchFilter({
      isOnFilter: undefined,
      searchValue: queryId,
      closeOnFilter: undefined,
    });
    setCollegeLimit(5);
    setCubeTypeLimit(5);
  }, [queryId]);

  const filterCondition = useFilterCondition();
  const collegeOptions = useCollegeOptions();
  const cubeTypeOptions = useCubeTypeOptions();

  if (
    filterCondition === undefined ||
    collegeOptions === undefined ||
    cubeTypeOptions === undefined
  ) {
    return null;
  }

  enum FilterConditionName {
    College = '컬리지',
    LearningType = '교육유형',
    DifficultyLevel = '난이도',
    LearningTime = '학습시간',
    Organizer = '교육기관',
    Required = '핵인싸',
    Certification = 'Certification',
    LearningSchedule = '교육일정',
  }

  return (
    <>
      <div className="result_category">
        {collegeOptions && collegeOptions.length > 0 && (
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              {filterConditionNamePolyglot(FilterConditionName.College)}
              <Icon name="angle down" />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <ul>
                {collegeOptions.map((college, index) => {
                  if (index < collegeLimit) {
                    return (
                      <li>
                        <Checkbox
                          label={college.value}
                          value={college.value}
                          checked={filterCondition.all_college_name_query.includes(
                            college.value
                          )}
                          onChange={() => {
                            toggle_all_college_name_query(college.value);
                            search(queryId, params && params.searchType);
                          }}
                        />
                        <span>({college.count})</span>
                      </li>
                    );
                  }
                })}
              </ul>
              {collegeOptions.length > 5 && collegeLimit < 999 && (
                <Button
                  className="btn_more"
                  onClick={() => setCollegeLimit(999)}
                >
                  더보기
                  <Icon color="grey" name="angle down" />
                </Button>
              )}
            </Accordion.Content>
          </Accordion>
        )}
        <Accordion>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            뱃지
            <Icon name="angle down" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <ul>
              <li>
                <Radio
                  name="badgeOptions"
                  label="포함"
                  value="badgeInclude"
                  checked={badgeOptionState === 'badgeInclude'}
                  onChange={handleBadgeOptionStateChange}
                />
              </li>
              <li>
                <Radio
                  name="badgeOptions"
                  label="미포함"
                  value="badgeNotInclude"
                  checked={badgeOptionState === 'badgeNotInclude'}
                  onChange={handleBadgeOptionStateChange}
                />
              </li>
            </ul>
          </Accordion.Content>
        </Accordion>

        <Accordion>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            {filterConditionNamePolyglot(FilterConditionName.LearningSchedule)}
            <Icon name="angle down" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <ul>
              <li>
                <Radio
                  name="periodOptions"
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
                    setFilterCondition({
                      ...mFilterCondition,
                      applying: true,
                    });
                  }}
                />
              </li>
              <li>
                <Radio
                  name="periodOptions"
                  label="직접입력"
                  value="false"
                  checked={!filterCondition.applying}
                  onChange={() => {
                    const mFilterCondition = getFilterCondition();
                    if (mFilterCondition === undefined) {
                      return;
                    }
                    const text = getPolyglotText(
                      '수강신청 가능 학습만 보기',
                      '통검-필레팝-날짜옵션'
                    );
                    setFilterCondition({
                      ...mFilterCondition,
                      applying: false,
                    });
                    search(queryId, params && params.searchType);
                  }}
                />
                <CalendarView filterCondition={filterCondition} />
              </li>
            </ul>
          </Accordion.Content>
        </Accordion>

        <Accordion>
          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={handleClick}
          >
            {filterConditionNamePolyglot(FilterConditionName.DifficultyLevel)}
            <Icon name="angle down" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <ul>
              {CheckboxOptions.difficulty_level_json_query.map(
                (levels, index) => (
                  <li>
                    <Checkbox
                      label={levels.text}
                      value={levels.value}
                      checked={filterCondition.difficulty_level_json_query.includes(
                        levels.value
                      )}
                      onChange={() => {
                        toggle_difficulty_level_json_query(levels.value);
                        search(queryId, params && params.searchType);
                      }}
                    />
                    <span />
                  </li>
                )
              )}
            </ul>
          </Accordion.Content>
        </Accordion>

        {cubeTypeOptions && cubeTypeOptions.length > 0 && (
          <Accordion>
            <Accordion.Title
              active={activeIndex === 4}
              index={4}
              onClick={handleClick}
            >
              {filterConditionNamePolyglot(FilterConditionName.LearningType)}
              <Icon name="angle down" />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 4}>
              <ul>
                {cubeTypeOptions.map((learningType, index) => {
                  if (index < cubeTypeLimit) {
                    return (
                      <li>
                        <Checkbox
                          label={learningType.value}
                          value={learningType.value}
                          checked={filterCondition.cube_type_query.includes(
                            learningType.value
                          )}
                          onChange={() =>
                            toggle_cube_type_query(learningType.value)
                          }
                        />
                        <span>({learningType.count})</span>
                      </li>
                    );
                  }
                })}
              </ul>
              {cubeTypeOptions.length > 5 && cubeTypeLimit < 999 && (
                <Button
                  className="btn_more"
                  onClick={() => setCubeTypeLimit(999)}
                >
                  더보기
                  <Icon color="grey" name="angle down" />
                </Button>
              )}
            </Accordion.Content>
          </Accordion>
        )}

        <Accordion>
          <Accordion.Title
            active={activeIndex === 5}
            index={5}
            onClick={handleClick}
          >
            {filterConditionNamePolyglot(FilterConditionName.LearningTime)}
            <Icon name="angle down" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 5}>
            <ul>
              {CheckboxOptions.learning_time_query.map(
                (learningTime, index) => (
                  <li>
                    <Checkbox
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
                  </li>
                )
              )}
            </ul>
          </Accordion.Content>
        </Accordion>

        <Button
          className="btn_reset"
          onClick={() => {
            filterClearAll();
            search(queryId, params && params.searchType);
          }}
        >
          <Icon name="undo" />
          <PolyglotText id="통검-필레팝-전체해제" defaultString="전체해제" />
        </Button>
      </div>
    </>
  );
}
