
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import FooterView from '../view/FooterView';


@reactAutobind
class FooterContainer extends Component {
  //
  noticePath = '/board/support/Notice';

  faqPath = '/board/support/FAQ';

  qnaPath = '/board/support/Q&A';

  render() {
    //
    return (
      <FooterView
        noticePath={this.noticePath}
        faqPath={this.faqPath}
        qnaPath={this.qnaPath}
      />
    );
  }
}

export default FooterContainer;
