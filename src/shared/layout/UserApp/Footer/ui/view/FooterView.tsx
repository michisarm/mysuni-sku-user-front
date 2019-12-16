
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Link } from 'react-router-dom';
import {
  Icon,
  Button,
} from 'semantic-ui-react';


interface Props {
  noticePath: string
  faqPath: string
  qnaPath: string
}

@reactAutobind
class FooterView extends Component<Props> {
  //
  render() {
    //
    const { noticePath, faqPath, qnaPath } = this.props;

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
            <a className="item">Introduction</a>
            <Link to={noticePath} className="item">공지사항</Link>
            <Link to={faqPath} className="item">FAQ</Link>
            <Link to={qnaPath} className="item">문의하기</Link>
            <a className="item active">개인정보 처리방침</a>
            <a className="item">서비스 이용약관</a>
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
