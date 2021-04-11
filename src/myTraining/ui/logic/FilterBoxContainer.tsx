import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import InMyLectureService from 'myTraining/present/logic/InMyLectureService';
import CheckedFilterView from '../view/filterbox/CheckedFilterView';
import CheckboxOptions from '../model/CheckboxOptions';
import { FilterBoxView } from '../view/filterbox/FilterBoxView';
import { CollegeService } from '../../../college/stores';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import { FilterCondition, initialCondition } from '../../model/FilterCondition';
import { FilterConditionName } from '../../model/FilterConditionName';
import { MyLearningContentType } from '../model/MyLearningContentType';
import { MyContentType } from '../model/MyContentType';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import FilterCountService from '../../present/logic/FilterCountService';


interface FilterBoxContainerProps {
  getModels: (count: number) => void;
  myTrainingService?: MyTrainingService;
  filterCountService?: FilterCountService;
  inMyLectureService?: InMyLectureService;
  lectureService?: LectureService;
  collegeService?: CollegeService;
  filterBoxService?: FilterBoxService;
}


function FilterBoxContainer({
  getModels, 
  myTrainingService, 
  filterCountService,
  inMyLectureService, 
  lectureService,
  collegeService,
  filterBoxService,
}: FilterBoxContainerProps) {
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  const [showResult, setShowResult] = useState<boolean>(false);
  const [conditions, setConditions] = useState<FilterCondition>(initialCondition);


  const { colleges } = collegeService!;
  const { openFilter, setOpenFilter, setFilterCount } = filterBoxService!;
  const { filterCountViews, totalFilterCountView } = filterCountService!;

  const onClickFilter = () => {
    setOpenFilter(!openFilter);
  }


  useEffect(() => {
    /*
      1. filter 창이 열리는 순간, College 에 대한 정보를 불러옴. 2020.10.08 by 김동구
      2. filter 창이 닫히는 순간, 체크된 조건들로 새롭게 myTrainingV2s 를 조회함.
    */
    if (showResult) {
      changeFilterRdo(contentType);
      const filterCount = getFilterCount(contentType);
      getModels(filterCount);
      
      /* 
        1. openFilter => false 
        2. showResult => false
      */
      onClickFilter();
      setShowResult(false);
    }
  }, [showResult]);

  useEffect(() => {

    if (!openFilter) {
      changeFilterRdo(contentType);
      const filterCount = getFilterCount(contentType);
      setFilterCount(filterCount);
    }
  }, [openFilter]);

  useEffect(() => {
    setFilterCount(0);
    setConditions(initialCondition);
  }, [contentType]);


  const changeFilterRdo = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        inMyLectureService!.changeFilterRdoWithConditions(conditions);
        break;
      case MyLearningContentType.Required:
        lectureService!.changeFilterRdoWithConditions(conditions);
        break;
      default:
        myTrainingService!.changeFilterRdoWithConditions(conditions);
    }
  };

  const getFilterCount = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureService!.getFilterCount();
      case MyLearningContentType.Required:
        return lectureService!.getFilterCount();
      default:
        return myTrainingService!.getFilterCount();
    }
  };


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

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService',
  'myTraining.filterCountService',
  'myTraining.inMyLectureService',
  'lecture.lectureService',
  'college.collegeService',
  'shared.filterBoxService',
))(observer(FilterBoxContainer));