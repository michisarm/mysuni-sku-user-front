
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
      type: 'MenuHasCount',
    },
    {
      name: 'Menu has not count',
      type: 'MenuHasNotCount',
    },
  ];
  return (
    <ContentMenu
      menus={menus}
      type="MenuHasCount"
      onSelectMenu={() => {}}
    />
  );
};

Basic.story = {
  decorators: [Base],
};

