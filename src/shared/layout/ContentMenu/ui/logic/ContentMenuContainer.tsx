
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Menu as SemanticMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Menu {
  name: string,
  count?: number
  path: string,
}

interface Props {
  menus: Menu[]
  activeIndex: number
}


@reactAutobind
class ContentMenuContainer extends Component<Props> {
  //
  static Menu: Menu;

  render() {
    //
    const { menus, activeIndex } = this.props;

    if (!menus || !menus.length) return null;

    return (
      <div className="tab-menu offset0">
        <div className="cont-inner">
          <SemanticMenu className="sku">
            {
              menus.map((menu: Menu, index: number) => (
                <SemanticMenu.Item
                  name={menu.name}
                  active={index === activeIndex}
                  as={Link}
                  to={menu.path}
                  key={`menu_${menu.name}`}
                >
                  {menu.name}
                  { menu.count && <span className="count">+{menu.count}</span> || null }
                </SemanticMenu.Item>
              )) || null
            }
          </SemanticMenu>
        </div>
      </div>
    );
  }
}

export default ContentMenuContainer;
