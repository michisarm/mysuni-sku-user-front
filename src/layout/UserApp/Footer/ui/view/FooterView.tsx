import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Icon, Button } from 'semantic-ui-react';
import { Area } from 'tracker/model';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  nav: React.ReactNode;
  buttons?: React.ReactNode;
}

@reactAutobind
class FooterView extends Component<Props> {
  //
  render() {
    //
    const { nav, buttons } = this.props;
    return (
      <section className="footer" data-area={Area.FOOTER_NAVI}>
        <div className="cont-inner">
          <i className="s-kuniversity icon">
            <span className="blind">mySUNI</span>
          </i>
          <div className="f-copyright">
            <PolyglotText defaultString="COPYRIGHT" id="home-ftr-cc" />{' '}
            <Icon name="copyright">
              <span className="blind">copyright sign</span>
            </Icon>
            <PolyglotText
              defaultString="mySUNI. ALL RIGHTS RESERVED."
              id="home-ftr-arr"
            />
          </div>
          <div className="f-nav">{nav}</div>

          {buttons && (
            <Button.Group className="country">{buttons}</Button.Group>
          )}
        </div>
      </section>
    );
  }
}

export default FooterView;
