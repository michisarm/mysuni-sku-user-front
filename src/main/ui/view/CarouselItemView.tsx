
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Image } from 'semantic-ui-react';

import imageMain from '../../../style/images/all/img-main.png';


interface Props {
  title: string,
  content: string,
}

@reactAutobind
class CarouselWrapperView extends Component<Props> {
  //
  render() {
    //
    const { title, content } = this.props;

    return (
      <div className="swiper-slide">
        <div className="info">
          <div className="text">
            <div className="main-text">{title}</div>
            <div className="sub-text">{content}</div>
          </div>
          <div className="visual">
            <Image src={imageMain} alt="CarouselMain" />
          </div>
        </div>
      </div>
    );
  }
}

export default CarouselWrapperView;
