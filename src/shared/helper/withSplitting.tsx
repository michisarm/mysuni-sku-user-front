
import React from 'react';
import DynamicImport from './DynamicImport';


const withSplitting = (getComponent: () => Promise<any>) => (
  (props: any) => <DynamicImport load={getComponent} {...props} />
);

export default withSplitting;
