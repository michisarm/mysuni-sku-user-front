
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
      path: '',
    },
    {
      name: 'Menu has not count',
      path: '',
    },
  ];
  return (
    <ContentMenu
      menus={menus}
      activeIndex={number('activeIndex', 0, { range: true, min: 0, max: 1 })}
    />
  );
};

Basic.story = {
  decorators: [Base],
};

