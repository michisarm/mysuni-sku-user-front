import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Label } from 'semantic-ui-react';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';

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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClickItem && onClickItem();
                }}
              >
                <span className="text1">
                  <PolyglotText defaultString="Stamp" id="mapg-mifa-mas" />
                </span>
                <span
                  className="text2"
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      `${stampCount || 0}개`,
                      'mapg-mifa-ms개'
                    ),
                  }}
                />
              </a>
            </div>
          </Label>
        </div>
      </div>
    );
  }
}

export default ContentHeaderStampView;
