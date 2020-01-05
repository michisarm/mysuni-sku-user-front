
import React, { FunctionComponent } from 'react';

import { Segment } from 'semantic-ui-react';



export const Wrapper: FunctionComponent = ({ children }) => (
  <Segment className="full">
    <div className="ui active tab">
      {children}
    </div>
  </Segment>
);

