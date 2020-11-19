import React, { ReactNode, useState, useEffect, Fragment } from 'react';
import { Button, Checkbox, Icon, Radio } from 'semantic-ui-react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxOptions from '../model/CheckBoxOption';

interface Props {
  isOnFilter: boolean;
  searchValue: string;
}

const SELECT_ALL = 'Select All';
const InitialConditions = {
  all_college_name_query: [],
  learningTypes: [],
  difficulty_level_json_query: [],
  learning_time_query: [],
  organizer_query: [],
  required: '',
  serviceType: '',
  certifications: [],
  learning_start_date_str: null,
  learning_end_date_str: null,
  applying: '',
};

export type FilterCondition = {
  all_college_name_query: string[]; // 컬리지
  learningTypes: string[]; // 학습유형 
  difficulty_level_json_query: string[]; // 난이도
  learning_time_query: string[]; // 교육기간
  organizer_query: string[]; // 교육기관
  required: string; // 권장과정
  serviceType: string; // 학습유형에 포함되어 있는 'Course'
  certifications: string[]; // 뱃지 & 스탬프 유무
  learning_start_date_str: Date | null; // 교육일정 startDate
  learning_end_date_str: Date | null; // 교육일정 endDate
  applying: string; // 수강신청 가능 학습
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

const SearchFilter: React.FC<Props> = ({ isOnFilter, searchValue }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cpOpened, setCpOpened] = useState(false);

  const handleChangeStart = (date: any) => {
    setStartDate(date);
  };
  const handleChangeEnd = (date: any) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    console.log('');
  }, [searchValue]);

  const [conditions, setConditions] = useState<FilterCondition>({
    all_college_name_query: [],
    learningTypes: [],
    difficulty_level_json_query: [],
    learning_time_query: [],
    organizer_query: [],
    required: '',
    serviceType: '',
    certifications: [],
    learning_start_date_str: null,
    learning_end_date_str: null,
    applying: '',
  });

  useEffect(() => {
    console.log(conditions)
  },[conditions])

  const onCheckOne = (e: any, data: any) => {
    switch (data.name) {
      case FilterConditionName.College:
        if (conditions.all_college_name_query.includes(data.value)) {
          /* 선택 해제 */
          setConditions({
            ...conditions,
            all_college_name_query: conditions.all_college_name_query.filter(
              collegeId => collegeId !== data.value
            ),
          });
          break;
        }
        /* 선택 */
        setConditions({
          ...conditions,
          all_college_name_query: conditions.all_college_name_query.concat(data.value),
        });
        break;
      case FilterConditionName.LearningType:
        /* 'Course' 를 제외한 모든 학습 유형에 대한 선택 해제 */
        if (conditions.learningTypes.includes(data.value)) {
          setConditions({
            ...conditions,
            learningTypes: conditions.learningTypes.filter(
              learningType => learningType !== data.value
            ),
          });
          break;
        }

        /* 'Course' 선택 해제 */
        if (conditions.serviceType === 'Course' && data.value === 'Course') {
          setConditions({ ...conditions, serviceType: '' });
          break;
        }
        /* 학습유형 중 'Course' 를 선택할 시, learningTypes 가 아닌 serviceType 에 값이 바인딩됨. */
        if (data.value === 'Course') {
          setConditions({ ...conditions, serviceType: data.value });
          break;
        }

        /* 'Course' 를 제외한 모든 학습 유형에 대한 선택 */
        setConditions({
          ...conditions,
          learningTypes: conditions.learningTypes.concat(data.value),
        });
        break;
      case FilterConditionName.DifficultyLevel:
        if (conditions.difficulty_level_json_query.includes(data.value)) {
          setConditions({
            ...conditions,
            difficulty_level_json_query: conditions.difficulty_level_json_query.filter(
              difficultyLevel => difficultyLevel !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          difficulty_level_json_query: conditions.difficulty_level_json_query.concat(data.value),
        });
        break;
      case FilterConditionName.LearningTime:
        if (conditions.learning_time_query.includes(data.value)) {
          setConditions({
            ...conditions,
            learning_time_query: conditions.learning_time_query.filter(
              learningTIme => learningTIme !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          learning_time_query: conditions.learning_time_query.concat(data.value),
        });
        break;
      case FilterConditionName.Organizer:
        if (conditions.organizer_query.includes(data.value)) {
          setConditions({
            ...conditions,
            organizer_query: conditions.organizer_query.filter(
              organizer => organizer !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          organizer_query: conditions.organizer_query.concat(data.value),
        });
        break;
      case FilterConditionName.Required:
        setConditions({ ...conditions, required: data.value });
        break;
      case FilterConditionName.Certification:
        if (conditions.certifications.includes(data.value)) {
          setConditions({
            ...conditions,
            certifications: conditions.certifications.filter(
              certification => certification !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          certifications: conditions.certifications.concat(data.value),
        });
        break;
    }
  };

  const onClearAll = () => {
    setConditions(InitialConditions);
  };

  const onCheckAll = (e: any, data: any) => {
    /*
      전체 선택이 가능한 항목들에 대해서만 FilterConditionName 을 기준으로 영역을 나눔.
        1. 컬리지
        2. 학습유형
        3. 난이도
        4. 교육기관
    */
    switch (data.name) {
      case FilterConditionName.College:
        /* 전체 해제 */
        if (conditions.all_college_name_query.length === CheckBoxOptions.college.length) {
          setConditions({ ...conditions, all_college_name_query: [] });
          break;
        }
        /* 전체 선택 */
        setConditions({ ...conditions, all_college_name_query: [...CheckBoxOptions.college.map(college => college.value)] });
        break;
      case FilterConditionName.LearningType:
        if (conditions.learningTypes.length === CheckBoxOptions.learningTypes.length - 1 && conditions.serviceType) {
          setConditions({ ...conditions, learningTypes: [], serviceType: '' });
          break;
        }
        setConditions({
          ...conditions,
          learningTypes: [...CheckBoxOptions.learningTypes.map(learningType => learningType.value).filter(value => value !== 'Course')],
          serviceType: 'Course'
        });
        break;
      case FilterConditionName.DifficultyLevel:
        if (conditions.difficulty_level_json_query.length === CheckBoxOptions.difficulty_level_json_query.length) {
          setConditions({ ...conditions, difficulty_level_json_query: [] });
          break;
        }
        setConditions({ ...conditions, difficulty_level_json_query: [...CheckBoxOptions.difficulty_level_json_query.map(difficultyLevel => difficultyLevel.value)] });
        break;
      case FilterConditionName.Organizer:
        if (conditions.organizer_query.length === CheckBoxOptions.organizer_query.length) {
          setConditions({ ...conditions, organizer_query: [] });
          break;
        }
        setConditions({ ...conditions, organizer_query: [...CheckBoxOptions.organizer_query.map(organizer => organizer.value)] });
        break;
      case FilterConditionName.LearningTime:
        if (conditions.learning_time_query.length === CheckBoxOptions.learning_time_query.length) {
          setConditions({ ...conditions, learning_time_query: [] });
          break;
        }
        setConditions({ ...conditions, learning_time_query: [...CheckBoxOptions.learning_time_query.map(learningTime => learningTime.value)] });
        break;
      case FilterConditionName.Certification:
        if (conditions.certifications.length === CheckBoxOptions.certifications.length) {
          setConditions({ ...conditions, certifications: [] });
          break;
        }
        setConditions({ ...conditions, certifications: [...CheckBoxOptions.certifications.map(certification => certification.value)] });
        break;
    }
  };

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
                name={FilterConditionName.College}
                label={`${SELECT_ALL}`} 
                onChange={onCheckAll}
              />
              {CheckBoxOptions.college.map((college, index) => (
                <Fragment key={`checkbox-college-${index}`}>
                  <Checkbox 
                    className="base"
                    name={FilterConditionName.College}
                    label={college.text}
                    value={college.value}
                    checked={conditions.all_college_name_query.includes(college.value)}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.DifficultyLevel}</th>
            <td>
              <Checkbox className="base" name={FilterConditionName.DifficultyLevel} label={`${SELECT_ALL}`} onChange={onCheckAll} />
              {CheckBoxOptions.difficulty_level_json_query.map((levels, index) => (
                <Fragment key={`checkbox-difficulty_level_json_query-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.DifficultyLevel}
                    label={levels.text}
                    value={levels.value}
                    checked={conditions.difficulty_level_json_query.includes(levels.value)}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.LearningTime}</th>
            <td>
              <Checkbox className="base" name={FilterConditionName.LearningTime} label={`${SELECT_ALL}`} onChange={onCheckAll} />
              {CheckBoxOptions.learning_time_query.map((learningTime, index) => (
                <Fragment key={`checkbox-learningTime-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.LearningTime}
                    label={learningTime.text}
                    value={learningTime.value}
                    checked={conditions.learning_time_query.includes(
                      learningTime.value
                    )}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
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
              <Checkbox className="base" name={FilterConditionName.Organizer} label={`${SELECT_ALL}`} onChange={onCheckAll} />
              {CheckBoxOptions.organizer_query.map((organizer, index) => (
                <Fragment key={`checkbox-organizer-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.Organizer}
                    label={organizer.text}
                    value={organizer.value}
                    checked={conditions.organizer_query.includes(organizer.value)}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
              {/*확장 item area : 기본노출을 제외한 item들을 div로 한번 더 감싸줌.
                            확장시 'on' class 추가.*/}
              {cpOpened && (
                <div className="extend_area on">
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                  <Checkbox className="base" label="교육기관명" />
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.LearningType}</th>
            <td>
              <Checkbox className="base" name={FilterConditionName.LearningType} label={`${SELECT_ALL}`} onChange={onCheckAll} />
              {CheckBoxOptions.learningTypes.map((learningType, index) => (
                <Fragment key={`checkbox-learningType-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.LearningType}
                    label={learningType.text}
                    value={learningType.value}
                    checked={conditions.learningTypes.includes(
                      learningType.value
                    )}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.Required}</th>
            <td>
              {CheckBoxOptions.requireds.map((required, index) => (
                <Fragment key={`radiobox-required-${index}`}>
                  <Checkbox
                    className="base radio"
                    name={FilterConditionName.Required}
                    label={required.text}
                    value={required.value}
                    checked={conditions.required === required.value}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.Certification}</th>
            <td>
              <Checkbox className="base" name={FilterConditionName.Certification} label={`${SELECT_ALL}`} onChange={onCheckAll}/>
              {CheckBoxOptions.certifications.map((certification, index) => (
                <Fragment key={`checkbox-certification-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.Certification}
                    label={certification.text}
                    value={certification.value}
                    checked={conditions.certifications.includes(
                      certification.value
                    )}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
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
                      selected={startDate}
                      onChange={date => handleChangeStart(date)}
                      selectsStart
                      dateFormat="yy.MM.d"
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
                      selected={endDate}
                      onChange={date => handleChangeEnd(date)}
                      selectsEnd
                      minDate={startDate}
                      dateFormat="yy.MM.d"
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
                <button className="clear">
                  <Icon className="reset" />
                  <span className="blind">reset</span>
                </button>
                <span>전체해제</span>
              </th>
              <td>
                <Button className="del" content="Course" />
              </td>
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
