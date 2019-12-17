import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Menu, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CompletedListView from '../view/CompletedListView';
import EarnedStampListView from '../view/EarnedStampListView';


interface Props{

}

interface States {
  contextRef : any,
  activeItem : string
}

@reactAutobind
class MenuItemContainer extends Component<Props, States> {

  constructor(props : Props) {
    super(props);
    this.state = {
      contextRef: createRef(),
      activeItem: 'CompletedList',
    };
  }

  componentDidMount(): void {

  }


  onChangeItem(event:any, item:any) {
    this.setState({
      activeItem: item.name,
    });
    event.preventDefault();
  }


  render() {
    const { contextRef, activeItem } = this.state;
    return (
      <div ref={contextRef}>
        <Sticky context={contextRef} className="tab-menu offset0">
          <div className="cont-inner">
            <Menu className="sku">
              <Menu.Item
                name="CompletedList"
                active={activeItem === 'CompletedList'}
                onClick={(event:any, item:any) => this.onChangeItem(event, item)}
                as={Link}
                to=""
              >
                Completed List<span className="count">+5</span>
              </Menu.Item>
              <Menu.Item
                name="EarnedStampList"
                active={activeItem === 'EarnedStampList'}
                onClick={(event:any, item:any) => this.onChangeItem(event, item)}
                as={Link}
                to=""
              >
                Earned Stamp List<span className="count">+24</span>
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>
        {activeItem === 'CompletedList' ?
          <CompletedListView />
          : <EarnedStampListView />
        }
      </div>
    );
  }
}

export default MenuItemContainer;
