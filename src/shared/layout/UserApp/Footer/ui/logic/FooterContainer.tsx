
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import FooterView from '../view/FooterView';


@reactAutobind
class FooterContainer extends Component {
  //
  noticePath = '/board/support/notice';

  faqPath = '/board/support/faq';

  qnaPath = '/board/support/qa';

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
