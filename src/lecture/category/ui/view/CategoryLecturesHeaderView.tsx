
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { CollegeModel } from 'college';
import { ThumbnailView, TitleView } from './CategoryLecturesHeaderElementsView';


interface Props {
  college: CollegeModel,
}

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {
  //
  render() {
    //
    const { college } = this.props;

    return (
      <ContentHeader>
        <ContentHeader.Cell className="thumb">
          <ThumbnailView image={`${process.env.PUBLIC_URL}/images/all/thumb-college-86-px.jpg`} />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="title">
          <TitleView
            title={`${college.name} College`}
            subtitle={college.description}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="btn-wrap">
          <Button className="personal line">
            <span>SUNI 전체 커리큘럼 보기</span>
          </Button>
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default CategoryLecturesHeaderView;
