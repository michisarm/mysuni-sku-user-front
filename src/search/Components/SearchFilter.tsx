import React, { ReactNode, useState,useEffect, Fragment } from 'react';
import { Button, Checkbox, Icon, Radio } from 'semantic-ui-react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxOptions from '../model/CheckBoxOption';


interface Props {
  isOnFilter: boolean;
}

const SELECT_ALL = 'Select All';
const InitialConditions = {
  collegeIds: [],
  learningTypes: [],
  difficultyLevels: [],
  learningTimes: [],
  organizers: [],
  required: '',
  serviceType: '',
  certifications: [],
  startDate: null,
  endDate: null,
  applying: ''
};

export type FilterCondition = {
  collegeIds: string[];                 // 컬리지
  learningTypes: string[];              // 학습유형
  difficultyLevels: string[];           // 난이도
  learningTimes: string[];              // 교육기간
  organizers: string[];                 // 교육기관
  required: string;                     // 권장과정
  serviceType: string;                  // 학습유형에 포함되어 있는 'Course'
  certifications: string[];             // 뱃지 & 스탬프 유무
  startDate: Date | null;               // 교육일정 startDate
  endDate: Date | null;                 // 교육일정 endDate
  applying: string;                     // 수강신청 가능 학습
}

export enum FilterConditionName {
  College = '컬리지',
  LearningType = '교육유형',
  DifficultyLevel = '난이도',
  LearningTime = '학습시간',
  Organizer = '교육기관',
  Required = '핵인싸',
  Certification = 'Certification',
  LearningSchedule = '교육일정'
}

const SearchFilter: React.FC<Props> = ({ isOnFilter }) => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cpOpened, setCpOpened] = useState(false);

  const handleChangeStart = (date: any) => {
    setStartDate(date);
  };
  const handleChangeEnd = (date: any) => {
    setEndDate(date);
  };

  const [conditions, setConditions] = useState<FilterCondition>({
    collegeIds: [],
    learningTypes: [],
    difficultyLevels: [],
    learningTimes: [],
    organizers: [],
    required: '',
    serviceType: '',
    certifications: [],
    startDate: null,
    endDate: null,
    applying: ''
  });

  const onCheckOne = (e: any, data: any) => {
    switch (data.name) {
      case FilterConditionName.College:
        if (conditions.collegeIds.includes(data.value)) {
          /* 선택 해제 */
          setConditions({ ...conditions, collegeIds: conditions.collegeIds.filter(collegeId => collegeId !== data.value) });
          break;
        }
        /* 선택 */
        setConditions({ ...conditions, collegeIds: conditions.collegeIds.concat(data.value) });
        break;
      case FilterConditionName.LearningType:
        /* 'Course' 를 제외한 모든 학습 유형에 대한 선택 해제 */
        if (conditions.learningTypes.includes(data.value)) {
          setConditions({ ...conditions, learningTypes: conditions.learningTypes.filter(learningType => learningType !== data.value) });
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
        setConditions({ ...conditions, learningTypes: conditions.learningTypes.concat(data.value) });
        break;
      case FilterConditionName.DifficultyLevel:
        if (conditions.difficultyLevels.includes(data.value)) {
          setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.filter(difficultyLevel => difficultyLevel !== data.value) });
          break;
        }
        setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.concat(data.value) });
        break;
      case FilterConditionName.LearningTime:
        if (conditions.learningTimes.includes(data.value)) {
          setConditions({ ...conditions, learningTimes: conditions.learningTimes.filter(learningTIme => learningTIme !== data.value) });
          break;
        }
        setConditions({ ...conditions, learningTimes: conditions.learningTimes.concat(data.value) });
        break;
      case FilterConditionName.Organizer:
        if (conditions.organizers.includes(data.value)) {
          setConditions({ ...conditions, organizers: conditions.organizers.filter(organizer => organizer !== data.value) });
          break;
        }
        setConditions({ ...conditions, organizers: conditions.organizers.concat(data.value) });
        break;
      case FilterConditionName.Required:
        setConditions({ ...conditions, required: data.value });
        break;
      case FilterConditionName.Certification:
        if (conditions.certifications.includes(data.value)) {
          setConditions({ ...conditions, certifications: conditions.certifications.filter(certification => certification !== data.value) });
          break;
        }
        setConditions({ ...conditions, certifications: conditions.certifications.concat(data.value) });
        break;
    }
  };

  const onClearAll = () => {
    setConditions(InitialConditions);
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
              <Checkbox className="base" label="SelectAll" />
              <Checkbox className="base" label="Al(13)" checked={true} />
              <Checkbox className="base" label="DT(13)" />
              <Checkbox className="base" label="행복(13)" />
              <Checkbox className="base" label="SV(13)" />
              <Checkbox className="base" label="혁신디자인(13)" />
              <Checkbox className="base" label="Global(13)" />
              <Checkbox className="base" label="Leadership(13)" />
              <Checkbox className="base" label="Management(13)" />
              <Checkbox className="base" label="반도체(13)" />
              <Checkbox className="base" label="에너지솔루션(13)" />
              <Checkbox className="base" label="SK경영(13)" />
              <Checkbox className="base" label="SK아카데미(13)" />
              <Checkbox className="base" label="Life Style(13)" />
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.DifficultyLevel}</th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`} 

              />
              {CheckBoxOptions.difficultyLevels.map((levels, index) => (
                <Fragment key={`checkbox-difficultyLevels-${index}`}>
                  <Checkbox 
                    className="base"
                    name={FilterConditionName.DifficultyLevel}
                    label={levels.text}
                    value={levels.value}
                    checked={conditions.difficultyLevels.includes(levels.value)}
                    onChange={onCheckOne}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.LearningTime}</th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`} 
              />
              {
                CheckBoxOptions.learningTimes.map((learningTime, index) => (
                  <Fragment key={`checkbox-learningTime-${index}`}>
                    <Checkbox
                      className="base"
                      name={FilterConditionName.LearningTime}
                      label={learningTime.text}
                      value={learningTime.value}
                      checked={conditions.learningTimes.includes(learningTime.value)}
                      onChange={onCheckOne}
                    />
                  </Fragment>
                ))
              }
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
              />
              {
                CheckBoxOptions.organizers.map((organizer, index) => (
                  <Fragment key={`checkbox-organizer-${index}`}>
                    <Checkbox
                      className="base"
                      name={FilterConditionName.Organizer}
                      label={organizer.text}
                      value={organizer.value}
                      checked={conditions.organizers.includes(organizer.value)}
                      onChange={onCheckOne}
                    />
                  </Fragment>
                ))
              }
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
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
              />
              {
                CheckBoxOptions.learningTypes.map((learningType,index) => (
                  <Fragment key={`checkbox-learningType-${index}`}>
                    <Checkbox
                      className="base"
                      name={FilterConditionName.LearningType}
                      label={learningType.text}
                      value={learningType.value}
                      checked={conditions.learningTypes.includes(learningType.value)}
                      onChange={onCheckOne}
                    />
                  </Fragment>
                ))
              }
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.Required}</th>
            <td>
              {
                CheckBoxOptions.requireds.map((required, index) => (
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
                ))
              }
            </td>
          </tr>
          <tr>
            <th>{FilterConditionName.Certification}</th>
            <td>
              <Checkbox
                className="base"
                label={`${SELECT_ALL}`}
              />
              {
                CheckBoxOptions.certifications.map((certification, index) => (
                <Fragment key={`checkbox-certification-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.Certification}
                    label={certification.text}
                    value={certification.value}
                    checked={conditions.certifications.includes(certification.value)}
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
