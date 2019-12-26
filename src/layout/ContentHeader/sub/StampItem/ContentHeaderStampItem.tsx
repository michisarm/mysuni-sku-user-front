
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Icon } from 'semantic-ui-react';


interface Props {
  annualStamps: { year: number }[],
}

@reactAutobind
class ContentHeaderStampItem extends Component<Props> {
  //
  render() {
    //
    const { annualStamps } = this.props;

    return (
      <div className="stamp-wrap">
        <div className="acheive-stamp">
          Todo
        </div>
        <div className="year">
          <div className="ui inline dropdown tight">
            <div className="text">2019</div>
            <Icon className="dropdown" />
            <div className="menu">
              {annualStamps.map(({ year }, index) => (
                <div key={`stamp_${index}`} className="item">{year}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentHeaderStampItem;
