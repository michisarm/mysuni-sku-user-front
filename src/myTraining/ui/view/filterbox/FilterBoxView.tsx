import React, { Fragment } from 'react';
import { Checkbox } from 'semantic-ui-react';
import ReactDatePicker from 'react-datepicker';
import CheckboxOptions from '../../model/CheckboxOptions';
import { CollegeModel } from '../../../../college/model';
import FilterCountViewModel from '../../../model/FilterCountViewModel';
import { FilterCondition } from '../../../model/FilterCondition';
import { FilterConditionName } from '../../../model/FilterConditionName';


interface FilterBoxViewProps {
  colleges: CollegeModel[];
  conditions: FilterCondition;
  totalFilterCount: FilterCountViewModel;
  filterCounts: FilterCountViewModel[];
  onCheckAll: (e: any, data: any) => void;
  onCheckOne: (e: any, data: any) => void;
  onChangeStartDate: (data: Date) => void;
  onChangeEndDate: (data: Date) => void;
  onCheckApplying: (e: any, data: any) => void;
}

export function FilterBoxView({
  colleges,
  conditions,
  totalFilterCount,
  filterCounts,
  onCheckAll,
  onCheckOne,
  onChangeStartDate,
  onChangeEndDate,
  onCheckApplying,
}: FilterBoxViewProps) {

  return (
    <table className="">
      <tbody>
        <tr>
          <th>{FilterConditionName.College}</th>
          <td>
            <Checkbox
              className="base"
              name={FilterConditionName.College}
              label={`${SELECT_ALL} (${totalFilterCount.college})`}
              checked={conditions.collegeIds.length === colleges.length}
              onChange={onCheckAll}
            />
            {colleges &&
              colleges.length &&
              colleges.map((college, index) => (
                <Fragment key={`checkbox-college-${index}`}>
                  <Checkbox
                    className="base"
                    name={FilterConditionName.College}
                    label={`${college.name} (${getCollegeCount(filterCounts, college.id)})`}
                    value={college.id}
                    checked={conditions.collegeIds.includes(college.id)}
                    onChange={onCheckOne}
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
              name={FilterConditionName.DifficultyLevel}
              label={SELECT_ALL}
              checked={conditions.difficultyLevels.length === CheckboxOptions.difficultyLevels.length}
              onChange={onCheckAll}
            />
            {CheckboxOptions.difficultyLevels.map((difficultyLevel, index) => (
              <Fragment key={`checkbox-difficultyLevel-${index}`}>
                <Checkbox
                  className="base"
                  name={FilterConditionName.DifficultyLevel}
                  label={difficultyLevel.text}
                  value={difficultyLevel.value}
                  checked={conditions.difficultyLevels.includes(difficultyLevel.value)}
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
              name={FilterConditionName.LearningTime}
              label={SELECT_ALL}
              checked={conditions.learningTimes.length === CheckboxOptions.learningTimes.length}
              onChange={onCheckAll}
            />
            {CheckboxOptions.learningTimes.map((learningTime, index) => (
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
            ))}
          </td>
        </tr>
        {/* <tr>
          <th>{FilterConditionName.Organizer}</th>
          <td>
            <Checkbox
              className="base"
              name={FilterConditionName.Organizer}
              label={SELECT_ALL}
              checked={conditions.organizers.length === CheckboxOptions.organizers.length}
              onChange={onCheckAll}
            />
            {CheckboxOptions.organizers.map((organizer, index) => (
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
            ))}
          </td>
        </tr> */}
        <tr>
          <th>{FilterConditionName.Required}</th>
          <td>
            {CheckboxOptions.requireds.map((required, index) => (
              <Fragment key={`checkbox-required-${index}`}>
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
            <Checkbox
              className="base"
              name={FilterConditionName.Certification}
              label={SELECT_ALL}
              checked={conditions.certifications.length === CheckboxOptions.certifications.length}
              onChange={onCheckAll}
            />
            {CheckboxOptions.certifications.map((certification, index) => (
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
              <div className="ui h40 calendar" id="rangestart">
                <div className="ui input right icon">
                  <label>시작일</label>
                  <ReactDatePicker
                    selected={conditions.startDate}
                    onChange={onChangeStartDate}
                    dateFormat="yyyy.MM.dd"
                  />
                  <i className="calendar24 icon"><span className="blind">date</span></i>
                </div>
              </div>
              <span className="dash">-</span>
              <div className="ui h40 calendar" id="rangeend">
                <div className="ui input right icon write">
                  <label>종료일</label>
                  <ReactDatePicker
                    selected={conditions.endDate}
                    onChange={onChangeEndDate}
                    minDate={conditions.startDate}
                    dateFormat="yyyy.MM.dd"
                  />
                  <i className="calendar24 icon"><span className="blind">date</span></i>
                </div>
              </div>
            </div>
            {/* <Checkbox
              className="base"
              name={FilterConditionName.LearningSchedule}
              label="수강신청 가능 학습만 보기"
              value="true"
              checked={conditions.applying === 'true'}
              onChange={onCheckApplying}
            /> */}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const SELECT_ALL = 'Select All';

const getCollegeCount = (filterCountViews: FilterCountViewModel[], collegeId: string): number => {
  const filterCountView = filterCountViews.find(filterCountview => filterCountview.collegeId === collegeId);
  return filterCountView ? filterCountView.college : 0;
}