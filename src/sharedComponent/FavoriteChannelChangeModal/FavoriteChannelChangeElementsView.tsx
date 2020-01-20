
import React, { FunctionComponent } from 'react';


export const ContentWrapper: FunctionComponent = ({ children }) => (
  <div className="channel-change">
    <div className="table-css">
      {children}
    </div>
  </div>
);
