import React, { Component } from 'react';
import { Menu, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';

interface Props {
  context : any
  activeItem : string
  onChangeItem : ()=>void
}


@reactAutobind
class TabMenuItem extends Component<Props> {

  render() {

    const { context, activeItem, onChangeItem } = this.props;

    return (
      <Sticky context={context} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="CompletedList"
              active={activeItem === 'CompletedList'}
              onClick={onChangeItem}
              as={Link}
              to=""
            >
              Completed List<span className="count">+5</span>
            </Menu.Item>
            <Menu.Item
              name="EarnedStampList"
              active={activeItem === 'EarnedStampList'}
              onClick={onChangeItem}
              as={Link}
              to=""
            >
              Earned Stamp List<span className="count">+24</span>
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
    );
  }
}

export default TabMenuItem;
