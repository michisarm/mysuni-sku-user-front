import React from 'react';
import { Children, ReactNode } from 'react-router/node_modules/@types/react';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from 'shared';

interface props {
  isLoading: boolean;
  emptyText?: string;
  children?: React.ReactNode;
}

export default function NoSuchContentsView({
  isLoading,
  emptyText,
  children,
}: props) {
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
      {(!isLoading && children) || (
        <NoSuchContentPanel message={emptyText || ''} />
      )}
    </Segment>
  );
}
