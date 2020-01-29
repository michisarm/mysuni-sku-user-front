
import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';

import { Sticky, Menu } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import MySuniView from './MySuniView';
import CollegeView from './CollegeView';
import CertificationView from './CertificationView';


interface Props extends RouteComponentProps<RouteParams> {
}

interface State {
  activeTab: TabType
}

interface RouteParams {
  tab: 'MySuni' | 'College' | 'Certification'
}

enum TabType {
  MySuni = 'MySuni',
  College = 'College',
  Certification = 'Certification'
}

@reactAutobind
class IntroductionContainer extends Component<Props, State> {
  //
  contextRef: any = createRef();

  state = {
    activeTab: TabType.MySuni,
  };

  componentDidMount() {
    //
    this.setTabContent();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.setTabContent();
    }
  }

  setTabContent() {
    //
    const { match } = this.props;

    this.setState({ activeTab: match.params.tab as TabType });
  }

  renderTabContent() {
    //
    const { activeTab } = this.state;

    if (activeTab === TabType.MySuni) {
      return <MySuniView />;
    }
    else if (activeTab === TabType.College) {
      return <CollegeView />;
    }
    else if (activeTab === TabType.Certification) {
      return <CertificationView />;
    }

    return null;
  }

  render() {
    //
    const { activeTab } = this.state;

    return (
      <div ref={this.contextRef}>
        <Sticky context={this.contextRef} className="tab-menu2 offset0">
          <div className="cont-inner">
            <Menu className="sku2">
              <Menu.Item
                name={TabType.MySuni}
                active={activeTab === TabType.MySuni}
                as={Link}
                to={routePaths.introductionMySuni()}
              >
                mySUNI 소개
              </Menu.Item>
              <Menu.Item
                name={TabType.College}
                active={activeTab === TabType.College}
                as={Link}
                to={routePaths.introductionCollege()}
              >
                College 소개
              </Menu.Item>
              <Menu.Item
                name={TabType.Certification}
                active={activeTab === TabType.Certification}
                as={Link}
                to={routePaths.introductionCertification()}
              >
                인증제도 소개
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>

        {this.renderTabContent()}
      </div>
    );
  }
}


export default withRouter(IntroductionContainer);
