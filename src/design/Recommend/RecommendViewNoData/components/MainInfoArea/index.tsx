import React, { Component, createRef } from 'react';
import {
  Image, Label, Icon,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  activeItem : string
}

class MainInfoArea extends React.Component<Props, States> {
    contextRef = createRef();

    constructor(props : Props) {
      super(props);
      this.state = {
        activeItem: 'Comment',
      };
    }

    handleItemClick(e:any, { name }:any) {
      this.setState({ activeItem: name });
    }

    render() {
      const { activeItem } = this.state;
      return (
        <div className="main-info-area">
          <div className="main-info-wrap">
            {/*썸네일*/}
            <div className="thumbnail">
              <Image src="http://placehold.it/70x70" alt="임시이미지" size="small" />
            </div>
            <div className="title-area">
              <Label color="blue">Leadership</Label>
              <div className="header">제목이 한 줄</div>
              <div className="deatil">
                <div className="item">
                  <Label className="bold onlytext">
                    <Icon className="video2" /><span>Classroom</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="right-area">
              <div className="ui statistic stamp">
                <div className="value">3</div>
                <Label>획득 가능 Stamp</Label>
              </div>
              <div className="fixed-rating s4">
                <span /><span /><span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      );
    }
}


export default MainInfoArea;
