
import React from 'react';

import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/Title',
  component: OverviewField.Title,
};


/**
 * Basic Story
 */
export const Basic = () =>
  //
  (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.List
          header={<OverviewField.Title icon="category" text="μλΈμ±λ" />}
        >
          Overview.Item area
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );

