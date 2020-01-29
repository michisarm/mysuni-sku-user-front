
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { NavLink } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import FooterView from '../view/FooterView';
import PrivacyPolicyModalContainer from './PrivacyPolicyModalContainer';


@reactAutobind
class FooterContainer extends Component {
  //
  renderNav() {
    //
    return (
      <>
        <NavLink to="/introduction" className="item">Introduction</NavLink>
        <NavLink to="/board/support/Notice" className="item">Notice</NavLink>
        <NavLink to="/board/support/FAQ" className="item">FAQ</NavLink>
        <NavLink to="/board/support/Q&A" className="item">Q&A</NavLink>
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
