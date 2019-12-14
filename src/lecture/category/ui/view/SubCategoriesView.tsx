
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';


interface Props {
  open: boolean,
  subCategories: { id: string, text: string, active: boolean }[],
  onToggle: () => void,
}

@reactAutobind
class SubCategoriesView extends Component<Props> {
  //
  render() {
    //
    const { open, subCategories, onToggle } = this.props;

    return (
      <div className="channel-of-interest">
        <div className="table-css type2 type3">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">Channel ({subCategories.length})</div>
            </div>
            <div className="cell vtop">
              <div
                className={classNames({
                  'item-wrap': true,
                  active: open,
                })}
              >
                {/*  .active //  */}
                <div className="belt">
                  {subCategories.map((subCategory, index) => (
                    <Button key={`sub-category-${index}`} className={`toggle toggle4 ${subCategory.active ? 'active' : ''}`}>
                      {subCategory.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="toggle-btn">
                <Button icon className="img-icon" onClick={onToggle}>
                  <Icon
                    className={classNames({
                      s26: true,
                      'arrow-down': open,
                      'arrow-up': !open,
                    })}
                  />
                  <span className="blind">open</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubCategoriesView;
