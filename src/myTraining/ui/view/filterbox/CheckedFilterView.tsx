import { CollegeModel } from 'college/model';
import React, { Fragment, useRef } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { FilterCondition } from './MultiFilterBox';

interface Props {
  colleges: CollegeModel[];
  conditions: FilterCondition;
  onClear: () => void;
  onClearOne: (type: string, condition: string) => void;
}

function CheckedFilterView(props: Props) {
  const { colleges, conditions, onClear, onClearOne } = props;




  /* functions */
  const getCollegeNames = (collegeIds: string[]) => {
    return collegeIds.map(collegeId => {
      return colleges.filter(college => college.collegeId === collegeId)
        .map(college => college.name);
    });
  };

  const renderCheckedConditions = () => {
    const buttons: React.ReactNode[] = [];
    const collegeNames = getCollegeNames(conditions.collegeIds);

    if (conditions.collegeIds &&
      conditions.collegeIds.length) {
      buttons.push(
        collegeNames.map((collegeName, index) => (
          <Fragment key={`college-view-${index}`}>
            <Button className="del" onClick={() => onClearOne('컬리지', collegeName[0])}>
              {collegeName}
            </Button>
          </Fragment >
        ))
      );
    }

    if (conditions.learningTypes &&
      conditions.learningTypes.length) {
      buttons.push(
        conditions.learningTypes.map((learningType, index) => (
          <Fragment key={`learningType-view-${index}`}>
            <Button className="del" onClick={() => onClearOne('학습유형', learningType)}>
              {learningType}
            </Button>
          </Fragment >
        ))
      );
    }

    if (conditions.difficultyLevels &&
      conditions.difficultyLevels.length) {
      buttons.push(
        conditions.difficultyLevels.map((difficultyLevel, index) => (
          <Fragment key={`difficultyLevel-view-${index}`}>
            <Button className="del" onClick={() => onClearOne('난이도', difficultyLevel)}>
              {difficultyLevel}
            </Button>
          </Fragment>
        ))
      );
    }

    if (conditions.organizers &&
      conditions.organizers.length) {
      buttons.push(
        conditions.organizers.map((organizer, index) => (
          <Fragment key={`organizer-view-${index}`}>
            <Button className="del" onClick={() => onClearOne('교육기관', organizer)}>
              {organizer}
            </Button>
          </Fragment>
        ))
      );
    }

    return buttons;
  };


  return (
    <div className="selected">
      <Table>
        {/* body */}
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
              <Button icon className="clear" onClick={onClear}>
                <Icon className="reset" />
              </Button>
              <span>전체해제</span>
            </Table.HeaderCell>
            <Table.Cell>{renderCheckedConditions()}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default CheckedFilterView;
