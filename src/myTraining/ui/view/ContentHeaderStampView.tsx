
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Label } from 'semantic-ui-react';


interface Props {
  stampCount: number;
  // selectedYear: number;
  // onChangeYear: (e: any, data: any) => void;
  onClickItem?: () => void;
}

@reactAutobind
class ContentHeaderStampView extends PureComponent<Props> {
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
