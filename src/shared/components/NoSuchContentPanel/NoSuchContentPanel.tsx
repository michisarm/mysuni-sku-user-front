
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';


interface Props extends RouteComponentProps {
  message: React.ReactNode,
  link?: { text: string, path: string },
}

/**
 * 콘텐츠 없을 경우 패널
 * 안내 메시지 유형들
 *  - 수강중인 학습 과정이 없습니다.
 *  - 수강 대기중인 학습 과정이 없습니다.
 *  - Required 된 학습 과정이 없습니다.
 *  - Completed List에 해당하는 학습카드가 없습니다.
 *  - Retry에 해당하는 학습카드가 없습니다.
 *  - <a href="#recommend" class="ui icon right button btn-blue2">김유니 님에게 추천하는 학습 과정 보기<i class="icon morelink"></i></a>
 *
 */
@reactAutobind
@observer
class NoSuchContentPanel extends Component<Props> {
  //
  onClickLink() {
    //
    const { history, link } = this.props;

    if (link) {
      history.push(link.path);
    }
  }

  render() {
    //
    const { message, link, children } = this.props;

    return (
      <div className="no-cont-wrap">
        <Icon className="no-contents80" /><span className="blind">콘텐츠 없음</span>

        <div className="text">{message}</div>

        { link && (
          <Button icon className="right btn-blue2" onClick={this.onClickLink}>
            Create 바로가기 <Icon className="morelink" />
          </Button>
        )}

        {children}
      </div>
    );
  }
}

export default withRouter(NoSuchContentPanel);
