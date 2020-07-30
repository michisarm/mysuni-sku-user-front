
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Icon, Label, Dropdown } from 'semantic-ui-react';


interface Props {
  stampCount: number,
  onClickItem?: () => void,
}

@reactAutobind
@observer
class ContentHeaderStampView extends Component<Props> {
  //
  render() {
    //
    const { stampCount, onClickItem } = this.props;

    return (
      <div className="cell-inner">
        <div className="stamp-wrap">
          <Label className="stamp">
            <a href="#" onClick={onClickItem}>
              <span><span className="text1">My Stamp</span></span>
              <span>
                <Icon className="stamp35" /><span className="text2">x</span>
                <span className="text3">{stampCount || 0}</span>
              </span>
            </a>
          </Label>
        </div>
      </div>
    );
  }
}

export default ContentHeaderStampView;
