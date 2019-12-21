
import React from 'react';

import { Segment } from 'semantic-ui-react';
import { OverviewField } from 'shared';
import { ClassroomModel } from 'personalcube/classroom';
import { InstructorModel } from 'personalcube/cubeintro';


export default {
  title: 'components|element/OverviewField/TableModal',
  component: OverviewField.TableModal,
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
        <OverviewField.TableModal classrooms={classrooms} trigger={<button>open</button>} />
      </OverviewField.Wrapper>
    </Segment>
  );
};
