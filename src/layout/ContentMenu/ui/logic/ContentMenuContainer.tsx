
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Menu as SemanticMenu, Sticky } from 'semantic-ui-react';

interface Menu {
  name: string,
  count?: number
  type: string,
}

interface Props {
  menus: Menu[]
  type: string
  lectureHeader?: React.ReactNode
  children?: React.ReactNode
  onSelectMenu:(type: string) => void
}

@reactAutobind
class ContentMenuContainer extends Component<Props> {
  //
  static Menu: Menu;

  contextRef: any = React.createRef();

  render() {
    //
    const { menus, type, lectureHeader, children, onSelectMenu } = this.props;

    if (!menus || !menus.length) return null;

    return (
      <div ref={this.contextRef}>
        <Sticky context={this.contextRef} className="tab-menu2 offset0">
          {lectureHeader}
          <div className="cont-inner">
            <SemanticMenu className="sku">
              {
                menus.map((menu: Menu) => (
                  <SemanticMenu.Item
                    name={menu.name}
                    active={menu.type === type}
                    key={`menu_${menu.name}`}
                    onClick={() => onSelectMenu(menu.type)}
                  >
                    {menu.name}
                    { menu.count && <span className="count">+{menu.count}</span> || null }
                  </SemanticMenu.Item>
                )) || null
              }
            </SemanticMenu>
          </div>
        </Sticky>
        {children}
      </div>
    );
  }
}

export default ContentMenuContainer;
