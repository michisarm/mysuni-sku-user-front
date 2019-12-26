
import React from 'react';

import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/Wrapper',
  component: OverviewField.Wrapper,
};


/**
 * Basic Story
 */
export const Basic = () => {
  //
  return (
    <Segment className="full">
      <OverviewField.Wrapper>
        Overview.List area
      </OverviewField.Wrapper>
    </Segment>
  );
};
