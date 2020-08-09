
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  description: string,
}

@reactAutobind
class Description extends Component<Props> {
  //
  render() {
    //
    const { description } = this.props;

    return (
      <div className="class-guide-txt fn-parents" dangerouslySetInnerHTML={{ __html: description }} />
    );
  }
}

export default Description;
