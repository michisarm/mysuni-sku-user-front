
import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import classNames from 'classnames';
import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { ActionEventService } from 'shared/stores';
import { LectureServiceType } from 'lecture/model';
import TabItemModel from './model/TabItemModel';



interface Props extends RouteComponentProps<RouteParams> {
  actionEventService?: ActionEventService
  tabs: TabItemModel[]
  header?: ReactNode
  className?: string
  wrapperClassName?: string
  defaultActiveName?: string
  allMounted?: boolean
  large?: boolean
  renderItems?: (props: any) => React.ReactNode
  renderContent?: (props: any) => React.ReactNode
  onChangeTab?: (tab: TabItemModel) => void
}

interface RouteParams {
  collegeId: string,
  serviceType?: LectureServiceType,
  cubeId?: string
  lectureCardId?: string,
  coursePlanId?: string,
}

interface State {
  activeName: string
}

@inject(mobxHelper.injectFrom(
  'shared.actionEventService'
))
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
    }
    else if (props.tabs.length > 0) {
      this.state.activeName = props.tabs[0].name;
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { onChangeTab, tabs } = this.props;

    if(prevProps.defaultActiveName !== this.props.defaultActiveName){
      if(this.props.defaultActiveName === 'Posts' || this.props.defaultActiveName === 'Overview'){
        this.changeActiveName(tabs[0]);
      } else { // 20200527 탭 이동 정상화
        this.changeActiveName(tabs[tabs.findIndex(tab => tab.name === this.props.defaultActiveName)]);
      } 
    }
  }

  changeActiveName(tab: TabItemModel) {
    this.setState({ activeName: tab.name });
  }

  onClickTab(tab: TabItemModel) {
    //
    const { onChangeTab } = this.props;
    
    const pageName = this.findPageName();
    const menu = pageName && `tab_${pageName}_${tab.name}` || `tab_${tab.name}`;
    this.publishViewEvent(menu);

    this.setState({ activeName: tab.name });

    onChangeTab!(tab);
  }

  findPageName() {
    const {match} = this.props;
    const {coursePlanId, cubeId} = match.params;

    let pageName = '';
    const path = window.location.href;
    const splitedPath = path.split('/');

    if(path === 'https://mysuni.sk.com/suni-main/pages/1') pageName = 'main';
    if(splitedPath.includes('learning')) pageName = 'learning';
    // if(splitedPath.includes('my-page')) pageName = 'my-page';
    // if(splitedPath.includes('introduction')) pageName = 'introduction';
    // if(splitedPath.includes('create')) pageName = 'create';
    if(coursePlanId) pageName = 'course';
    if(cubeId) pageName = 'cube';

    return pageName;
  }

  publishViewEvent(menu: string, path?: string) {
    const {actionEventService} = this.props;
    const {match} = this.props;
    const {collegeId, cubeId, lectureCardId, coursePlanId} = match.params;
    let { serviceType } = match.params;
    
    if(cubeId) serviceType = LectureServiceType.Card;
    actionEventService?.registerViewActionLog({menu, path, serviceType, collegeId, cubeId, lectureCardId, coursePlanId});
  }

  renderItems() {
    //
    const { renderItems, header, className, large, tabs } = this.props;
    const { activeName } = this.state;

    if (renderItems) {
      return renderItems({ tabs, activeName, onClickTab: this.onClickTab });
    }
    else {
      return (
        <Sticky context={this.contextRef} className={className}>
          {header}
          <div className="cont-inner">
            <Menu className={large ? 'sku2' : 'sku'}>
              { tabs.map((tab, index) => (
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
            </Menu>
          </div>
        </Sticky>
      );
    }
  }

  renderContent(tab: TabItemModel) {
    //
    const { renderContent } = this.props;
    const { activeName } = this.state;

    if (typeof renderContent === 'function') {
      return renderContent({ tab, active: tab.name === activeName });
    }

    return (
      <Segment className="full" key={`tab-content-${tab.name}`}>
        <div className={classNames('ui tab', { active: tab.name === activeName })}>
          {tab.render({ tab, active: tab.name === activeName })}
        </div>
      </Segment>
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

        { allMounted ?
          tabs.map(tab => this.renderContent(tab))
          :
          activeTab && this.renderContent(activeTab)
        }
      </div>
    );

    if (wrapperClassName) {
      return (
        <div className={wrapperClassName}>
          {contents}
        </div>
      );
    }
    return contents;
  }
}

export default withRouter(TabContainer);
