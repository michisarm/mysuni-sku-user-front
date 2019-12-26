
import React from 'react';

import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/FileDownload',
  component: OverviewField.FileDownload,
};


/**
 * Basic Story
 */
export const Basic = () => {
  //
  const fileBoxId = '';

  return (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.FileDownload fileBoxIds={[ fileBoxId ]} />
      </OverviewField.Wrapper>
    </Segment>
  );
};
