
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Icon, Button } from 'semantic-ui-react';



interface Props {
  nav: React.ReactNode,
  buttons?: React.ReactNode,
}

@reactAutobind
class FooterView extends Component<Props> {
  //
  render() {
    //
    const { nav, buttons } = this.props;

    return (
      <section className="footer">
        <div className="cont-inner">
          <i className="s-kuniversity icon">
            <span className="blind">mySUNI</span>
          </i>
          <div className="f-copyright">
            COPYRIGHT <Icon name="copyright"><span className="blind">copyright sign</span></Icon>
            my SUNI. ALL RIGHTS RESERVED.
          </div>
          <div className="f-nav">
            {nav}
          </div>

          { buttons && (
            <Button.Group className="country">
              {buttons}
            </Button.Group>
          )}
        </div>
      </section>
    );
  }
}

export default FooterView;
