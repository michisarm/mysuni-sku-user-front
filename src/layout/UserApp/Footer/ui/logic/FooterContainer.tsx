import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { NavLink } from 'react-router-dom';
import boardRoutePaths from 'board/routePaths';
import PrivacyPolicyModalContainer from './PrivacyPolicyModalContainer';
import FooterView from '../view/FooterView';

import ReactGA from 'react-ga';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';

@reactAutobind
class FooterContainer extends Component {
  //
  renderNav() {
    //
    function onClick(name: string) {
      setTimeout(() => {
        ReactGA.pageview(window.location.pathname, [], `${name}`);
      }, 1000);
    }
    const isExternal = isExternalInstructor();

    return (
      <>
        {!isExternal && (
          <>
            <NavLink
              to="/introduction"
              className="item"
              onClick={() => onClick('Introduction')}
            >
              Introduction
            </NavLink>
            <NavLink
              to={boardRoutePaths.supportNotice()}
              className="item"
              onClick={() => onClick('Notice')}
            >
              Notice
            </NavLink>
            <NavLink
              to={boardRoutePaths.supportFAQ()}
              className="item"
              onClick={() => onClick('FAQ')}
            >
              FAQ
            </NavLink>
            <NavLink
              to={boardRoutePaths.supportQnA()}
              className="item"
              onClick={() => onClick('Q&A')}
            >
              Q&A
            </NavLink>
          </>
        )}
        <PrivacyPolicyModalContainer
          trigger={
            <a className="item" style={{ color: 'red' }}>
              개인정보 처리방침
            </a>
          }
        />
      </>
    );
  }

  render() {
    //
    return (
      <FooterView
        nav={this.renderNav()}
        // buttons={(
        //   <>
        //     <Button className="active">KR</Button>
        //     <Button>EN</Button>
        //   </>
        // )}
      />
    );
  }
}

export default FooterContainer;
