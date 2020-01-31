
import React, { FunctionComponent } from 'react';
import { Segment } from 'semantic-ui-react';


export const ContentWrapper: FunctionComponent = ({ children }) => (
  <Segment className="full">
    <div className="ui active tab">
      {children}
    </div>
  </Segment>
);

export const TabsView: FunctionComponent = ({ children }) => (
  <Segment className="full">
    <div className="ui tab-menu">
      <div className="cont-inner">
        <div className="ui sku menu">
          {children}
        </div>
      </div>
    </div>
  </Segment>
);
