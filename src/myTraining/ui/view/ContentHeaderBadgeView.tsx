import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Label } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  badgeCount: number;
  onClickItem?: () => void;
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClickItem && onClickItem();
                }}
              >
                <span className="text1">
                  <PolyglotText defaultString="Badge" id="mapg-mifa-mbtt" />
                </span>
                <span className="text3">{badgeCount || 0}</span>
                <span className="text5">
                  <PolyglotText defaultString="개" id="mapg-mifa-ms개" />
                </span>
              </a>
            </div>
          </Label>
        </div>
      </div>
    );
  }
}

export default ContentHeaderBadgeView;
