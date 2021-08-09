import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { NavLink } from 'react-router-dom';
import boardRoutePaths from 'board/routePaths';
import PrivacyPolicyModalContainer from './PrivacyPolicyModalContainer';
import FooterView from '../view/FooterView';

import ReactGA from 'react-ga';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

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
              <PolyglotText defaultString="Introduction" id="home-ftr-바로가1" />
            </NavLink>
            <NavLink
              to={boardRoutePaths.supportNotice()}
              className="item"
              onClick={() => onClick('Notice')}
            >
              <PolyglotText defaultString="Notice" id="home-ftr-바로가2" />
            </NavLink>
            <NavLink
              to={boardRoutePaths.supportFAQ()}
              className="item"
              onClick={() => onClick('FAQ')}
            >
              <PolyglotText defaultString="FAQ" id="home-ftr-바로가3" />
            </NavLink>
            <NavLink
              to={boardRoutePaths.supportQnA()}
              className="item"
              onClick={() => onClick('Q&A')}
            >
              <PolyglotText defaultString="Q&A" id="home-ftr-바로가4" />
            </NavLink>
          </>
        )}
        <PrivacyPolicyModalContainer
          trigger={
            <a className="item" style={{ color: 'red' }}>
              <PolyglotText defaultString="개인정보 처리방침" id="home-ftr-바로가5" />
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
