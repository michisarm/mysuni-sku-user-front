
import React from 'react';

import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/Item',
  component: OverviewField.Item,
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
          <OverviewField.Item
            title="AI"
            content="AI Biz Essential / AI Tech Biginner / Language AI / AI Tech Advanced / Speech AI"
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );

