
import React from 'react';

import { NoSuchContentPanel } from 'shared';
import { Segment } from 'semantic-ui-react';


export default {
  title: 'components|panel/NoSuchContent',
  component: NoSuchContentPanel,
};


export const Basic = () => {
  //
  return (
    <Segment className="full">
      <NoSuchContentPanel message="수강중인 학습 과정이 없습니다." />
    </Segment>
  );
};
