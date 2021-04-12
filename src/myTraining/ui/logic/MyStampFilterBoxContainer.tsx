import React, { useState, useEffect } from 'react';
import MyStampService from '../../present/logic/MyStampService';
import { FilterBoxView } from '../view/filterbox/FilterBoxView';
import CheckedFilterView from '../view/filterbox/CheckedFilterView';
import { FilterConditionName } from '../../model/FilterConditionName';
import CheckboxOptions from '../model/CheckboxOptions';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import { useParams } from 'react-router-dom';
import { CollegeService } from '../../../college/stores';
import { FilterCondition, initialCondition, getFilterCount } from '../../model/FilterCondition';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import FilterCountService from '../../present/logic/FilterCountService';

interface MyStampFilterBoxContainerProps {
  refindList: (count: number) => void;
  myStampService?: MyStampService;
  filterCountService?: FilterCountService;
  collegeService?: CollegeService;
  filterBoxService?: FilterBoxService;
}

function MyStampFilterBoxContainer({
  refindList,
  myStampService,
  filterCountService,
  collegeService,
  filterBoxService,
}: MyStampFilterBoxContainerProps) {
  const params = useParams<MyPageRouteParams>();
  const contentType = params.tab;
  
  const [showResult, setShowResult] = useState<boolean>(false);
  const [conditions, setConditions] = useState<FilterCondition>(initialCondition);

  const { colleges } = collegeService!;
  const { filterCountViews, totalFilterCountView } = filterCountService!;
  const { openFilter, setOpenFilter, setFilterCount } = filterBoxService!;

  useEffect(() => {
    if (showResult) {
      myStampService!.setFilterRdoByConditions(conditions);
      const filterCount = getFilterCount(conditions);
      refindList(filterCount);
    
      setOpenFilter(false);
      setShowResult(false);
    }
  }, [showResult]);

  useEffect(() => {
    if (!openFilter) {
      myStampService!.setFilterRdoByConditions(conditions);
      const filterCount = getFilterCount(conditions);
      setFilterCount(filterCount);
    }
  }, [openFilter]);

  useEffect(() => {
    setFilterCount(0);
    setConditions(initialCondition);
  }, [contentType]);

  const getCollegeId = (collegeName: string) => {
    const college = colleges.filter(college => college.name === collegeName)[0];
    return college.collegeId;
  };

  const onClickShowResult = () => {
    setShowResult(true);
  }


  const onCheckAll = (e: any, data: any) => {
    switch (data.name) {
      case FilterConditionName.College:
        /* 전체 해제 */
        if (conditions.collegeIds.length === colleges.length) {
          setConditions({ ...conditions, collegeIds: [] });
          break;
        }
        /* 전체 선택 */
        setConditions({ ...conditions, collegeIds: [...colleges.map(college => college.id)] });
        break;
      case FilterConditionName.DifficultyLevel:
        if (conditions.difficultyLevels.length === CheckboxOptions.difficultyLevels.length) {
          setConditions({ ...conditions, difficultyLevels: [] });
          break;
        }
        setConditions({ ...conditions, difficultyLevels: [...CheckboxOptions.difficultyLevels.map(difficultyLevel => difficultyLevel.value)] });
        break;
      case FilterConditionName.Organizer:
        if (conditions.organizers.length === CheckboxOptions.organizers.length) {
          setConditions({ ...conditions, organizers: [] });
          break;
        }
        setConditions({ ...conditions, organizers: [...CheckboxOptions.organizers.map(organizer => organizer.value)] });
        break;
      case FilterConditionName.LearningTime:
        if (conditions.learningTimes.length === CheckboxOptions.learningTimes.length) {
          setConditions({ ...conditions, learningTimes: [] });
          break;
        }
        setConditions({ ...conditions, learningTimes: [...CheckboxOptions.learningTimes.map(learningTime => learningTime.value)] });
        break;
      case FilterConditionName.Certification:
        if (conditions.certifications.length === CheckboxOptions.certifications.length) {
          setConditions({ ...conditions, certifications: [] });
          break;
        }
        setConditions({ ...conditions, certifications: [...CheckboxOptions.certifications.map(certification => certification.value)] });
        break;
    }
  };

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
    setConditions(initialCondition);
  };

  const onClearOne = (type: string, condition: string) => {
    switch (type) {
      case FilterConditionName.College:
        setConditions({ ...conditions, collegeIds: conditions.collegeIds.filter(collegeId => collegeId !== getCollegeId(condition)) });
        break;
      case FilterConditionName.DifficultyLevel:
        setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.filter(difficultyLevel => difficultyLevel !== condition) });
        break;
      case FilterConditionName.Organizer:
        setConditions({ ...conditions, organizers: conditions.organizers.filter(organizer => organizer !== condition) });
        break;
      case FilterConditionName.Required:
        setConditions({ ...conditions, required: '' });
        break;
      case FilterConditionName.LearningTime:
        setConditions({ ...conditions, learningTimes: conditions.learningTimes.filter(learningTime => learningTime !== condition) });
        break;
      case FilterConditionName.Certification:
        setConditions({ ...conditions, certifications: conditions.certifications.filter(certification => certification !== condition) });
        break;
      case FilterConditionName.LearningSchedule:
        if (condition === 'true') {
          setConditions({ ...conditions, applying: '' });
          break;
        } else {
          setConditions({ ...conditions, startDate: null, endDate: null });
          break;
        }

    }
  };

  const onChangeStartDate = (value: Date) => {
    setConditions({ ...conditions, startDate: value });
  };

  const onChangeEndDate = (value: Date) => {
    setConditions({ ...conditions, endDate: value });
  };

  const onCheckApplying = (e: any, data: any) => {
    if (conditions.applying === 'true') {
      setConditions({ ...conditions, applying: '' });
      return;
    }
    setConditions({ ...conditions, applying: data.value });
  }

  return (
    <div className={(openFilter && 'filter-table on') || 'filter-table'}>
      {openFilter && (
        <>
          <div className="title">
            Filter
            <a className="result-button" onClick={onClickShowResult}>
              <span className="result-text">결과보기</span>
            </a>
          </div>
          <FilterBoxView 
            colleges={colleges}
            conditions={conditions}
            totalFilterCount={totalFilterCountView}
            filterCounts={filterCountViews}
            onCheckAll={onCheckAll}
            onCheckOne={onCheckOne}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            onCheckApplying={onCheckApplying}
          />
          <CheckedFilterView
            colleges={colleges}
            conditions={conditions}
            onClearAll={onClearAll}
            onClearOne={onClearOne}
          />
          <div className="moreAll">
            <a className="more-text" onClick={onClickShowResult}>결과보기</a>
          </div>
        </>
      )}
    </div>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'myTraining.myStampService',
    'myTraining.filterCountService',
    'college.collegeService',
    'shared.filterBoxService',
  )
)(observer(MyStampFilterBoxContainer));
