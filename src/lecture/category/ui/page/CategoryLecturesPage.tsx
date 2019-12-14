
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import CategoryHeaderContainer from '../logic/CategoryHeaderContainer';
import CategoryLecturesContainer from '../logic/CategoryLecturesContainer';


@reactAutobind
class CategoryLecturesPage extends Component {
  //
  render() {
    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: 'AI College' },
        ]}
      >
        <CategoryHeaderContainer />
        <CategoryLecturesContainer />
      </ContentLayout>
    );
  }
}

export default CategoryLecturesPage;
