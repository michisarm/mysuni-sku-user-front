
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ContentLayout, UserApp } from 'shared';


export default {
  title: 'components|layout/ContentLayout',
  component: ContentLayout,
};


const Base = (storyFn: any) => (
  <UserApp>
    {...storyFn()}
  </UserApp>
);


export const Basic = () =>
  //
  (
    <ContentLayout
      className="learning"
      breadcrumb={[
        { text: 'learning', path: '/learning' },
        { text: 'AI College', path: '/learning/ai-college' },
      ]}
    >
      <h2>Content</h2>
    </ContentLayout>
  );
Basic.story = {
  decorators: [Base],
};

