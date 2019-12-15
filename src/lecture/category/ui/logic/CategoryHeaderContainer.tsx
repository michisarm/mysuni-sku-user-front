
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Button } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { CollegeService } from 'college';
import { ThumbnailView, TitleView } from '../view/CategoryHeaderElementsView';


interface Props {
  collegeService?: CollegeService
}

@inject('collegeService')
@reactAutobind
@observer
class CategoryHeaderContainer extends Component<Props> {
  //
  render() {
    //
    const { collegeService } = this.props;

    return (
      <ContentHeader>
        <ContentHeader.Cell className="thumb">
          <ThumbnailView image={`${process.env.PUBLIC_URL}/images/all/thumb-college-86-px.jpg`} />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="title">
          <TitleView
            title="AI College"
            subtitle="AI 아싸(Outsider)에서 AI 핵인싸(Insider)로!"
            description="AI College는 SK 구성원 누구나 알아야 할 기본 지식을 바탕으로, 각 산업과 직무에서 AI를 활용하는 실무 역량을\n배양하고 AI기술 전문가로 성장할 수 있는 기회를 제공 합니다."
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

export default CategoryHeaderContainer;
