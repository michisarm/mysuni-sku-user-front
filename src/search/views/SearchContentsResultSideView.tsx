import React, { useEffect, useState } from 'react';
import { Accordion, Button, Checkbox, Icon, Radio } from 'semantic-ui-react';
import { filterConditionNamePolyglot } from '../../myTraining/model/FilterConditionName';
import {
  filterClearAll,
  filterClickSearch,
  getQueryId,
  settingSearchFilter,
  toggle_all_college_name_query,
  toggle_cube_type_query,
  toggle_difficulty_level_json_query,
  toggle_learning_time_query,
  toggle_support_lang_json_query,
} from '../../search/search.events';
import { CheckboxOptions } from '../../search/search.models';
import {
  getAllowedCard,
  getSearchUI,
  setFilterCondition,
  useCollegeOptions,
  useCubeTypeOptions,
  useFilterCondition,
} from '../../search/search.services';
import {
  getPolyglotText,
  PolyglotText,
} from '../../shared/ui/logic/PolyglotText';
import { CalendarView } from './CalendarView';

export function SearchContentsResultSideView() {
  //
  const initialConditionLimit = 999;
  const [activeIndex, setActiveIndex] = useState<Number>(-1);
  const [collegeLimit, setCollegeLimit] = useState<Number>(
    initialConditionLimit
  );
  const [cubeTypeLimit, setCubeTypeLimit] = useState<Number>(
    initialConditionLimit
  );

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const onClickFilterSearch = () => {
    filterClickSearch();
  };

  // const params = useParams<SearchParam>();
  const queryId = getQueryId();
  const allowedCard = getAllowedCard();
  // const card = getDisplayCard();
  useEffect(() => {
    settingSearchFilter(queryId);
    setCollegeLimit(initialConditionLimit);
    setCubeTypeLimit(initialConditionLimit);
  }, [allowedCard]);

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

  // const all_all_college_name_condition =
  //   filterCondition.all_college_name_query.length !== 0 &&
  //   filterCondition.all_college_name_query.length === collegeOptions.length;

  // const all_difficulty_level_condition =
  //   filterCondition.difficulty_level_json_query.length !== 0 &&
  //   filterCondition.difficulty_level_json_query.length ===
  //     CheckboxOptions.difficulty_level_json_query.length;

  // const all_cube_type_condition =
  //   filterCondition.cube_type_query.length !== 0 &&
  //   filterCondition.cube_type_query.length === cubeTypeOptions.length;

  // const all_learning_time_condition =
  //   filterCondition.learning_time_query.length !== 0 &&
  //   filterCondition.learning_time_query.length ===
  //     CheckboxOptions.learning_time_query.length;

  enum FilterConditionName {
    College = 'College',
    LearningType = '교육유형',
    DifficultyLevel = '난이도',
    LearningTime = '학습시간',
    Organizer = '교육기관',
    Required = '핵인싸',
    Certification = 'Certification',
    LearningSchedule = '교육일정',
    SupportLanguage = '지원언어',
  }
  // const SELECT_ALL = getPolyglotText('Select All', '통검-필레팝-모두선택');

  const searchUI = getSearchUI();

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
            <Accordion.Content active={activeIndex === 0} className="sty2">
              <Button
                className="deselect"
                onClick={() => {
                  setFilterCondition({
                    ...filterCondition,
                    all_college_name_query: [],
                  });
                  onClickFilterSearch();
                }}
              >
                <Icon className="close-grey" />
                <PolyglotText
                  id="통검-필레팝-선택해제"
                  defaultString="선택 해제"
                />
              </Button>
              <ul>
                {/*<li>
                  <Checkbox
                    label={`${SELECT_ALL}`}
                    checked={all_all_college_name_condition}
                    onChange={() => {
                      toggle_all_all_college_name_query();
                      onClickFilterSearch();
                    }}
                    readOnly={searchUI?.isLoading}
                  />
                  <span>({allowedCard?.length})</span>
                  </li>*/}
                {collegeOptions.map((college, index) => {
                  if (index < collegeLimit) {
                    return (
                      <li key={`chkOpt_college_${index}`}>
                        <Checkbox
                          label={college.value}
                          value={college.value}
                          checked={filterCondition.all_college_name_query.includes(
                            college.value
                          )}
                          onChange={() => {
                            toggle_all_college_name_query(college.value);
                            onClickFilterSearch();
                          }}
                          readOnly={searchUI?.isLoading}
                        />
                        <span>({college.count})</span>
                      </li>
                    );
                  }
                })}
              </ul>
              {/*collegeOptions.length > initialConditionLimit &&
                collegeLimit < 999 && (
                  <Button
                    className="btn_more"
                    onClick={() => setCollegeLimit(999)}
                  >
                    <PolyglotText
                      id="통검-필레팝-더보기"
                      defaultString="더보기"
                    />
                    <Icon color="grey" name="angle down" />
                  </Button>
                )*/}
            </Accordion.Content>
          </Accordion>
        )}
        <Accordion>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <PolyglotText id="통검-필레팝-뱃지" defaultString="Badge" />
            <Icon name="angle down" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <ul>
              <li>
                <Checkbox
                  label={getPolyglotText('포함', '통검-필레팝-핵포함')}
                  checked={filterCondition.badge === true}
                  onChange={() => {
                    setFilterCondition({
                      ...filterCondition,
                      badge: !filterCondition.badge,
                    });
                    onClickFilterSearch();
                  }}
                  readOnly={searchUI?.isLoading}
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
          <Accordion.Content active={activeIndex === 2} className="sty2">
            <Button
              className="deselect"
              onClick={() => {
                setFilterCondition({
                  ...filterCondition,
                  applying: null,
                  learning_start_date_str: null,
                  learning_end_date_str: null,
                });
                onClickFilterSearch();
              }}
            >
              <Icon className="close-grey" />
              <PolyglotText
                id="통검-필레팝-선택해제"
                defaultString="선택 해제"
              />
            </Button>
            <ul>
              <li>
                <Radio
                  name="periodOptions"
                  label={getPolyglotText(
                    '수강신청 가능 학습만 보기',
                    '통검-필레팝-날짜옵션'
                  )}
                  value="true"
                  checked={filterCondition.applying === true}
                  onClick={() => {
                    if (filterCondition.applying === true) {
                      setFilterCondition({
                        ...filterCondition,
                        applying: null,
                      });
                    } else {
                      setFilterCondition({
                        ...filterCondition,
                        applying: true,
                      });
                    }
                    onClickFilterSearch();
                  }}
                  readOnly={searchUI?.isLoading}
                />
              </li>
              <li>
                <Radio
                  name="periodOptions"
                  label={getPolyglotText('직접입력', '통검-필레팝-직접입력')}
                  value="false"
                  checked={filterCondition.applying === false}
                  onClick={() => {
                    if (filterCondition.applying === false) {
                      setFilterCondition({
                        ...filterCondition,
                        applying: null,
                      });
                    } else {
                      setFilterCondition({
                        ...filterCondition,
                        applying: false,
                      });
                    }
                    onClickFilterSearch();
                  }}
                  readOnly={searchUI?.isLoading}
                />
                <CalendarView
                  filterCondition={filterCondition}
                  search={onClickFilterSearch}
                />
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
          <Accordion.Content active={activeIndex === 3} className="sty2">
            <Button
              className="deselect"
              onClick={() => {
                setFilterCondition({
                  ...filterCondition,
                  difficulty_level_json_query: [],
                });
                onClickFilterSearch();
              }}
            >
              <Icon className="close-grey" />
              <PolyglotText
                id="통검-필레팝-선택해제"
                defaultString="선택 해제"
              />
            </Button>
            <ul>
              {/*<li>
                <Checkbox
                  label={`${SELECT_ALL}`}
                  checked={all_difficulty_level_condition}
                  onChange={() => {
                    toggle_all_difficulty_level_query();
                    onClickFilterSearch();
                  }}
                  readOnly={searchUI?.isLoading}
                />
                </li>*/}
              {CheckboxOptions.difficulty_level_json_query.map(
                (levels, index) => (
                  <li key={`chkOpt_difficulty_level_${index}`}>
                    <Checkbox
                      label={levels.text}
                      value={levels.value}
                      checked={filterCondition.difficulty_level_json_query.includes(
                        levels.value
                      )}
                      onChange={() => {
                        toggle_difficulty_level_json_query(levels.value);
                        onClickFilterSearch();
                      }}
                      readOnly={searchUI?.isLoading}
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
            <Accordion.Content active={activeIndex === 4} className="sty2">
              <Button
                className="deselect"
                onClick={() => {
                  setFilterCondition({
                    ...filterCondition,
                    cube_type_query: [],
                  });
                  onClickFilterSearch();
                }}
              >
                <Icon className="close-grey" />
                <PolyglotText
                  id="통검-필레팝-선택해제"
                  defaultString="선택 해제"
                />
              </Button>
              <ul>
                {/*<li>
                  <Checkbox
                    label={`${SELECT_ALL}`}
                    checked={all_cube_type_condition}
                    onChange={() => {
                      toggle_all_cube_type_query();
                      onClickFilterSearch();
                    }}
                    readOnly={searchUI?.isLoading}
                  />
                  </li>*/}
                {cubeTypeOptions.map((learningType, index) => {
                  if (index < cubeTypeLimit) {
                    return (
                      <li key={`chkOpt_cube_type_${index}`}>
                        <Checkbox
                          label={learningType.value}
                          value={learningType.value}
                          checked={filterCondition.cube_type_query.includes(
                            learningType.value
                          )}
                          onChange={() => {
                            toggle_cube_type_query(learningType.value);
                            onClickFilterSearch();
                          }}
                          readOnly={searchUI?.isLoading}
                        />
                        <span>({learningType.count})</span>
                      </li>
                    );
                  }
                })}
              </ul>
              {/*cubeTypeOptions.length > initialConditionLimit &&
                cubeTypeLimit < 999 && (
                  <Button
                    className="btn_more"
                    onClick={() => setCubeTypeLimit(999)}
                  >
                    <PolyglotText
                      id="통검-필레팝-더보기"
                      defaultString="더보기"
                    />
                    <Icon color="grey" name="angle down" />
                  </Button>
                )*/}
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
          <Accordion.Content active={activeIndex === 5} className="sty2">
            <Button
              className="deselect"
              onClick={() => {
                setFilterCondition({
                  ...filterCondition,
                  learning_time_query: [],
                });
                onClickFilterSearch();
              }}
            >
              <Icon className="close-grey" />
              <PolyglotText
                id="통검-필레팝-선택해제"
                defaultString="선택 해제"
              />
            </Button>
            <ul>
              {/*<li>
                <Checkbox
                  label={`${SELECT_ALL}`}
                  checked={all_learning_time_condition}
                  onChange={() => {
                    toggle_all_learning_time_query();
                    onClickFilterSearch();
                  }}
                  readOnly={searchUI?.isLoading}
                />
                </li>*/}
              {CheckboxOptions.learning_time_query.map(
                (learningTime, index) => (
                  <li key={`chkOpt_learning_time_${index}`}>
                    <Checkbox
                      label={learningTime.text}
                      value={learningTime.value}
                      checked={filterCondition.learning_time_query.includes(
                        learningTime.value
                      )}
                      onChange={() => {
                        toggle_learning_time_query(
                          learningTime.text,
                          learningTime.value
                        );
                        onClickFilterSearch();
                      }}
                      readOnly={searchUI?.isLoading}
                    />
                  </li>
                )
              )}
            </ul>
          </Accordion.Content>
        </Accordion>

        <Accordion>
          <Accordion.Title
            active={activeIndex === 6}
            index={6}
            onClick={handleClick}
          >
            {filterConditionNamePolyglot(FilterConditionName.SupportLanguage)}
            <Icon name="angle down" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 6} className="sty2">
            <Button
              className="deselect"
              onClick={() => {
                setFilterCondition({
                  ...filterCondition,
                  support_lang_json_query: [],
                });
                onClickFilterSearch();
              }}
            >
              <Icon className="close-grey" />
              <PolyglotText
                id="통검-필레팝-선택해제"
                defaultString="선택 해제"
              />
            </Button>
            <ul>
              {CheckboxOptions.support_lang_json_query.map((lang, index) => (
                <li key={`chkOpt_support_lang_${index}`}>
                  <Checkbox
                    label={lang.text}
                    value={lang.value}
                    checked={filterCondition.support_lang_json_query.includes(
                      lang.value
                    )}
                    onChange={() => {
                      toggle_support_lang_json_query(lang.value);
                      onClickFilterSearch();
                    }}
                    readOnly={searchUI?.isLoading}
                  />
                  <span />
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion>

        <Button
          className="btn_reset"
          onClick={() => {
            filterClearAll();
            onClickFilterSearch();
          }}
        >
          <Icon name="undo" />
          <PolyglotText id="통검-필레팝-전체해제" defaultString="전체해제" />
        </Button>
      </div>
    </>
  );
}
