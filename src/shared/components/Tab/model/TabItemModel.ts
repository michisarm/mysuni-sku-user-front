
import React from 'react';
import RenderPropsModel from './RenderPropsModel';


interface TabItemModel {
  name: string;
  item?: React.ReactNode;
  render: (props: RenderPropsModel) => React.ReactNode;
  onClick?: () => void;
}

export default TabItemModel;
