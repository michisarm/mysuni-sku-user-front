
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';


interface Props {
  title: React.ReactNode,
  description: React.ReactNode,
  image?: string,
  content?: React.ReactNode,
  link?: string,
}

@reactAutobind
class CarouselWrapperView extends Component<Props> {
  //
  renderText() {
    //
    const { title, description } = this.props;

    return (
      <div className="text">
        <div className="main-text">{title}</div>
        <div className="sub-text">{description}</div>
      </div>
    );
  }

  renderMedia() {
    //
    const { image, content } = this.props;

    return (
      <div className="visual">
        { image ?
          <Image src={`${process.env.PUBLIC_URL}${image}`} alt="Main carousel" />
          :
          content
        }
      </div>
    );
  }

  render() {
    //
    const { link } = this.props;

    return (
      <div className="swiper-slide">
        <div className="info">
          { link ?
            <Link to={link}>{this.renderText()}</Link>
            :
            this.renderText()
          }
          { link ?
            <Link to={link}>{this.renderMedia()}</Link>
            :
            this.renderMedia()
          }
        </div>
      </div>
    );
  }
}

export default CarouselWrapperView;
