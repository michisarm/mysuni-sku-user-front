import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { CheckboxProps } from 'semantic-ui-react';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { CollegeService } from '../../../college/stores';
import { getDefaultLang } from '../../../lecture/model/LangSupport';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { getFilterCount, initialCondition } from '../../model/FilterCondition';
import {
  FilterConditionName,
  filterConditionNamePolyglot,
} from '../../model/FilterConditionName';
import { MyLearningContentType, MyPageContentType } from '../model';
import CheckboxOptions from '../model/CheckboxOptions';
import CheckedFilterView from '../view/filterbox/CheckedFilterView';
import { FilterBoxView } from '../view/filterbox/FilterBoxView';

interface FilterBoxContainerProps {
  collegeService?: CollegeService;
  filterBoxService?: FilterBoxService;
  contentType: MyLearningContentType | MyPageContentType;
}

function FilterBoxContainer({
  collegeService,
  filterBoxService,
  contentType,
}: FilterBoxContainerProps) {
  const { availableColleges } = collegeService!;
  const {
    filterCountViews,
    findAllFilterCountViews,
    conditions,
    openFilter,
    showResult,
    setConditions,
    setOpenFilter,
    setFilterCount,
    setShowResult,
  } = filterBoxService!;
  //
  useEffect(() => {
    findAllFilterCountViews(contentType);
  }, [contentType]);

  useEffect(() => {
    if (showResult) {
      setOpenFilter(false);
      setShowResult(false);
    }
  }, [setOpenFilter, setShowResult, showResult]);

  useEffect(() => {
    if (!openFilter) {
      const filterCount = getFilterCount(conditions);
      setFilterCount(filterCount);
    }
  }, [conditions, openFilter, setFilterCount]);

  const getCollegeId = (collegeName: string) => {
    const college = availableColleges.filter(
      (college) =>
        parsePolyglotString(
          college.name,
          getDefaultLang(college.langSupports)
        ) === collegeName
    )[0];
    return college.collegeId;
  };

  const onClickShowResult = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowResult(true);
  };

  const onCheckAll = (_: React.FormEvent, data: CheckboxProps) => {
    switch (data.name) {
      case filterConditionNamePolyglot(FilterConditionName.LearningType):
        if (
          conditions.learningTypes.length ===
          CheckboxOptions.learningTypes.length
        ) {
          setConditions({ ...conditions, learningTypes: [] });
          break;
        }
        setConditions({
          ...conditions,
          learningTypes: [
            ...CheckboxOptions.learningTypes.map(
              (learningType) => learningType.value
            ),
          ],
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.College):
        if (conditions.collegeIds.length === availableColleges.length) {
          setConditions({ ...conditions, collegeIds: [] });
          break;
        }

        setConditions({
          ...conditions,
          collegeIds: [...availableColleges.map((college) => college.id)],
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.DifficultyLevel):
        if (
          conditions.difficultyLevels.length ===
          CheckboxOptions.difficultyLevels.length
        ) {
          setConditions({ ...conditions, difficultyLevels: [] });
          break;
        }
        setConditions({
          ...conditions,
          difficultyLevels: [
            ...CheckboxOptions.difficultyLevels.map(
              (difficultyLevel) => difficultyLevel.value
            ),
          ],
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Organizer):
        if (
          conditions.organizers.length === CheckboxOptions.organizers.length
        ) {
          setConditions({ ...conditions, organizers: [] });
          break;
        }
        setConditions({
          ...conditions,
          organizers: [
            ...CheckboxOptions.organizers.map((organizer) => organizer.value),
          ],
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.LearningTime):
        if (
          conditions.learningTimes.length ===
          CheckboxOptions.learningTimes.length
        ) {
          setConditions({ ...conditions, learningTimes: [] });
          break;
        }
        setConditions({
          ...conditions,
          learningTimes: [
            ...CheckboxOptions.learningTimes.map(
              (learningTime) => learningTime.value
            ),
          ],
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Certification):
        if (
          conditions.certifications.length ===
          CheckboxOptions.certifications.length
        ) {
          setConditions({ ...conditions, certifications: [] });
          break;
        }
        setConditions({
          ...conditions,
          certifications: [
            ...CheckboxOptions.certifications.map(
              (certification) => certification.value
            ),
          ],
        });
        break;
    }
  };

  const onCheckOne = (_: React.FormEvent, data: CheckboxProps) => {
    if (typeof data.value !== 'string') {
      return;
    }

    switch (data.name) {
      case filterConditionNamePolyglot(FilterConditionName.LearningType):
        if (conditions.learningTypes.includes(data.value)) {
          setConditions({
            ...conditions,
            learningTypes: conditions.learningTypes.filter(
              (learningType) => learningType !== data.value
            ),
          });
          break;
        }

        setConditions({
          ...conditions,
          learningTypes: conditions.learningTypes.concat(data.value),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.College):
        if (conditions.collegeIds.includes(data.value)) {
          setConditions({
            ...conditions,
            collegeIds: conditions.collegeIds.filter(
              (collegeId) => collegeId !== data.value
            ),
          });
          break;
        }

        setConditions({
          ...conditions,
          collegeIds: conditions.collegeIds.concat(data.value),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.DifficultyLevel):
        if (conditions.difficultyLevels.includes(data.value)) {
          setConditions({
            ...conditions,
            difficultyLevels: conditions.difficultyLevels.filter(
              (difficultyLevel) => difficultyLevel !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          difficultyLevels: conditions.difficultyLevels.concat(data.value),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.LearningTime):
        if (conditions.learningTimes.includes(data.value)) {
          setConditions({
            ...conditions,
            learningTimes: conditions.learningTimes.filter(
              (learningTIme) => learningTIme !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          learningTimes: conditions.learningTimes.concat(data.value),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Organizer):
        if (conditions.organizers.includes(data.value)) {
          setConditions({
            ...conditions,
            organizers: conditions.organizers.filter(
              (organizer) => organizer !== data.value
            ),
          });
          break;
        }
        setConditions({
          ...conditions,
          organizers: conditions.organizers.concat(data.value),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Required):
        setConditions({ ...conditions, required: data.value });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Certification):
        if (conditions.certifications.includes(data.value)) {
          setConditions({
            ...conditions,
            certifications: conditions.certifications.filter(
              (certification) => certification !== data.value
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
    setConditions(initialCondition);
  };

  const onClearOne = (type: string, condition: string) => {
    switch (type) {
      case filterConditionNamePolyglot(FilterConditionName.LearningType):
        setConditions({
          ...conditions,
          learningTypes: conditions.learningTypes.filter(
            (learningType) => learningType !== condition
          ),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.College):
        setConditions({
          ...conditions,
          collegeIds: conditions.collegeIds.filter(
            (collegeId) => collegeId !== condition
          ),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.DifficultyLevel):
        setConditions({
          ...conditions,
          difficultyLevels: conditions.difficultyLevels.filter(
            (difficultyLevel) => difficultyLevel !== condition
          ),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Organizer):
        setConditions({
          ...conditions,
          organizers: conditions.organizers.filter(
            (organizer) => organizer !== condition
          ),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Required):
        setConditions({ ...conditions, required: '' });
        break;
      case filterConditionNamePolyglot(FilterConditionName.LearningTime):
        setConditions({
          ...conditions,
          learningTimes: conditions.learningTimes.filter(
            (learningTime) => learningTime !== condition
          ),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.Certification):
        setConditions({
          ...conditions,
          certifications: conditions.certifications.filter(
            (certification) => certification !== condition
          ),
        });
        break;
      case filterConditionNamePolyglot(FilterConditionName.LearningSchedule):
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

  return (
    <div className={(openFilter && 'filter-table on') || 'filter-table'}>
      {openFilter && (
        <>
          <div className="title">
            <PolyglotText
              defaultString="Filter"
              id="learning-LearningFilter1-??????"
            />
            <a className="result-button" onClick={onClickShowResult}>
              <span className="result-text">
                <PolyglotText
                  defaultString="????????????"
                  id="learning-LearningFilter1-??????1"
                />
              </span>
            </a>
          </div>
          <FilterBoxView
            colleges={availableColleges}
            conditions={conditions}
            filterCountModel={filterCountViews}
            onCheckOne={onCheckOne}
            onCheckAll={onCheckAll}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
          />
          <CheckedFilterView
            colleges={availableColleges}
            conditions={conditions}
            onClearOne={onClearOne}
            onClearAll={onClearAll}
          />
          <div className="moreAll">
            <a className="more-text" onClick={onClickShowResult}>
              <PolyglotText
                defaultString="????????????"
                id="learning-LearningFilter1-??????2"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default inject(
  mobxHelper.injectFrom('college.collegeService', 'shared.filterBoxService')
)(observer(FilterBoxContainer));
