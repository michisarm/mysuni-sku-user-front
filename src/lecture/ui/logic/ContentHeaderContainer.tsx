
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button } from 'semantic-ui-react';
import { ContentHeader } from 'shared';


@reactAutobind
class ContentHeaderView extends Component {
  //
  render() {
    //
    return (
      <ContentHeader>
        <ContentHeader.Cell className="thumb">
          <div>
            {/*<img src={thumbnailImage} alt="College thumbnail" />*/}
          </div>
        </ContentHeader.Cell>
        <ContentHeader.Cell className="title">
          <h2 className="college-name">AI College</h2>
          <p>
            <em>AI 아싸(Outsider)에서 AI 핵인싸(Insider)로!</em>
            AI College는 SK 구성원 누구나 알아야 할 기본 지식을 바탕으로, 각 산업과 직무에서 AI를 활용하는 실무 역량을
            <br /> 배양하고 AI기술 전문가로 성장할 수 있는 기회를 제공 합니다.
          </p>
        </ContentHeader.Cell>
        <ContentHeader.Cell className="btn-wrap">
          <Button className="personal line">
            <span>SK University 전체 커리큘럼 보기</span>
          </Button>
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default ContentHeaderView;
