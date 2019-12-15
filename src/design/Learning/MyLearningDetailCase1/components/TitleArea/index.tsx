import React, { Component, createRef } from 'react';
import {
  Image, Label, Icon, Button,
} from 'semantic-ui-react';


interface States{
  // activeItem : string
}

interface Props{

}


class TitleArea extends Component<Props, States> {
    contextRef : any = createRef();

    constructor(props : Props) {
      super(props);
      this.state = {
        // activeItem: 'Comment',
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
                      <strong>0</strong><span>h</span>
                      <strong className="min">00</strong><span>m</span>
                    </div>
                  </Button>
                </div>
                <div className="wating">
                  <Button className="blue-arrow2">추천 학습 과정 보기</Button>
                  <strong>학습대기중</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default TitleArea;
