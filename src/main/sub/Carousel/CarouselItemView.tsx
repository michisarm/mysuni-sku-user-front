
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
  linkText?: string,
  linkAnchor?: string,
}

@reactAutobind
class CarouselWrapperView extends Component<Props> {
  //
  renderText() {
    //
    const { link, linkText, linkAnchor, title, description } = this.props;

    const element = (
      <div className="text">
        <div className="main-text">{title}</div>
        <div className="sub-text">{description}</div>
      </div>
    );

    if (link) {
      return <Link to={link}>{element}</Link>;
    }
    else if (linkText) {
      return <Link to={linkText}>{element}</Link>;
    }
    else if (linkAnchor) {
      return <a target="_blank" href={linkAnchor}>{element}</a>;
    }
    else {
      return element;
    }
  }

  renderMedia() {
    //
    const { link, linkAnchor, image, content } = this.props;

    const element = (
      <div className="visual">
        { image ?
          <Image src={`${process.env.PUBLIC_URL}${image}`} alt="Main carousel" />
          :
          content
        }
      </div>
    );

    if (link) {
      return <Link to={link}>{element}</Link>;
    }
    else if (linkAnchor) {
      return <a target="_blank" href={linkAnchor}>{element}</a>;
    }
    else {
      return element;
    }
  }

  render() {
    //
    return (
      <div className="swiper-slide">
        <div className="info">
          {this.renderText()}
          {this.renderMedia()}
        </div>
      </div>
    );
  }
}

export default CarouselWrapperView;
