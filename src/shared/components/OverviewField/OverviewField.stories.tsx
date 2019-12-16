
import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { storybookHelper, ContentLayout } from 'shared';

import OverviewField from '.';


export default {
  title: 'components|element/[Todo: 사용금지] OverviewField',
  component: OverviewField,
};


/**
 * Basic Story
 */
export const Basic = () => {
  //

  return (
    <ContentLayout className="overview">
      <div className="ov-paragraph sub-category fn-parents open">
        <OverviewField.Title icon="category" text="Sub Category" />
      </div>
    </ContentLayout>
  );
};
