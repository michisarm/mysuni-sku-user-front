
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { Segment } from 'semantic-ui-react';


interface Props {
  tabs: TabItem[]
  onClickTab?: (tab: TabItem) => void,
}

interface State {
  activeName: string
}

interface TabItem {
  name: string
  text?: string
  element?: React.ReactNode
  onClick?: () => void
}

@reactAutobind
@observer
class MyLearningTabContainer extends Component<Props, State> {
  //
  static defaultProps = {
    text: '',
    element: null,
  };

  state = {
    activeName: '',
  };

  constructor(props: Props) {
    //
    super(props);

    if (props.tabs.length > 0) {
      this.state.activeName = props.tabs[0].name;
    }
  }

  onClickTab(tab: TabItem) {
    //
    const { onClickTab } = this.props;

    this.setState({ activeName: tab.name });

    if (typeof onClickTab === 'function') {
      onClickTab(tab);
    }
  }


  render() {
    //
    const { tabs, children } = this.props;
    const { activeName } = this.state;

    return (
      <div className="my-learning-area-tab">
        <Segment className="full">
          <div className="ui tab-menu">
            <div className="cont-inner">
              <div className="ui sku menu">
                { tabs.map((tab, index) => (
                  <a
                    key={`tab-${index}`}
                    className={classNames('item', { active: activeName === tab.name })}
                    onClick={() => this.onClickTab(tab)}
                  >
                    {tab.text || tab.element || tab.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Segment>

        <hr className="dash" />
        {children}
      </div>
    );
  }
}

export default MyLearningTabContainer;
