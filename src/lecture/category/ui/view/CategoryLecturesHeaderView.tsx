import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { ActionLogService } from 'shared/stores';
import { CollegeModel } from 'college/model';
import { ThumbnailView, TitleView } from './CategoryLecturesHeaderElementsView';
import { Area } from 'tracker/model';

interface Props {
  actionLogService?: ActionLogService;
  college: CollegeModel;
  onClickMySuni: () => void;
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
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
    SemicondDesign: 'college-semicond86',
    Skacademy: 'college-skacademy86',
    EnergySolution: 'college-energy86',
    SkOperation: 'college-operation86',
    LifeStyle: 'college-life86',
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
      case '반도체':
        return CategoryLecturesHeaderView.thumbnailIcon.SemicondDesign;
      case 'SK아카데미':
        return CategoryLecturesHeaderView.thumbnailIcon.Skacademy;
      case '에너지솔루션':
        return CategoryLecturesHeaderView.thumbnailIcon.EnergySolution;
      case 'SK경영':
        return CategoryLecturesHeaderView.thumbnailIcon.SkOperation;
      case 'Life Style':
        return CategoryLecturesHeaderView.thumbnailIcon.LifeStyle;
      default:
        return CategoryLecturesHeaderView.thumbnailIcon.Default;
    }
  }

  collegeTabMove(name: string) {
    switch (name) {
      case 'AI':
        return true;
      case 'DT':
        return true;
      case '행복':
        return true;
      case 'SV':
        return true;
      case '혁신디자인':
        return true;
      case 'Global':
        return true;
      case 'Leadership':
        return true;
      case 'Management':
        return true;
      case '미래반도체':
        return true;
      case '에너지솔루션':
        return true;
      case 'BM Design & Storytelling':
        return true;
      case 'SK아카데미':
        return true;
      default:
        return false;
    }
  }

  render() {
    //
    const { actionLogService, college, onClickMySuni } = this.props;

    return (
      <ContentHeader dataArea={Area.COLLEGE_INFO}>
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
          {/*eslint-disable*/
          this.collegeTabMove(college.name) === true && (
            <Button
              className="personal line"
              onClick={() => {
                actionLogService?.registerClickActionLog({
                  subAction: 'mySUNI 전체 커리큘럼 보기',
                });
                onClickMySuni();
              }}
            >
              <span>College 전체 커리큘럼 보기</span>
            </Button>
          )
          /*eslint-enable */
          }
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default CategoryLecturesHeaderView;
