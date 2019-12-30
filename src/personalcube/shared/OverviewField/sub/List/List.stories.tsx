
import React from 'react';

import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/List',
  component: OverviewField.List,
};


/**
 * Basic Story
 */
export const Basic = () =>
  //
  (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.List>
          Overview.Item area
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );

