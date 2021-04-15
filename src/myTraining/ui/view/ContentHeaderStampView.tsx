
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Label } from 'semantic-ui-react';


interface Props {
  stampCount: number;
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
            <div>
              <a href="#" onClick={onClickItem}>
                <span className="text1">Stamp</span>
                <span className="text2">{stampCount || 0}</span>
                <span className="text6">개</span>
              </a>
            </div>
          </Label>
        </div>
      </div>
    );
  }
}

export default ContentHeaderStampView;
