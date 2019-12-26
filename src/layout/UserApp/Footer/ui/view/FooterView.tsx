
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Icon, Button } from 'semantic-ui-react';



interface Props {
  nav: React.ReactNode,
}

@reactAutobind
class FooterView extends Component<Props> {
  //
  render() {
    //
    const { nav } = this.props;

    return (
      <section className="footer">
        <div className="cont-inner">
          <i className="s-kuniversity icon">
            <span className="blind">SK university</span>
          </i>
          <div className="f-copyright">
            COPYRIGHT <Icon name="copyright"><span className="blind">copyright sign</span></Icon>SK
            university. ALL RIGHTS RESERVED.
          </div>
          <div className="f-nav">
            {nav}
          </div>

          <Button.Group className="country">
            <Button className="active">KR</Button>
            <Button>EN</Button>
          </Button.Group>
        </div>
      </section>
    );
  }
}

export default FooterView;
