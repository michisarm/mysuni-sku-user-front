
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';


interface Props {
  value?: number,
  max?: number
}

@reactAutobind
class StarRatingItem extends Component<Props> {
  //
  static defaultProps = {
    value: 0,
    max: 5,
  };

  render() {
    //
    const { value, max } = this.props;
    const stars = [] as any;

    stars.length = (max === 0) ? 5 : max!;
    stars.fill(true);

    return (
      <div
        className={classNames({
          'fixed-rating': true,
          [`s${Math.floor(Number(value))}`]: true,
        })}
      >
        {stars.map((star: any, index: number) => <span key={`star-rating-${index}`} />)}
      </div>
    );
  }
}

export default StarRatingItem;
