
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { NavLink } from 'react-router-dom';
import boardRoutePaths from 'board/routePaths';
import PrivacyPolicyModalContainer from './PrivacyPolicyModalContainer';
import FooterView from '../view/FooterView';


@reactAutobind
class FooterContainer extends Component {
  //
  renderNav() {
    //
    return (
      <>
        <NavLink to="/introduction" className="item">Introduction</NavLink>
        <NavLink to={boardRoutePaths.supportNotice()} className="item">Notice</NavLink>
        <NavLink to={boardRoutePaths.supportFAQ()} className="item">FAQ</NavLink>
        <NavLink to={boardRoutePaths.supportQnA()} className="item">Q&A</NavLink>
        <PrivacyPolicyModalContainer
          trigger={<a className="item">개인정보 처리방침</a>}
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
