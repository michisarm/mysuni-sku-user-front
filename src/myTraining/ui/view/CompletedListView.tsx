import React, { Component } from 'react';
import { Button, Icon, Segment, Card } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import CardValueStamp from './card/CardValueStamp';
import CardValueJoin from './card/CardValueJoin';
import CardValueLearningStart from './card/CardValueLearningStart';
import CardValuePlay from './card/CardValuePlay';
import CardValueDownload from './card/CardValueDownload';
import CardValueDefault from './card/CardValueDefault';

@reactAutobind
class CompletedListView extends Component {
  render() {
    return (

      <Segment className="full">
        <div className="top-guide-title">
          <div className="list-number">총 <strong>3개</strong>의 리스트가 있습니다.</div>
          <Button icon className="left post"><Icon className="filter2" />Filter</Button>
        </div>
        {/* card list */(
          <Card.Group className="list-cards">
            <CardValuePlay/>
            <CardValueLearningStart/>
            <CardValueDownload/>
            <CardValueJoin/>
            <CardValueDefault/>
            <CardValueStamp/>
          </Card.Group>
        ) || (
          <NoSuchContentPanel message="Completed List에 해당하는 학습 과정이 없습니다."/>
        )
        }
        <div className="more-comments">
          <Button icon className="left moreview"><Icon className="moreview" /> list more</Button>
        </div>
      </Segment>
    );
  }
}

export default CompletedListView;
