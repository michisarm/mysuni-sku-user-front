import React from 'react';
import RenderPropsModel from './RenderPropsModel';

export default interface TabItemModel {
  //
  name: string;
  render: (props: RenderPropsModel) => React.ReactNode;

  item?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
