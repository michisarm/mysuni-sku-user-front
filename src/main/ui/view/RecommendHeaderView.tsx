
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';


interface Props {
  name: string,
  favoriteChannelCount: number
  onViewAll:() => void
}

@reactAutobind
class RecommendHeaderView extends Component<Props> {
  //
  render() {
    //
    const { name, favoriteChannelCount, onViewAll } = this.props;

    return (
      <div className="recommend-head">
        <span className="tit">{name}님을 위한 추천 채널</span>
        <Button icon className="right btn-black" onClick={onViewAll}>
          View all<Icon className="morelink" />
        </Button>
        <div className="right">
          <Button icon className="img-icon">
            <span className="underline">현재 선택된 관심 Channel(<span className="sel">{favoriteChannelCount}</span>)</span>
            <Icon className="setting17" /><span className="blind">setting</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default RecommendHeaderView;
