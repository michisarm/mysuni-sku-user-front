
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Menu as SemanticMenu } from 'semantic-ui-react';

interface Menu {
  name: string,
  count?: number
  type: Type,
}

interface Props {
  menus: Menu[]
  type: Type
  onSelectMenu:(type: Type) => void
}

export enum Type {
  Overview= 'Overview',
  Comments= 'Comments',
  List = 'List',
  Posts= 'Posts',
  MyPosts= 'MyPosts',
  MyCommunity= 'MyCommunity',
  MyCreatedCommunity= 'MyCreatedCommunity',
  MyFeed= 'MyFeed',
}

@reactAutobind
class ContentMenuContainer extends Component<Props> {
  //
  static Menu: Menu;

  static Type= Type;

  render() {
    //
    const { menus, type, onSelectMenu } = this.props;

    if (!menus || !menus.length) return null;

    return (
      <div className="tab-menu offset0">
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
      </div>
    );
  }
}

export default ContentMenuContainer;
