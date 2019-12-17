
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Image } from 'semantic-ui-react';


interface Props {
  image: string,
}

@reactAutobind
class ThumbnailCell extends Component<Props> {
  //
  render() {
    //
    const { image } = this.props;

    return (
      <div className="thumbnail">
        <Image src={image} alt="Thumbnail" />
      </div>
    );
  }
}

export default ThumbnailCell;
