import React, { Fragment, memo } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { CollegeModel } from 'college/model';
import CheckboxOptions, {
  learningTimePolyglot,
} from 'myTraining/ui/model/CheckboxOptions';
import { FilterCondition } from '../../../model/FilterCondition';
import {
  FilterConditionName,
  filterConditionNamePolyglot,
} from '../../../model/FilterConditionName';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../../lecture/model/LangSupport';

interface Props {
  colleges: CollegeModel[];
  conditions: FilterCondition;
  onClearAll: () => void;
  onClearOne: (type: string, condition: string) => void;
}

function CheckedFilterView(props: Props) {
  /* colleges 는 collegeId 에 매핑되는 collegeName 을 구하기 위함. 2020.10.08 by 김동구 */
  const { colleges, conditions, onClearAll, onClearOne } = props;

  /* render functions */
  const renderCheckedConditions = () => {
    const buttons: React.ReactNode[] = [];
    const collegeDataList = getCollegeNames(colleges, conditions.collegeIds);

    if (conditions.learningTypes && conditions.learningTypes.length) {
      buttons.push(
        conditions.learningTypes.map((learningType, index) => (
          <Fragment key={`checked-learningType-${index}`}>
            <Button
              className="del"
              onClick={() =>
                onClearOne(
                  filterConditionNamePolyglot(FilterConditionName.LearningType),
                  learningType
                )
              }
            >
              {learningType}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.collegeIds && conditions.collegeIds.length) {
      buttons.push(
        collegeDataList.map((college, index) => (
          <Fragment key={`checked-college-${index}`}>
            <Button
              className="del"
              onClick={() =>
                onClearOne(
                  filterConditionNamePolyglot(FilterConditionName.College),
                  college.collegeId
                )
              }
            >
              {college.collegeName}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.learningTimes && conditions.learningTimes.length) {
      buttons.push(
        conditions.learningTimes.map((learningTime, index) => (
          <Fragment key={`checked-learningTime-${index}`}>
            <Button
              className="del"
              onClick={() =>
                onClearOne(
                  filterConditionNamePolyglot(FilterConditionName.LearningTime),
                  learningTime
                )
              }
            >
              {getTextFromValue(FilterConditionName.LearningTime, learningTime)}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.difficultyLevels && conditions.difficultyLevels.length) {
      buttons.push(
        conditions.difficultyLevels.map((difficultyLevel, index) => (
          <Fragment key={`checked-difficultyLevel-${index}`}>
            <Button
              className="del"
              onClick={() =>
                onClearOne(
                  filterConditionNamePolyglot(
                    FilterConditionName.DifficultyLevel
                  ),
                  difficultyLevel
                )
              }
            >
              {difficultyLevel}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.organizers && conditions.organizers.length) {
      buttons.push(
        conditions.organizers.map((organizer, index) => (
          <Fragment key={`checked-organizer-${index}`}>
            <Button
              className="del"
              onClick={() =>
                onClearOne(
                  filterConditionNamePolyglot(FilterConditionName.Organizer),
                  organizer
                )
              }
            >
              {organizer}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.required === 'true') {
      buttons.push(
        <Fragment key="checked-required-0">
          <Button
            className="del"
            onClick={() =>
              onClearOne(
                filterConditionNamePolyglot(FilterConditionName.Required),
                conditions.required
              )
            }
          >
            {filterConditionNamePolyglot(FilterConditionName.Required)}
          </Button>
        </Fragment>
      );
    }

    if (conditions.certifications && conditions.certifications.length) {
      buttons.push(
        conditions.certifications.map((certification, index) => (
          <Fragment key={`checked-certification-${index}`}>
            <Button
              className="del"
              onClick={() =>
                onClearOne(
                  filterConditionNamePolyglot(
                    FilterConditionName.Certification
                  ),
                  certification
                )
              }
            >
              {getTextFromValue(
                FilterConditionName.Certification,
                certification
              )}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.startDate && conditions.endDate) {
      buttons.push(
        <Fragment key="checked-learningSchedule-0">
          <Button
            className="del"
            onClick={() =>
              onClearOne(
                filterConditionNamePolyglot(
                  FilterConditionName.LearningSchedule
                ),
                'learningSchedule'
              )
            }
          >
            {`${moment(conditions.startDate).format('YYYY.MM.DD')}~${moment(
              conditions.endDate
            ).format('YYYY.MM.DD')}`}
          </Button>
        </Fragment>
      );
    }

    if (conditions.applying === 'true') {
      buttons.push(
        <Fragment key="checked-applying-0">
          <Button
            className="del"
            onClick={() =>
              onClearOne(
                filterConditionNamePolyglot(
                  FilterConditionName.LearningSchedule
                ),
                conditions.applying
              )
            }
          >
            수강신청 가능 학습만 보기
          </Button>
        </Fragment>
      );
    }

    return buttons;
  };

  /* render */
  return (
    <div className="selected">
      <table>
        {/* body */}
        <tbody>
          <tr>
            <th>
              <Button icon className="clear" onClick={onClearAll}>
                <Icon className="reset" />
              </Button>
              <span>
                <PolyglotText
                  defaultString="전체해제"
                  id="learning-LearningFilter1-전체해제"
                />
              </span>
            </th>
            <td>{renderCheckedConditions()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default memo(CheckedFilterView);

/* globals */
const getCollegeNames = (
  colleges: CollegeModel[],
  collegeIds: string[]
): { collegeId: string; collegeName: string }[] => {
  /* collegeId 에 해당하는 college 를 찾아 collegeName 을 구함. */

  const resultList: { collegeId: string; collegeName: string }[] = [];

  collegeIds.map((collegeId) => {
    const college = colleges.find((college) => college.id === collegeId);

    college &&
      resultList.push({
        collegeId: college.id,
        collegeName: parsePolyglotString(
          college.name,
          getDefaultLang(college.langSupports)
        ),
      });
  });

  return resultList;

  // collegeIds.map((collegeId) => {
  //   const college = colleges.filter((college) => college.id === collegeId)[0];
  //   const name =  parsePolyglotString(
  //     college.name,
  //     getDefaultLang(college.langSupports)
  //   );
  // });
};

const getTextFromValue = (
  filterConditionName: FilterConditionName,
  value: string
) => {
  console.log('test');
  console.log(value);
  switch (filterConditionName) {
    case FilterConditionName.Certification:
      return CheckboxOptions.certifications
        .filter((certification) => certification.value === value)
        .map((certification) => certification.text);
    case FilterConditionName.LearningTime:
      return CheckboxOptions.learningTimes
        .filter((learningTime) => learningTime.value === value)
        .map((learningTime) => learningTimePolyglot(learningTime.text));
  }
};
