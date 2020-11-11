import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Checkbox } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { CollegeService } from 'college/stores';
import { LectureService } from 'lecture';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import InMyLectureService from 'myTraining/present/logic/InMyLectureService';
import { MyContentType, ViewType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import CheckedFilterView from './CheckedFilterView';
import CheckboxOptions from '../../model/CheckboxOptions';

interface Props {
  contentType: MyContentType;
  viewType: ViewType;
  openFilter: boolean;
  onChangeFilterCount: (count: number) => void;
  collegeService?: CollegeService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  lectureService?: LectureService;
}

export type FilterCondition = {
  collegeIds: string[];                 // 컬리지
  learningTypes: string[];              // 학습유형
  difficultyLevels: string[];           // 난이도
  organizers: string[];                 // 교육기관
  required: string;                     // 권장과정
  serviceType: string;                  // 학습유형에 포함되어 있는 'Course'
}

export enum FilterConditionName {
  College = '컬리지',
  LearningType = '학습유형',
  DifficultyLevel = '난이도',
  Organizer = '교육기관',
  Required = '핵인싸'
}

/*
  학습유형의 'Course' 항목은 학습유형(learningTypes) 에 속해 있으나, 실제 conditions 의 serviceType 에 값이 바인딩 됨. 
  'Course' 가 학습유형에 묶여 있으면서도 검색 조건에 있어서 다른 학습유형과 분리하기 위함. 2020.10.08 by 김동구.
*/
function MultiFilterBox(props: Props) {
  const { contentType, viewType, openFilter, onChangeFilterCount, collegeService, myTrainingService, inMyLectureService, lectureService } = props;
  const { colleges } = collegeService!;

  /* states */
  const [conditions, setConditions] = useState<FilterCondition>({
    collegeIds: [],
    learningTypes: [],
    difficultyLevels: [],
    organizers: [],
    required: '',
    serviceType: ''
  });

  /* effects */
  useEffect(() => {
    /* 
      1. filter 창이 열리는 순간, College 에 대한 정보를 불러옴. 2020.10.08 by 김동구
      2. filter 창이 닫히는 순간, 체크된 조건들로 새롭게 myTrainingV2s 를 조회함.
    */
    if (openFilter) {
      collegeService!.findAllColleges();
    }

    if (!openFilter) {
      changeFilterRdo(contentType);
      const filterCount = getFilterCount(contentType);
      onChangeFilterCount(filterCount);
    }
  }, [openFilter]);


  /* functions */
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

  /* handlers */
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
        if (conditions.collegeIds.length === colleges.length) {
          setConditions({ ...conditions, collegeIds: [] });
          break;
        }
        /* 전체 선택 */
        setConditions({ ...conditions, collegeIds: [...colleges.map(college => college.collegeId)] });
        break;
      case FilterConditionName.LearningType:
        if (conditions.learningTypes.length === CheckboxOptions.learningTypes.length - 1 && conditions.serviceType) {
          setConditions({ ...conditions, learningTypes: [], serviceType: '' });
          break;
        }
        setConditions({
          ...conditions,
          learningTypes: [...CheckboxOptions.learningTypes.map(learningType => learningType.value).filter(value => value !== 'Course')],
          serviceType: 'Course'
        });
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
    }
  };

  const onCheckOne = (e: any, data: any) => {
    /*
      개별 선택이 가능한 모든 항목들.
        1. 컬리지
        2. 학습유형
        3. 난이도
        4. 교육기관
        5. 핵인싸
    */
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
    }
  };

  const onClearAll = () => {
    setConditions(InitialConditions);
  };

  const onClearOne = (type: string, condition: string) => {
    switch (type) {
      case FilterConditionName.College:
        setConditions({ ...conditions, collegeIds: conditions.collegeIds.filter(collegeId => collegeId !== getCollegeId(condition)) });
        break;
      case FilterConditionName.LearningType:
        setConditions({ ...conditions, learningTypes: conditions.learningTypes.filter(learningType => learningType !== condition) });
        if (condition === 'Course') {
          setConditions({ ...conditions, serviceType: '' });
        }
        break;
      case FilterConditionName.DifficultyLevel:
        setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.filter(difficultyLevel => difficultyLevel !== condition) });
        break;
      case FilterConditionName.Organizer:
        setConditions({ ...conditions, organizers: conditions.organizers.filter(organizer => organizer !== condition) });
        break;
      case FilterConditionName.Required:
        setConditions({ ...conditions, required: '' });
    }

  };
  /* render functions */
  const displayRow = (contentType: MyContentType, viewType: ViewType, filterConditionName?: FilterConditionName) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed: {
        if (viewType === 'Course') {
          if (filterConditionName && filterConditionName === FilterConditionName.Required) {
            return true;
          }
          return false;
        }
        return true;
      }
      case MyLearningContentType.Required: {
        if (filterConditionName && filterConditionName === FilterConditionName.Required) {
          return false;
        }
        return true;
      }
      case MyPageContentType.EarnedStampList: {
        if (filterConditionName && (filterConditionName === FilterConditionName.College || filterConditionName === FilterConditionName.Required)) {
          return true;
        }
        return false;
      }
      default:
        return true;
    }
  };

  /* render */
  return (
    <div className={(openFilter && 'filter-table on') || 'filter-table'}>
      {openFilter && (
        <>
          <div className="title">Filter</div>
          <table className="">
            <tbody>
              <tr>
                {/* 컬리지 */}
                <th>{FilterConditionName.College}</th>
                <td>
                  {/* select All 체크박스 */}
                  <Checkbox
                    className="base"
                    name={FilterConditionName.College}
                    label={SELECT_ALL}
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
                          label={college.name}
                          value={college.collegeId}
                          checked={conditions.collegeIds.includes(college.collegeId)}
                          onChange={onCheckOne}
                        />
                      </Fragment>
                    ))}
                </td>
              </tr>
              {displayRow(contentType, viewType) && (
                <tr>
                  {/* 학습유형 */}
                  <th>{FilterConditionName.LearningType}</th>
                  <td>
                    {/* select All 체크박스 */}
                    <Checkbox
                      className="base"
                      name={FilterConditionName.LearningType}
                      label={SELECT_ALL}
                      checked={(conditions.learningTypes.length === CheckboxOptions.learningTypes.length - 1 && conditions.serviceType.length !== 0)}
                      onChange={onCheckAll}
                    />
                    {CheckboxOptions.learningTypes.map((learningType, index) => (
                      <Fragment key={`checkbox-learningType-${index}`}>
                        <Checkbox
                          className="base"
                          name={FilterConditionName.LearningType}
                          label={learningType.text}
                          value={learningType.value}
                          checked={conditions.learningTypes.includes(learningType.value) || conditions.serviceType === learningType.value}
                          onChange={onCheckOne}
                        />
                      </Fragment>
                    ))}
                  </td>
                </tr>
              )}
              {displayRow(contentType, viewType) && (
                <tr>
                  {/* 난이도 */}
                  <th>{FilterConditionName.DifficultyLevel}</th>
                  <td>
                    {/* select All 체크박스 */}
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
              )}
              {displayRow(contentType, viewType) && (
                <tr>
                  {/* 교육기관 */}
                  <th>{FilterConditionName.Organizer}</th>
                  <td>
                    {/* select All 체크박스 */}
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
                </tr>
              )}
              {displayRow(contentType, viewType, FilterConditionName.Required) && (
                <tr>
                  {/* 핵인싸 */}
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
              )}
            </tbody>
          </table>
          {/* display selected conditions */}
          <CheckedFilterView
            colleges={colleges}
            conditions={conditions}
            onClearAll={onClearAll}
            onClearOne={onClearOne}
          />
        </>
      )}
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'college.collegeService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
  'lecture.lectureService'
))(observer(MultiFilterBox));

/* globals */
const SELECT_ALL = 'Select All';
const InitialConditions = {
  collegeIds: [],
  learningTypes: [],
  difficultyLevels: [],
  organizers: [],
  required: '',
  serviceType: ''
};

