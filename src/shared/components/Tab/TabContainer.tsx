import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { LectureServiceType } from 'lecture/model';
import TabItemModel from './model/TabItemModel';
import ReactGA from 'react-ga';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import { MyBadgeContentType } from 'certification/ui/model';
import { Area } from 'tracker/model';

interface Props extends RouteComponentProps<RouteParams> {
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
          tabs[
            tabs.findIndex((tab) => tab.name === this.props.defaultActiveName)
          ]
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

    if (onChangeTab === undefined) {
      return;
    }
    onChangeTab(tab);
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

  findArea(type?: string) {
    const { activeName } = this.state;
    let dataArea = null;
    if (!activeName) {
      return dataArea;
    }
    switch (activeName) {
      case MyLearningContentType.InProgress:
        dataArea = Area.LEARNING_INPROGRESS;
        break;
      case MyLearningContentType.InMyList:
        dataArea = Area.LEARNING_INMYLIST;
        break;
      case MyLearningContentType.Required:
        dataArea = Area.LEARNING_REQUIRED;
        break;
      case MyLearningContentType.Enrolled:
        dataArea = Area.LEARNING_ENROLLED;
        break;
      case MyLearningContentType.Completed:
        dataArea = Area.LEARNING_COMPLETED;
        break;
      case MyLearningContentType.PersonalCompleted:
        dataArea = Area.LEARNING_PERSONALCOMPLETED;
        break;
      case MyLearningContentType.Retry:
        dataArea = Area.LEARNING_RETRY;
        break;
      case 'Create':
        dataArea = Area.CREATE_CREATE;
        break;
      case 'Shared':
        dataArea = Area.CREATE_SHARED;
        break;
      case MyBadgeContentType.AllBadgeList:
        dataArea = Area.CERTIFICATION_ALLBADGELIST;
        break;
      case MyBadgeContentType.ChallengingBadgeList:
        dataArea = Area.CERTIFICATION_CHALLENGINGBADGELIST;
        break;
      case MyBadgeContentType.EarnedBadgeList:
        if (window.location.pathname.includes('/my-page/')) {
          dataArea = Area.MYPAGE_MYBADGE;
        } else {
          dataArea = Area.CERTIFICATION_EARNEDBADGELIST;
        }
        break;
      case 'MySuni':
        dataArea = Area.INTRODUCTION_MYSUNI;
        break;
      case 'College':
        dataArea = Area.INTRODUCTION_COLLEGE;
        break;
      case 'College':
        dataArea = Area.INTRODUCTION_COLLEGE;
        break;
      case 'Certification':
        dataArea = Area.INTRODUCTION_CERTIFICATION;
        break;
      case 'PromotionTab':
        dataArea = Area.INTRODUCTION_PROMOTION;
        break;
      case 'Introduce':
        dataArea = Area.EXPERT_INTRODUCE;
        break;
      case 'Lecture':
        dataArea = Area.EXPERT_LECTURE;
        break;
      case MyPageContentType.EarnedStampList:
        dataArea = Area.MYPAGE_STAMP;
        break;
      case 'Notice':
        dataArea = Area.BOARD_NOTICE;
        break;
      case 'FAQ':
        dataArea = Area.BOARD_FAQ;
        break;
      case 'Q&A':
        dataArea = Area.BOARD_QNA;
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
    const { renderItems, header, className, large, tabs, renderStaticMenu } =
      this.props;
    const { activeName } = this.state;
    const dataArea = this.findArea('tab');
    if (renderItems) {
      return renderItems({ tabs, activeName, onClickTab: this.onClickTab });
    } else {
      return (
        <Sticky context={this.contextRef} className={className}>
          {header}
          <div className="cont-inner" data-area={dataArea}>
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
    const dataArea = this.findArea();
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

    const activeTab = tabs.find((tab) => tab.name === activeName);

    const contents = (
      <div ref={this.contextRef}>
        {this.renderItems()}

        {allMounted
          ? tabs.map((tab) => this.renderContent(tab))
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
