
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { NavLink } from 'react-router-dom';
import FooterView from '../view/FooterView';
import PrivacyPolicyModalView from '../view/PrivacyPolicyModalView';


@reactAutobind
class FooterContainer extends Component {
  //
  renderNav() {
    //
    return (
      <>
        <NavLink to="" className="item">Introduction</NavLink>
        <NavLink to="/board/support/Notice" className="item">Notice</NavLink>
        <NavLink to="/board/support/FAQ" className="item">FAQ</NavLink>
        <NavLink to="/board/support/Q&A" className="item">Q&A</NavLink>
        <PrivacyPolicyModalView
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
      />
    );
  }
}

export default FooterContainer;
