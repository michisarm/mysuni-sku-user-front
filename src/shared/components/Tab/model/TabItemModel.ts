
import React from 'react';
import RenderPropsModel from './RenderPropsModel';


interface TabItemModel {
  //
  name: string;
  render: (props: RenderPropsModel) => React.ReactNode;

  item?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default TabItemModel;
