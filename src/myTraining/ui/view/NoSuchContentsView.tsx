import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from 'shared';

interface props {
  isLoading: boolean;
  emptyText: string;
}

export default function NoSuchContentsView({ isLoading, emptyText }: props) {
  //
  return (
    <Segment
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 400,
        boxShadow: '0 0 0 0',
        border: 0,
      }}
    >
      <Loadingpanel loading={isLoading} />
      {!isLoading && <NoSuchContentPanel message={emptyText || ''} />}
    </Segment>
  );
}
