import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import classNames from 'classnames';
import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { ActionEventService } from 'shared/stores';
import { LectureServiceType } from 'lecture/model';
import TabItemModel from './model/TabItemModel';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import { MyBadgeContentType } from 'certification/ui/model';
import { Type, AreaType } from 'tracker/model';

import ReactGA from 'react-ga';

interface Props extends RouteComponentProps<RouteParams> {
  actionEventService?: ActionEventService;
  tabs: TabItemModel[];
  header?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  defaultActiveName?: string;
  allMounted?: boolean;
  large?: boolean;
  renderItems?: (props: any) => React.ReactNode;
  renderContent?: (props: any) => React.ReactNode;
  onChangeTab?: (tab: TabItemModel) => any;
  topOfContents?: React.ReactNode;
  renderStaticMenu?: () => React.ReactNode;
}

interface RouteParams {
  collegeId: string;
  serviceType?: LectureServiceType;
  cubeId?: string;
  lectureCardId?: string;
  coursePlanId?: string;
}

interface State {
  activeName: string;
}

@inject(mobxHelper.injectFrom('shared.actionEventService'))
@reactAutobind
@observer
class TabContainer extends Component<Props, State> {
  //
  static defaultProps = {
    className: 'tab-menu offset0',
    onChangeTab: () => {},
  };

  state = {
    activeName: '',
  };

  contextRef: any = React.createRef();

