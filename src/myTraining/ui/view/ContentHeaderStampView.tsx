import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Label } from 'semantic-ui-react';

interface Props {
  stampCount: number;
  // selectedYear: number;
  // onChangeYear: (e: any, data: any) => void;
  onClickItem?: () => void;
  thisYearStampCount?: number;
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
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onClickItem && onClickItem();
                }}
              >
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
