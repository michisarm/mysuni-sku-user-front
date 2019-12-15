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

    constructor(props:Props) {
      super(props);
      this.state = {
        // activeItem : 'Comment'
      };
    }

    handleItemClick(e:any, { name }:any) {
      // this.setState({ activeItem: name });
    }

    render() {
      return (
        <div className="main-info-area content-division">
          <div className="progress-info-wrap">
            <div className="cell">
              <div className="cell-inner">
                <div className="profile">
                  <div className="pic">
                    <Image src="/images/all/profile-56-px.png" alt="프로필사진 임시이미지" />
                  </div>
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

                <div className="recommend-info">
                  <Label className="onlytext">
                    <Icon className="college16" /><span>관심 College</span>
                  </Label>
                  <span className="value1">
                    <span className="text01">8</span>
                    <span className="text02">/</span>
                    <span className="text03">8</span>
                    <span className="text04">개</span>
                  </span>
                </div>
                <div className="recommend-info">
                  <Label className="onlytext">
                    <Icon className="channel16" /><span>관심 Channel</span>
                  </Label>
                  <span className="value1">
                    <span className="text01">24</span>
                    <span className="text02">/</span>
                    <span className="text03">999</span>
                    <span className="text04">개</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}


export default TitleArea;
