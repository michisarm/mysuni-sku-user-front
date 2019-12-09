
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Segment, Button, Icon } from 'semantic-ui-react';


@reactAutobind
class MyLearningSummaryView extends Component {
  //
  render() {
    //
    return (
      <div className="my-learning-area">
        <Segment className="full">
          <div className="table-css type1">{/* .type1, .type2 //*/}
            <div className="row">
              <div className="cell v-middle">
                <div className="cell-inner">
                  <span className="text01">My Learning</span>
                  <Button icon className="right btn-black">
                    View all
                    <Icon className="morelink" />
                  </Button>
                </div>
              </div>

              <ItemWrapper>
                <Button className="btn-complex48">
                  <span className="i">
                    <Icon className="time48" />
                    <span className="blind">total time</span>
                  </span>
                  <span className="t">
                    <span className="underline">총 학습시간</span>
                    <span className="div">
                      <span className="t1">120</span><span className="t2">h</span>
                      <span className="t1">00</span><span className="t2">m</span>
                    </span>
                  </span>
                </Button>
              </ItemWrapper>

              <ItemWrapper>
                <div className="chart-wrap">
                  <div className="ui pie w56" data-value="30">
                    <span className="left" />
                    <span className="right" />
                  </div>
                  <div className="ui list">
                    <dl className="item sk">
                      <dt>SK University</dt>
                      <dd>14h 50m</dd>
                    </dl>
                    <dl className="item my">
                      <dt>My company</dt>
                      <dd>35h 30m</dd>
                    </dl>
                  </div>
                </div>
              </ItemWrapper>

              <ItemWrapper>
                <Button className="btn-complex48">
                  <span className="i">
                    <Icon className="complete48" />
                    <span className="blind">complete edu</span>
                  </span>
                  <span className="t">
                    <span className="underline">완료한 학습</span>
                    <span className="div">
                      <span className="t1">14</span><span className="t3">개</span>
                    </span>
                  </span>
                </Button>
              </ItemWrapper>

              <ItemWrapper>
                <Button className="btn-complex48">
                  <span className="i">
                    <Icon className="stamp48"><span className="blind">stamp</span></Icon>
                  </span>
                  <span className="t">
                    <span className="underline">획득 Stamp</span>
                    <span className="div">
                      <span className="t1">14</span><span className="t3">개</span>
                    </span>
                  </span>
                </Button>
              </ItemWrapper>

            </div>
          </div>
        </Segment>
      </div>
    );
  }
}


class ItemWrapper extends Component {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <div className="cell v-middle">
        <div className="cell-inner">
          {children}
        </div>
      </div>
    );
  }
}

export default MyLearningSummaryView;
