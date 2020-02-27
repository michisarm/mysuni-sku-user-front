
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import ContentType from '../model/ContentType';
import EmbeddedVideoPanelView from './EmbeddedVideoPanelView';


interface Props {
  type: ContentType,
  title: React.ReactNode,
  description: React.ReactNode,
  link?: string,
  mediaUrl?: string,
  imageUrl?: string,
}

@reactAutobind
@observer
class CarouselItemView extends Component<Props> {
  //
  renderText() {
    //
    const { type, title, description, link, mediaUrl } = this.props;

    const content = (
      <div className="text">
        <div className="main-text">{title}</div>
        <div className="sub-text expansion">{description}</div>
      </div>
    );
    let element;

    switch (type) {
      case ContentType.EmbeddedVideo:
        element = <Link to={link!}>{content}</Link>;
        break;
      case ContentType.ExternalWindowVideo:
        element = <Link to={link!}>{content}</Link>;
        break;
      case ContentType.FileDownload:
        element = <a target="_blank" href={mediaUrl}>{content}</a>;
        break;
      case ContentType.LinkContent:
        element = <Link to={link!}>{content}</Link>;
        break;
    }

    return element;
  }

  renderMedia() {
    //
    const { type, link, mediaUrl, imageUrl } = this.props;
    let content;

    switch (type) {
      case ContentType.EmbeddedVideo:
        content = <EmbeddedVideoPanelView url={mediaUrl!} />;
        break;
      case ContentType.ExternalWindowVideo:
        content = (
          <a target="_blank" href={mediaUrl}>
            <Image src={`${process.env.PUBLIC_URL}${imageUrl}`} alt="Banner" />
          </a>
        );
        break;
      case ContentType.FileDownload:
        content = (
          <a target="_blank" href={mediaUrl}>
            <Image src={`${process.env.PUBLIC_URL}${imageUrl}`} alt="Banner" />
          </a>
        );
        break;
      case ContentType.LinkContent:
        content = (
          <Link to={link!}>
            <Image src={`${process.env.PUBLIC_URL}${imageUrl}`} alt="Banner" />
          </Link>
        );
        break;
    }

    return (
      <div className="visual">
        {content}
      </div>
    );
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

export default CarouselItemView;
