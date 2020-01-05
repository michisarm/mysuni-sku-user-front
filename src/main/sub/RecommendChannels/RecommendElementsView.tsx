
import React from 'react';
import { Segment } from 'semantic-ui-react';


export const Wrapper: React.FunctionComponent = ({ children }) => (
  <div className="recommend-area" id="recommend">
    <Segment className="full">
      {children}
    </Segment>
  </div>
);
