
import React from 'react';
import { number } from '@storybook/addon-knobs';
import { ContentMenu } from 'shared';


export default {
  title: 'components|layout/ContentMenu',
  component: ContentMenu,
};


const Base = (storyFn: any) => (
  <div>
    {...storyFn()}
  </div>
);


export const Basic = () => {
  //
  const menus: typeof ContentMenu.Menu[] = [
    {
      name: 'Menu has count',
      count: 5,
      type: ContentMenu.Type.Overview,
    },
    {
      name: 'Menu has not count',
      type: ContentMenu.Type.Comments,
    },
  ];
  return (
    <ContentMenu
      menus={menus}
      type={ContentMenu.Type.Overview}
      onSelectMenu={(type) => console.log(type)}
    />
  );
};

Basic.story = {
  decorators: [Base],
};

