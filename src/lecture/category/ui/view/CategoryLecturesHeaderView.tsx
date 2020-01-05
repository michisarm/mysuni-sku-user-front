
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { CollegeModel } from 'college';
import { ThumbnailView, TitleView } from './CategoryLecturesHeaderElementsView';


interface Props {
  college: CollegeModel,
  onClickMySuni: () => void,
}


@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {
  //
  static thumbnailIcon = {
    Default: 'college-ai86',
    AI: 'college-ai86',
    DT: 'college-dt86',
    Global: 'college-global86',
    Leadership: 'college-leadership86',
    Management: 'college-management86',
    SV: 'college-sv86',
    Happiness: 'college-happy86',
    InnovationDesign: 'college-design86',
  };

  getThumbnailIcon(collegeName: string) {
    //
    switch (collegeName) {
      case 'AI':
        return CategoryLecturesHeaderView.thumbnailIcon.AI;
      case 'DT':
        return CategoryLecturesHeaderView.thumbnailIcon.DT;
      case 'Global':
        return CategoryLecturesHeaderView.thumbnailIcon.Global;
      case 'Leadership':
        return CategoryLecturesHeaderView.thumbnailIcon.Leadership;
      case 'Management':
        return CategoryLecturesHeaderView.thumbnailIcon.Management;
      case 'SV':
        return CategoryLecturesHeaderView.thumbnailIcon.SV;
      case '행복':
        return CategoryLecturesHeaderView.thumbnailIcon.Happiness;
      case '혁신디자인':
        return CategoryLecturesHeaderView.thumbnailIcon.InnovationDesign;
      default:
        return CategoryLecturesHeaderView.thumbnailIcon.Default;
    }
  }

  render() {
    //
    const { college, onClickMySuni } = this.props;

    return (
      <ContentHeader>
        <ContentHeader.Cell className="thumb">
          <ThumbnailView icon={this.getThumbnailIcon(college.name)} />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="title">
          <TitleView
            title={`${college.name} College`}
            subtitle={college.description}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="btn-wrap">
          <Button className="personal line" onClick={onClickMySuni}>
            <span>mySUNI 전체 커리큘럼 보기</span>
          </Button>
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default CategoryLecturesHeaderView;
