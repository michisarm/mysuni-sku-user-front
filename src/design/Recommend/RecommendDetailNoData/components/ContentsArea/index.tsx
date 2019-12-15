import React, { Component, createRef } from 'react';
import {
  Segment,
  Sticky, Icon, Button, Menu, Card,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ContentsMoreView from '../ContentsMoreView';
import CardValueRequired from '../CardValueRequired';
import CardValueEnrolled from '../CardValueEnrolled';
import CardValueInprogress from '../CardValueInprogress';

class ContentsArea extends React.Component {
  render() {
    return (
      <Segment className="full">
        <div className="recommend-detail">
          {/* .channel-of-interest */}
          <div className="channel-of-interest">
            <div className="table-css type2 type3">
              <div className="row">
                <div className="cell vtop">
                  <div className="tit-set">관심 channel
                    <Button icon className="img-icon">
                      <Icon className="setting17" /><span className="blind">setting</span>
                    </Button>
                  </div>
                </div>
                <div className="cell vtop">
                  <div className="item-wrap">{/* .active // */}
                    <div className="belt">

                      <Button className="active toggle toggle4"
                        aria-pressed="true"
                      >Design
                      </Button>
                      <Button className="toggle toggle4"
                        aria-pressed="false"
                      >Database
                      </Button>
                      <Button className="active toggle toggle4"
                        aria-pressed="true"
                      >Project Managing
                      </Button>
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">디자인 방법론*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Engineering*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Production Data Analysis*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">DT Basics*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Value*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Mindfulness*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">AI*/}
                      {/*</Button>*/}
                      {/*<Button className="toggle toggle4"*/}
                      {/*        aria-pressed="false">Design*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Design*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Database*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Project Managing*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">디자인 방법론*/}
                      {/*</Button>*/}
                      {/*<Button className="toggle toggle4"*/}
                      {/*        aria-pressed="false">Engineering*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Production Data Analysis*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">DT Basics*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Value*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Mindfulness*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">AI*/}
                      {/*</Button>*/}
                      {/*<Button className="active toggle toggle4"*/}
                      {/*        aria-pressed="true">Design*/}
                      {/*</Button>*/}
                    </div>
                  </div>
                </div>
                <div className="cell vtop">
                  <div className="toggle-btn">{/* .active // */}
                    <Button icon className="img-icon">
                      <Icon className="arrow-down s26" />
                      <span className="blind">open</span>
                    </Button>
                    <Button className="ui icon button img-icon">
                      <Icon className="arrow-up s26" />
                      <span className="blind">close</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // .channel-of-interest */}
          {/* .recommend-area */}
          <div className="recommend-area">
            <div className="section-head">
              <span className="channel">AI</span> 채널에서 김유니님에게 추천하는 과정입니다.
            </div>
            <div className="no-cont-wrap type2">
              <Icon className="no-contents80" /><span className="blind">콘텐츠 없음</span>
              <div className="text01">추천 학습 과정이 업데이트 될 예정입니다.</div>
              <div className="text02">관심 분야 혹은 관심 직무의 다양한 학습 과정을 검색해보세요</div>
            </div>
            <div className="section-head">
              <span className="channel">Global</span> 채널에서 김유니님에게 추천하는 과정입니다.
              <div className="right">
                <Button icon className="right btn-blue">View all
                  <Icon className="morelink" />
                </Button>
              </div>
            </div>
            <div className="scrolling">
              <ul className="belt">
                <li>
                  <Card.Group className="box-cards">
                    {/*  상태값: Required  */}
                    <CardValueRequired />
                  </Card.Group>
                </li>
                <li>
                  <Card.Group className="box-cards">
                    {/*  상태값: Enrolled  */}
                    <CardValueEnrolled />
                  </Card.Group>
                </li>
                <li>
                  <Card.Group className="box-cards">
                    {/*  상태값: Enrolled  */}
                    <CardValueEnrolled />
                  </Card.Group>
                </li>
                <li>
                  <Card.Group className="box-cards">
                    {/*  상태값: Inprogress  */}
                    <CardValueInprogress />
                  </Card.Group>
                </li>
                <li>
                  <Card.Group className="box-cards">
                    {/*  상태값: Inprogress  */}
                    <CardValueInprogress />
                  </Card.Group>
                </li>
                <li>
                  <Card.Group className="box-cards">
                    {/*  상태값: Enrolled  */}
                    <CardValueEnrolled />
                  </Card.Group>
                </li>
              </ul>
            </div>
            <ContentsMoreView />
          </div>
          {/* // .recommend-area */}
        </div>

      </Segment>
    );
  }
}


export default ContentsArea;