  constructor(props: Props) {
    //
    super(props);

    if (props.defaultActiveName) {
      this.state.activeName = props.defaultActiveName;
    } else if (props.tabs.length > 0) {
      this.state.activeName = props.tabs[0].name;
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { onChangeTab, tabs } = this.props;

    if (prevProps.defaultActiveName !== this.props.defaultActiveName) {
      if (
        this.props.defaultActiveName === 'Posts' ||
        this.props.defaultActiveName === 'Overview'
      ) {
        this.onClickTab(tabs[0]);
      } else {
        // 20200716 탭 이동
        this.setPreviousTab(
          tabs[tabs.findIndex(tab => tab.name === this.props.defaultActiveName)]
        );
      }
    }
  }

  setPreviousTab(tab: TabItemModel) {
    this.setState({ activeName: tab.name });
  }

  onClickTab(tab: TabItemModel) {
    //
    const { onChangeTab } = this.props;

    const pageName = this.findPageName();
    const menu =
      (pageName && `tab_${pageName}_${tab.name}`) || `tab_${tab.name}`;

    this.setState({ activeName: tab.name }, () => {
      ReactGA.event({
        category: `${pageName ? pageName : 'Certification'}`,
        action: 'Click',
        label: `${menu}`,
      });
    });

    const routePath = onChangeTab!(tab);
    if (routePath) {
      this.publishViewEvent(menu, `${window.location.origin}${routePath}`);
    } else {
      this.publishViewEvent(menu);
    }
    if (sessionStorage.getItem('learningOffset') !== null) {
      sessionStorage.removeItem('learningOffset');
    }
  }

  findPageName() {
    const { match } = this.props;
    const { coursePlanId, cubeId } = match.params;

    let pageName = '';
    const path = window.location.href;
    const splitedPath = path.split('/');

    if (path === 'https://mysuni.sk.com/suni-main/pages/1') pageName = 'main';
    if (splitedPath.includes('learning')) pageName = 'learning';
    if (splitedPath.includes('my-page')) pageName = 'my-page';
    if (splitedPath.includes('introduction')) pageName = 'introduction';
    if (splitedPath.includes('create')) pageName = 'create';
    if (splitedPath.includes('instructor')) pageName = 'instructor';
    if (splitedPath.includes('board')) pageName = 'board';
    if (coursePlanId) pageName = 'course';
    if (cubeId) pageName = 'cube';

    return pageName;
  }

  publishViewEvent(menu: string, path?: string) {
    const { actionEventService } = this.props;
    const { match } = this.props;
    const { collegeId, cubeId, lectureCardId, coursePlanId } = match.params;
    let { serviceType } = match.params;

    if (cubeId) serviceType = LectureServiceType.Card;
    actionEventService?.registerViewActionLog({
      menu,
      path,
      serviceType,
      collegeId,
      cubeId,
      lectureCardId,
      coursePlanId,
    });
  }

  findAreaType(type?: string) {
    const { activeName } = this.state;
    let dataArea = null;
    if (!activeName) {
      return dataArea;
    }
    switch (activeName) {
      case MyLearningContentType.InProgress:
        dataArea = AreaType.LEARNING_INPROGRESS;
        break;
      case MyLearningContentType.InMyList:
        dataArea = AreaType.LEARNING_INMYLIST;
        break;
      case MyLearningContentType.Required:
        dataArea = AreaType.LEARNING_REQUIRED;
        break;
      case MyLearningContentType.Enrolled:
        dataArea = AreaType.LEARNING_ENROLLED;
        break;
      case MyLearningContentType.Completed:
        dataArea = AreaType.LEARNING_COMPLETED;
        break;
      case MyLearningContentType.PersonalCompleted:
        dataArea = AreaType.LEARNING_PERSONALCOMPLETED;
        break;
      case MyLearningContentType.Retry:
        dataArea = AreaType.LEARNING_RETRY;
        break;
      case 'Create':
        dataArea = AreaType.CREATE_CREATE;
        break;
      case 'Shared':
        dataArea = AreaType.CREATE_SHARED;
        break;
      case MyBadgeContentType.AllBadgeList:
        dataArea = AreaType.CERTIFICATION_ALLBADGELIST;
        break;
      case MyBadgeContentType.ChallengingBadgeList:
        dataArea = AreaType.CERTIFICATION_CHALLENGINGBADGELIST;
        break;
      case MyBadgeContentType.EarnedBadgeList:
        if (window.location.pathname.includes('/my-page/')) {
          dataArea = AreaType.MYPAGE_MYBADGE;
        } else {
          dataArea = AreaType.CERTIFICATION_EARNEDBADGELIST;
        }
        break;
      case 'MySuni':
        dataArea = AreaType.INTRODUCTION_MYSUNI;
        break;
      case 'College':
        dataArea = AreaType.INTRODUCTION_COLLEGE;
        break;
      case 'College':
        dataArea = AreaType.INTRODUCTION_COLLEGE;
        break;
      case 'Certification':
        dataArea = AreaType.INTRODUCTION_CERTIFICATION;
        break;
      case 'PromotionTab':
        dataArea = AreaType.INTRODUCTION_PROMOTION;
        break;
      case 'Introduce':
        dataArea = AreaType.EXPERT_INTRODUCE;
        break;
      case 'Lecture':
        dataArea = AreaType.EXPERT_LECTURE;
        break;
      case MyPageContentType.EarnedStampList:
        dataArea = AreaType.MYPAGE_STAMP;
        break;
      case 'Notice':
        dataArea = AreaType.BOARD_NOTICE;
        break;
      case 'FAQ':
        dataArea = AreaType.BOARD_FAQ;
        break;
      case 'Q&A':
        dataArea = AreaType.BOARD_QNA;
        break;
      default:
        break;
    }
    if (type === 'tab' && dataArea) {
      dataArea = dataArea?.split('-')[0] + '-MENU';
    }
    return dataArea;
  }

  renderItems() {
    //
    const {
      renderItems,
      header,
      className,
      large,
      tabs,
      renderStaticMenu,
    } = this.props;
    const { activeName } = this.state;
    const dataArea = this.findAreaType('tab');
    if (renderItems) {
      return renderItems({ tabs, activeName, onClickTab: this.onClickTab });
    } else {
      return (
        <Sticky context={this.contextRef} className={className}>
          {header}
          <div
            className="cont-inner"
            data-area={dataArea}
            data-type={Type.CLICK}
          >
            <Menu className={large ? 'sku2' : 'sku'}>
              {tabs.map((tab, index) => (
                <Menu.Item
                  key={`tab-${index}`}
                  className={tab.className}
                  name={tab.name}
                  active={activeName === tab.name}
                  onClick={() => this.onClickTab(tab)}
                >
                  {tab.item || tab.name}
                </Menu.Item>
              ))}
              {renderStaticMenu && renderStaticMenu()}
            </Menu>
          </div>
        </Sticky>
      );
    }
  }

  renderContent(tab: TabItemModel) {
    //
    const { renderContent, topOfContents } = this.props;
    const { activeName } = this.state;

    if (typeof renderContent === 'function') {
      return renderContent({ tab, active: tab.name === activeName });
    }
    const dataArea = this.findAreaType();
    return (
      <>
        {/*0716 Tab구성페이지 - Full Size Contents 존재할 경우*/}
        {topOfContents}
        <Segment className="full" key={`tab-content-${tab.name}`}>
          <div
            className={classNames('ui tab', {
              active: tab.name === activeName,
            })}
            data-area={dataArea}
            data-type={Type.CLICK}
          >
            {tab.render({ tab, active: tab.name === activeName })}
          </div>
        </Segment>
      </>
    );
  }

  render() {
    //
    const { tabs, wrapperClassName, allMounted } = this.props;
    const { activeName } = this.state;
    const activeTab = tabs.find(tab => tab.name === activeName);

    const contents = (
      <div ref={this.contextRef}>
        {this.renderItems()}

        {allMounted
          ? tabs.map(tab => this.renderContent(tab))
          : activeTab && this.renderContent(activeTab)}
      </div>
    );

    if (wrapperClassName) {
      return <div className={wrapperClassName}>{contents}</div>;
    }
    return contents;
  }
}

export default withRouter(TabContainer);
