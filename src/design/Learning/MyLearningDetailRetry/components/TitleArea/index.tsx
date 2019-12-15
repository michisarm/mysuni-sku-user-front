import React, { Component, createRef } from 'react';
import {
  Label, Icon, Button, Image,
} from 'semantic-ui-react';

interface Props {

}

interface States {
    // activeItem : string
}

class TitleArea extends React.Component<Props, States> {
    contextRef:any = createRef();
    constructor(props : Props) {
      super(props);
      this.state = {
        // activeItem: 'Comment'
      };
    }

    handleItemClick(e:any, { name }:any) {
    // this.setState({ activeItem: name });
    }

    render() {
      return (
        <div className="main-info-area">
          <div className="progress-info-wrap">
            <div className="cell">
              <div className="cell-inner">
                <div className="profile">
                  <div className="pic">
                    <Image src="/images/all/profile-56-px.png" alt="프로필사진 임시이미지" />
                  </div>
                  <Button icon className="img-icon"><Icon className="photo-edit" /></Button>
                </div>
                <div className="text-info">
                  <div className="name">
                                    김유니
                    <Button className="orange-arrow2">My page</Button>
                  </div>
                  <div className="part">
                    <span>SK C&C</span><span>플랫폼 개발 1팀</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cell">
              <div className="cell-inner">
                <div className="ui statistic total-time">
                  <Button className="btn-total-time">
                    <Label className="onlytext">
                      <Icon className="total-time" /><span>총 학습시간</span>
                    </Label>
                    <div className="value2">
                      <strong>120</strong><span>h</span>
                      <strong className="min">00</strong><span>m</span>
                    </div>
                  </Button>
                </div>

                <div className="chart-wrap">
                  <div className="ui pie w56" data-value="150">
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
              </div>
            </div>
            {/* TODO! 2차로 연기 */}
            {/*<div className="cell">*/}
            {/*    <Button className='personal line'>+ Add Personal Learning</Button>*/}
            {/*</div>*/}
          </div>
        </div>
      );
    }
}


export default TitleArea;
