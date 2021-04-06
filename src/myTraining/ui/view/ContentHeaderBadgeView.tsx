
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Label } from 'semantic-ui-react';


interface Props {
  badgeCount: number
  onClickItem?: () => void,
}

@reactAutobind
class ContentHeaderBadgeView extends PureComponent<Props> {

  render() {
    //
    const { badgeCount, onClickItem } = this.props;

    return (
      <div className="cell-inner">
        <div className="stamp-wrap">
          <Label className="stamp">
              <div>
                <a href="#" onClick={onClickItem}>
                  <span className="text1">Badge</span>
                  <span className="text3">{badgeCount || 0}</span>
                  <span className="text5">개</span>
                </a>
              </div>
          </Label>
        </div>
      </div>
    );
  }
}

export default ContentHeaderBadgeView;
