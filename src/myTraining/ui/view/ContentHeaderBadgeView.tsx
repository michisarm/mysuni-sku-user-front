
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Icon, Label, Dropdown } from 'semantic-ui-react';


interface Props {
  badgeCount: number
  selectedYear: number
  yearOptions: any[]
  onChangeYear:(year: number) => void
}

@reactAutobind
@observer
class ContentHeaderBadgeView extends Component<Props> {
  //
  render() {
    //
    const { badgeCount, selectedYear, yearOptions, onChangeYear } = this.props;

    return (
      <div className="cell-inner">
        <div className="stamp-wrap">
          <Label className="stamp">
            <div><span className="text1">My Badge</span></div>
            <div>
              <Icon className="badge35" /><span className="text2">x</span>
              <span className="text3">{badgeCount || 0}</span>
            </div>
          </Label>

          {selectedYear !== 0 ?
            <div className="year">
              <Dropdown
                className="inline tight"
                value={selectedYear}
                options={yearOptions}
                onChange={(e, data) => onChangeYear(Number(data.value))}
              />
            </div> : ''
          }
        </div>
      </div>
    );
  }
}

export default ContentHeaderBadgeView;
