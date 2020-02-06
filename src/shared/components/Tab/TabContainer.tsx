
import React, { Component, Fragment, ReactNode } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Menu, Sticky } from 'semantic-ui-react';
import TabItemModel from './model/TabItemModel';


interface Props {
  tabs: TabItemModel[]
  header?: ReactNode
  className?: string
  wrapperClassName?: string
  defaultActiveName?: string
  allMounted?: boolean
  large?: boolean
  renderItems?: (props: any) => void
  onChangeTab?: (tab: TabItemModel) => void
}

interface State {
  activeName: string
}

@reactAutobind
@observer
class TabContainer extends Component<Props, State> {
  //
  static defaultProps = {
    className: 'tab-menu offset0',
    onChangeTab: () => {},
  };

  state = {
    activeName: '',
  };

  contextRef: any = React.createRef();

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

  renderItems() {
    //
    const { renderItems, header, className, large, tabs } = this.props;
    const { activeName } = this.state;

    if (renderItems) {
      return renderItems({ tabs, activeName, onClickTab: this.onClickTab });
    }
    else {
      return (
        <Sticky context={this.contextRef} className={className}>
          {header}
          <div className="cont-inner">
            <Menu className={large ? 'sku2' : 'sku'}>
              { tabs.map((tab, index) => (
                <Menu.Item
                  key={`tab-${index}`}
                  className={tab.className}
                  name={tab.name}
                  active={activeName === tab.name}
                  onClick={() => this.onClickTab(tab)}
                >
                  {tab.item || tab.name}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Sticky>
      );
    }
  }

  render() {
    //
    const { tabs, wrapperClassName, allMounted } = this.props;
    const { activeName } = this.state;
    const activeTab = tabs.find(tab => tab.name === activeName);

    const contents = (
      <div ref={this.contextRef}>
        {this.renderItems()}

        { allMounted ?
          tabs.map(tab =>
            <Fragment key={`tab-${tab.name}`}>
              {tab.render({ tab, active: tab.name === activeName })}
            </Fragment>
          )
          :
          activeTab && (
            activeTab.render({ tab: activeTab, active: true })
          )
        }
      </div>
    );

    if (wrapperClassName) {
      return (
        <div className={wrapperClassName}>
          {contents}
        </div>
      );
    }
    return contents;
  }
}

export default TabContainer;
