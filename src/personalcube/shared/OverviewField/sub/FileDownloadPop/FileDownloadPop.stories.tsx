import React from 'react';
import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';

export default {
  title: 'components|element/OverviewField/FileDownloadPop',
  component: OverviewField.FileDownloadPop,
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
        <OverviewField.FileDownloadPop
          fileBoxIds={[fileBoxId]}
          onClose={(regist: boolean) => regist}
        />
      </OverviewField.Wrapper>
    </Segment>
  );
};
