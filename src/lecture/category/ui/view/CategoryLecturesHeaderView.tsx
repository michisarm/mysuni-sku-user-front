import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';
import { includes } from 'lodash';
import { reactAutobind } from '@nara.platform/accent';
import { ContentHeader } from 'shared';
import { CollegeModel } from 'college/model';
import { ThumbnailView, TitleView } from './CategoryLecturesHeaderElementsView';
import { Area } from 'tracker/model';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

const VISIBLE_COLLEGE_IDS = [
  'CLG00001',
  'CLG00002',
  'CLG00003',
  'CLG00004',
  'CLG00005',
  'CLG00006',
  'CLG00007',
  'CLG00008',
  'CLG00019',
  'CLG0001c',
  'CLG00020',
  'CLG00018',
];

interface Props {
  college: CollegeModel;
  onClickMySuni: () => void;
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
      case 'Environment':
        return CategoryLecturesHeaderView.thumbnailIcon.EnergySolution;
      case 'SK경영':
        return CategoryLecturesHeaderView.thumbnailIcon.SkOperation;
      case 'Life Style':
        return CategoryLecturesHeaderView.thumbnailIcon.LifeStyle;
      default:
        return CategoryLecturesHeaderView.thumbnailIcon.Default;
    }
  }

  render() {
    const { college, onClickMySuni } = this.props;
    const displayCurriculum = includes(VISIBLE_COLLEGE_IDS, college.collegeId);

    return (
      <ContentHeader dataArea={Area.COLLEGE_INFO}>
        <ContentHeader.Cell className="thumb">
          <ThumbnailView
            icon={this.getThumbnailIcon(
              parsePolyglotString(
                college.name,
                getDefaultLang(college.langSupports)
              )
            )}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="title">
          <TitleView
            title={`${parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            )}`}
            subtitle={parsePolyglotString(
              college.description,
              getDefaultLang(college.langSupports)
            )}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="btn-wrap">
          {displayCurriculum === true && (
            <Button
              className="personal line"
              onClick={() => {
                onClickMySuni();
              }}
            >
              <span>
                <PolyglotText
                  defaultString="커리큘럼 보기"
                  id="cicl-mall-clcm"
                />
              </span>
            </Button>
          )}
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default CategoryLecturesHeaderView;
