import React, { Fragment } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Checkbox } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { CollegeModel } from '../../../../college/model';
import { getDefaultLang } from '../../../../lecture/model/LangSupport';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import FilterViewModel from '../../../model/filter/FilterViewModel';
import { FilterCondition } from '../../../model/FilterCondition';
import {
  FilterConditionName,
  filterConditionNamePolyglot,
} from '../../../model/FilterConditionName';
import CheckboxOptions, {
  learningTimePolyglot,
  requiredPolyglot,
} from '../../model/CheckboxOptions';

interface FilterBoxViewProps {
  colleges: CollegeModel[];
  conditions: FilterCondition;
  filterCountModel: FilterViewModel;
  onCheckAll: (e: any, data: any) => void;
  onCheckOne: (e: any, data: any) => void;
  onChangeStartDate: (data: Date) => void;
  onChangeEndDate: (data: Date) => void;
}

export function FilterBoxView({
  colleges,
  conditions,
  filterCountModel,
  onCheckAll,
  onCheckOne,
  onChangeStartDate,
  onChangeEndDate,
}: FilterBoxViewProps) {
  return (
    <table className="">
      <tbody>
        <tr>
          <th>
            {filterConditionNamePolyglot(FilterConditionName.LearningType)}
          </th>
          <td>
            <Checkbox
              className="base"
              name={filterConditionNamePolyglot(
                FilterConditionName.LearningType
              )}
              label={`${SELECT_ALL} (${filterCountModel.totalCountByCardType})`}
              checked={
                conditions.learningTypes.length ===
                CheckboxOptions.learningTypes.length
              }
              onChange={onCheckAll}
            />
            {CheckboxOptions.learningTypes.map(
              (learningType, index) =>
                learningType.text !== 'Community' && (
                  <Fragment key={`checkbox-learningType-${index}`}>
                    <Checkbox
                      className="base"
                      name={filterConditionNamePolyglot(
                        FilterConditionName.LearningType
                      )}
                      label={`${
                        learningType.text
                      } (${filterCountModel.getCountFromLearningType(
                        learningType.text
                      )})`}
                      value={learningType.value}
                      checked={conditions.learningTypes.includes(
                        learningType.value
                      )}
                      onChange={onCheckOne}
                    />
                  </Fragment>
                )
            )}
          </td>
        </tr>
        <tr>
          <th>{filterConditionNamePolyglot(FilterConditionName.College)}</th>
          <td>
            <Checkbox
              className="base"
              name={filterConditionNamePolyglot(FilterConditionName.College)}
              label={`${SELECT_ALL} (${filterCountModel.totalCountByCollegeId})`}
              checked={conditions.collegeIds.length === colleges.length}
              onChange={onCheckAll}
            />
            {colleges &&
              colleges.length &&
              colleges.map((college, index) => (
                <Fragment key={`checkbox-college-${index}`}>
                  <Checkbox
                    className="base"
                    name={filterConditionNamePolyglot(
                      FilterConditionName.College
                    )}
                    label={`${parsePolyglotString(
                      college.name,
                      getDefaultLang(college.langSupports)
                    )} (${filterCountModel.getCountByCollegeId(college.id)})`}
                    value={college.id}
                    checked={conditions.collegeIds.includes(college.id)}
                    onChange={onCheckOne}
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
              name={filterConditionNamePolyglot(
                FilterConditionName.DifficultyLevel
              )}
              label={SELECT_ALL}
              checked={
                conditions.difficultyLevels.length ===
                CheckboxOptions.difficultyLevels.length
              }
              onChange={onCheckAll}
            />
            {CheckboxOptions.difficultyLevels.map((difficultyLevel, index) => (
              <Fragment key={`checkbox-difficultyLevel-${index}`}>
                <Checkbox
                  className="base"
                  name={filterConditionNamePolyglot(
                    FilterConditionName.DifficultyLevel
                  )}
                  label={difficultyLevel.text}
                  value={difficultyLevel.value}
                  checked={conditions.difficultyLevels.includes(
                    difficultyLevel.value
                  )}
                  onChange={onCheckOne}
                />
              </Fragment>
            ))}
          </td>
        </tr>
        <tr>
          <th>
            {filterConditionNamePolyglot(FilterConditionName.LearningTime)}
          </th>
          <td>
            <Checkbox
              className="base"
              name={filterConditionNamePolyglot(
                FilterConditionName.LearningTime
              )}
              label={SELECT_ALL}
              checked={
                conditions.learningTimes.length ===
                CheckboxOptions.learningTimes.length
              }
              onChange={onCheckAll}
            />
            {CheckboxOptions.learningTimes.map((learningTime, index) => (
              <Fragment key={`checkbox-learningTime-${index}`}>
                <Checkbox
                  className="base"
                  name={filterConditionNamePolyglot(
                    FilterConditionName.LearningTime
                  )}
                  label={learningTimePolyglot(learningTime.text)}
                  value={learningTime.value}
                  checked={conditions.learningTimes.includes(
                    learningTime.value
                  )}
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
          <th>{filterConditionNamePolyglot(FilterConditionName.Required)}</th>
          <td>
            {CheckboxOptions.requireds.map((required, index) => (
              <Fragment key={`checkbox-required-${index}`}>
                <Checkbox
                  className="base radio"
                  name={filterConditionNamePolyglot(
                    FilterConditionName.Required
                  )}
                  label={requiredPolyglot(required.text)}
                  value={required.value}
                  checked={conditions.required === required.value}
                  onChange={onCheckOne}
                />
              </Fragment>
            ))}
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
              label={SELECT_ALL}
              checked={
                conditions.certifications.length ===
                CheckboxOptions.certifications.length
              }
              onChange={onCheckAll}
            />
            {CheckboxOptions.certifications.map((certification, index) => (
              <Fragment key={`checkbox-certification-${index}`}>
                <Checkbox
                  className="base"
                  name={filterConditionNamePolyglot(
                    FilterConditionName.Certification
                  )}
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
          <th>
            {filterConditionNamePolyglot(FilterConditionName.LearningSchedule)}
          </th>
          <td>
            <div className="calendar-cell">
              <div className="ui h40 calendar" id="rangestart">
                <div className="ui input right icon">
                  <label>
                    <PolyglotText
                      defaultString="시작일"
                      id="learning-LearningFilter2-시작일"
                    />
                  </label>
                  <ReactDatePicker
                    selected={conditions.startDate}
                    onChange={onChangeStartDate}
                    dateFormat="yyyy.MM.dd"
                    maxDate={conditions.endDate}
                  />
                  <i className="calendar24 icon">
                    <span className="blind">date</span>
                  </i>
                </div>
              </div>
              <span className="dash">-</span>
              <div className="ui h40 calendar" id="rangeend">
                <div className="ui input right icon write">
                  <label>
                    <PolyglotText
                      defaultString="종료일"
                      id="learning-LearningFilter2-종료일"
                    />
                  </label>
                  <ReactDatePicker
                    selected={conditions.endDate}
                    onChange={onChangeEndDate}
                    minDate={conditions.startDate}
                    dateFormat="yyyy.MM.dd"
                  />
                  <i className="calendar24 icon">
                    <span className="blind">date</span>
                  </i>
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
