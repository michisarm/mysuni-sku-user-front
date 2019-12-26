
import React from 'react';

import { Segment } from 'semantic-ui-react';
import { ClassroomModel } from 'personalcube/classroom';
import { InstructorModel } from 'personalcube/cubeintro';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/Table',
  component: OverviewField.Table,
};


/**
 * Basic Story
 */
export const Basic = () => {
  //
  const mockClassroom = new ClassroomModel();
  const mockInstructor = new InstructorModel();

  const classrooms = [
    new ClassroomModel({
      ...mockClassroom,
      round: 1,
      instructor: new InstructorModel({ ...mockInstructor, name: '김강사' }),
    }),
    new ClassroomModel({
      ...mockClassroom,
      round: 2,
      instructor: new InstructorModel({ ...mockInstructor, name: '이강사' }),
    }),
  ];

  return (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.List
          header={(
            <OverviewField.Table
              titleIcon="series"
              titleText="Class Series"
              classrooms={classrooms}
            />
          )}
        >
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );
};
