import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import MySuniView from '../view/MySuniView';
import CollegeView from '../view/CollegeView';
import CertificationView from '../view/CertificationView';
import certificationRoutePaths from '../../../certification/routePaths';
import PromotionTab from '../view/PromotionTab';
import { SkProfileService } from '../../../profile/stores';

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  tab: ContentType;
}

enum ContentType {
  MySuni = 'MySuni',
  College = 'College',
  Certification = 'Certification',
  PromotionTab = 'PromotionTab',
}

enum ContentTypeKoName {
  MySuni = 'mySUNI 소개',
  College = 'College 소개',
  Certification = '인증제도 소개',
  PromotionTab = '홍보자료',
}

enum ContentTypeEnName {
  MySuni = 'mySUNI Introduction',
  College = 'College Introduction',
  Certification = 'Certification System Introduction',
  PromotionTab = 'Promotional Materials',
}

enum ContentTypeZhName {
  MySuni = 'mySUNI介绍',
  College = 'College介绍',
  Certification = '认证制度介绍',
  PromotionTab = '宣传资料',
}

@reactAutobind
@observer
class UserMainPage extends Component<Props> {
  //
  getTabs() {
    //
    return [
      {
        name: ContentType.MySuni,
        item:
          SkProfileService.instance.skProfile.language === 'English'
            ? ContentTypeEnName.MySuni
            : SkProfileService.instance.skProfile.language === 'Chinese'
            ? ContentTypeZhName.MySuni
            : ContentTypeKoName.MySuni,
        render: () => <MySuniView />,
      },
      {
        name: ContentType.College,
        item:
          SkProfileService.instance.skProfile.language === 'English'
            ? ContentTypeEnName.College
            : SkProfileService.instance.skProfile.language === 'Chinese'
            ? ContentTypeZhName.College
            : ContentTypeKoName.College,
        render: () => <CollegeView />,
      },
      {
        name: ContentType.Certification,
        item:
          SkProfileService.instance.skProfile.language === 'English'
            ? ContentTypeEnName.Certification
            : SkProfileService.instance.skProfile.language === 'Chinese'
            ? ContentTypeZhName.Certification
            : ContentTypeKoName.Certification,
        render: () => <CertificationView />,
      },
      {
        name: ContentType.PromotionTab,
        item:
          SkProfileService.instance.skProfile.language === 'English'
            ? ContentTypeEnName.PromotionTab
            : SkProfileService.instance.skProfile.language === 'Chinese'
            ? ContentTypeZhName.PromotionTab
            : ContentTypeKoName.PromotionTab,
        render: () => <PromotionTab />,
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel): string {
    //
    this.props.history.push(routePaths.introductionTab(tab.name));

    return routePaths.introductionTab(tab.name);
  }

  renderTabContent(props: any) {
    //
    return (
      <div className={classNames('ui tab', { active: props.active })}>
        {props.tab.render(props)}
      </div>
    );
  }

  render() {
    //
    const { params } = this.props.match;

    let paramsTab = params.tab as string;
    if (paramsTab.indexOf('?') > -1) {
      paramsTab = paramsTab.substr(0, paramsTab.indexOf('?'));
    }

    return (
      <ContentLayout
        className={`bg-white introduction ${
          SkProfileService.instance.skProfile.language === 'English'
            ? 'eng'
            : ''
        }${
          SkProfileService.instance.skProfile.language === 'Chinese'
            ? 'chn'
            : ''
        }`}
        breadcrumb={[
          { text: 'About Us', path: routePaths.introductionMySuni() },
          {
            text:
              SkProfileService.instance.skProfile.language === 'English'
                ? ContentTypeEnName[params.tab]
                : SkProfileService.instance.skProfile.language === 'Chinese'
                ? ContentTypeZhName[params.tab]
                : ContentTypeKoName[params.tab],
          },
        ]}
      >
        <Tab
          large
          className="tab-menu2 offset0"
          defaultActiveName={paramsTab}
          tabs={this.getTabs()}
          onChangeTab={this.onChangeTab}
          renderContent={this.renderTabContent}
          renderStaticMenu={() => (
            <>
              {paramsTab === 'Certification' && (
                <NavLink to={certificationRoutePaths.badge()}>
                  <div className="item-button">
                    {SkProfileService.instance.skProfile.language === 'English'
                      ? 'Go to Certification'
                      : SkProfileService.instance.skProfile.language ===
                        'Chinese'
                      ? '进入Certification'
                      : 'Certification 바로가기'}
                  </div>
                </NavLink>
              )}
            </>
          )}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(UserMainPage);
