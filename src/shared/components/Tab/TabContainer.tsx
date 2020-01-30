
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { Menu } from 'semantic-ui-react';
import TabItemModel from './model/TabItemModel';


interface Props {
  tabs: TabItemModel[]
  className?: string
  defaultActiveName?: string
  onChangeTab?: (tab: TabItemModel) => void,
}

interface State {
  activeName: string
}

@reactAutobind
@observer
class TabContainer extends Component<Props, State> {
  //
  static defaultProps = {
    className: 'tab-menu offset0 temp',
    onChangeTab: () => {},
  };

  state = {
    activeName: '',
  };


  constructor(props: Props) {
    //
    super(props);

    if (props.defaultActiveName) {
      this.state.activeName = props.defaultActiveName;
    }
    else if (props.tabs.length > 0) {
      this.state.activeName = props.tabs[0].name;
    }
  }

  onClickTab(tab: TabItemModel) {
    //
    const { onChangeTab } = this.props;

    this.setState({ activeName: tab.name });

    onChangeTab!(tab);
  }


  render() {
    //
    const { className, tabs } = this.props;
    const { activeName } = this.state;
    const activeTab = tabs.find(tab => tab.name === activeName);

    return (
      <>
        <div className={classNames('ui sticky', className)}>
          <div className="cont-inner">
            <Menu className="sku">
              { tabs.map((tab, index) => (
                <Menu.Item
                  key={`tab-${index}`}
                  name={tab.name}
                  active={activeName === tab.name}
                  onClick={() => this.onClickTab(tab)}
                >
                  {tab.item || tab.name}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>

        { activeTab && (
          activeTab.render({ tab: activeTab })
        )}
      </>
    );
  }
}

export default TabContainer;
