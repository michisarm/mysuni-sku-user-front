
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button } from 'semantic-ui-react';


interface Props {
  onClick?: () => void,
}

@reactAutobind
class ContentHeaderWaitingItem extends Component<Props> {
  //
  static defaultProps = {
    onClick: () => {},
  };

  render() {
    //
    const { onClick } = this.props;

    return (
      <div className="wating">
        <Button className="blue-arrow2" onClick={onClick}>추천 학습 과정 보기</Button>
        <strong>학습대기중</strong>
      </div>
    );
  }
}

export default ContentHeaderWaitingItem;
