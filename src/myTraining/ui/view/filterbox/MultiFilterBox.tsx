import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { CollegeService } from 'college/stores';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import CheckboxOptions from '../../model/CheckboxOptions';
import CheckedFilterView from './CheckedFilterView';


interface Props {
  activeFilter: boolean;
  onFilterCount: (count: number) => void;
  collegeService?: CollegeService;
  myTrainingService?: MyTrainingService;
}

export type FilterCondition = {
  collegeIds: string[];
  learningTypes: string[];
  difficultyLevels: string[];
  organizers: string[];
  required: string;
  serviceType: string;
}

enum FilterConditionName {
  College = '컬리지',
  LearningType = '학습유형',
  DifficultyLevel = '난이도',
  Organizer = '교육기관',
  Required = '핵인싸'
}

function MultiFilterBox(props: Props) {
  const { activeFilter, onFilterCount, collegeService, myTrainingService } = props;
  const { colleges } = collegeService!;
  const [conditions, setConditions] = useState<FilterCondition>({
    collegeIds: [],
    learningTypes: [],
    difficultyLevels: [],
    organizers: [],
    required: '',
    serviceType: ''
  });


  /* filter 창이 닫히면 체크된 조건들로 새로 myTrainingViews 조회 */
  useEffect(() => {

    if (activeFilter) {
      collegeService!.findAllColleges();
    }

    if (!activeFilter) {
      myTrainingService!.changeFilterRdoWithConditions(conditions);
      const filterCount = myTrainingService!.getFilterCount();
      //
      onFilterCount(filterCount);
    }
  }, [activeFilter]);



  const getCollegeId = (collegeName: string) => {
    const college = colleges.filter(college => college.name === collegeName)[0];
    return college.collegeId;
  };

  /* Event Handlers */

  // checkbox selectAll 클릭 시, 해당 영역 데이터 전체 선택 됨.
  const onCheckAll = (e: any, data: any) => {
    switch (data.name) {
      case FilterConditionName.College:
        if (conditions.collegeIds.length === colleges.length) {
          setConditions({ ...conditions, collegeIds: [] });
          break;
        }
        setConditions({ ...conditions, collegeIds: [...colleges.map(college => college.collegeId)] });
        break;
      case FilterConditionName.LearningType:
        if (conditions.learningTypes.length === CheckboxOptions.learningTypes.length) {
          setConditions({ ...conditions, learningTypes: [] });
          break;
        }
        setConditions({ ...conditions, learningTypes: [...CheckboxOptions.learningTypes.map(learningType => learningType.value)] });
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

  // data 가 event 가 발생한 target 을 의미함.
  const onCheckOne = (e: any, data: any) => {
    switch (data.name) {
      case FilterConditionName.College: // 컬리지
        if (conditions.collegeIds.includes(data.value)) {
          setConditions({ ...conditions, collegeIds: conditions.collegeIds.filter(collegeId => collegeId !== data.value) });
          break;
        }
        setConditions({ ...conditions, collegeIds: conditions.collegeIds.concat(data.value) });
        break;
      case FilterConditionName.LearningType:  // 학습유형
        if (conditions.learningTypes.includes(data.value)) {
          setConditions({ ...conditions, learningTypes: conditions.learningTypes.filter(learningType => learningType !== data.value) });
          break;
        }

        if (conditions.serviceType === 'Course' && data.value === 'Course') {
          setConditions({ ...conditions, serviceType: '' });
          break;
        }
        // 학습 유형 중 Course를 선택했을 시, conditions의 serviceType 에 바인딩 하도록 함.
        if (data.value === 'Course') {
          setConditions({ ...conditions, serviceType: data.value });
          break;
        }

        setConditions({ ...conditions, learningTypes: conditions.learningTypes.concat(data.value) });
        break;
      case FilterConditionName.DifficultyLevel: // 난이도
        if (conditions.difficultyLevels.includes(data.value)) {
          setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.filter(difficultyLevel => difficultyLevel !== data.value) });
          break;
        }

        setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.concat(data.value) });
        break;
      case FilterConditionName.Organizer: // 교육기관
        if (conditions.organizers.includes(data.value)) {
          setConditions({ ...conditions, organizers: conditions.organizers.filter(organizer => organizer !== data.value) });
          break;
        }
        setConditions({ ...conditions, organizers: conditions.organizers.concat(data.value) });
        break;
      case FilterConditionName.Required:  //핵인싸
        setConditions({ ...conditions, required: data.value });
        break;
    }
  };
  /*
    전체해제 버튼을 눌렀을 시, 선택된 checkbox는 사라짐.
  */
  const onClearConditions = () => {
    setConditions(InitialConditions);
  };

  const onClearOne = (type: string, condition: string) => {
    switch (type) {
      case '컬리지':
        setConditions({ ...conditions, collegeIds: conditions.collegeIds.filter(collegeId => collegeId !== getCollegeId(condition)) });
        break;
      case '학습유형':
        setConditions({ ...conditions, learningTypes: conditions.learningTypes.filter(learningType => learningType !== condition) });
        break;
      case '난이도':
        setConditions({ ...conditions, difficultyLevels: conditions.difficultyLevels.filter(difficultyLevel => difficultyLevel !== condition) });
        break;
      case '교육기관':
        setConditions({ ...conditions, organizers: conditions.organizers.filter(organizer => organizer !== condition) });
        break;
    }

  };

  return (
    <div className={(activeFilter && 'filter-table on') || 'filter-table'}>
      { activeFilter && (
        <>
          <div className="title">Filter</div>
          <Table>
            {/* body */}
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>컬리지</Table.HeaderCell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>교육유형</Table.HeaderCell>
                <Table.Cell>
                  {/* select All 체크박스 */}
                  <Checkbox
                    className="base"
                    name={FilterConditionName.LearningType}
                    label={SELECT_ALL}
                    checked={conditions.learningTypes.length === CheckboxOptions.learningTypes.length}
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
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>난이도</Table.HeaderCell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>교육기관</Table.HeaderCell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>핵인싸</Table.HeaderCell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          {/* display selected values */}
          <CheckedFilterView
            colleges={colleges}
            conditions={conditions}
            onClear={onClearConditions}
            onClearOne={onClearOne}
          />
        </>
      )}
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'college.collegeService',
  'myTraining.myTrainingService'
))(React.memo(observer(MultiFilterBox)));

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
