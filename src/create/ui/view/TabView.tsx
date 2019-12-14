import * as React from 'react';
import { Menu, Sticky } from 'semantic-ui-react';

interface Props{
  activeItem: string
  handleItemClick:(e: any, { name }: any)=> void
  totalCount: number
}

class TabView extends React.Component <Props> {

  render() {
    const { activeItem, handleItemClick, totalCount } = this.props;

    return (
      <div>
        <Sticky className="tab-menu offset0">
          <div className="cont-inner">
            <Menu className="sku">
              <Menu.Item
                name="Create"
                active={activeItem === 'Create'}
                onClick={handleItemClick}
              >
                Create
              </Menu.Item>
              <Menu.Item
                name="Shared"
                active={activeItem === 'Shared'}
                onClick={handleItemClick}
              >
                Shared<span className="count">{totalCount}</span>
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>
      </div>
    );
  }

}

export default TabView;
