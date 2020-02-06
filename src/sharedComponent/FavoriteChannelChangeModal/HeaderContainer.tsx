
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';
import { ChannelModel } from '../../college';


interface Props {
  totalChannelCount: number
  favoriteChannels: ChannelModel []
  onSearch: (e: any, searchKey: string) => void
  onResetSelected: () => void
}

interface State {
  searchKey: string
  focus: boolean
}

@reactAutobind
@observer
class HeaderContainer extends Component<Props, State> {
  //
  state = {
    searchKey: '',
    focus: false,
  };

  onSearch(e: any) {
    //
    const { onSearch } = this.props;
    const { searchKey } = this.state;

    onSearch(e, searchKey);
  }

  onChangeSearchKey(event : any) {
    //
    this.setState({
      searchKey: event.target.value,
    });
  }

  onKeyPressInput(e: any) {
    //
    if (e.key === 'Enter') {
      this.onSearch(e);
    }
  }

  onClickInput() {
    this.setState({ focus: true });
  }

  onBlurInput() {
    this.setState({ focus: false });
  }

  onClearSearchKey(e: any) {
    //
    this.setState({ searchKey: '' });
    this.props.onSearch(e, '');
  }

  render() {
    //
    const { favoriteChannels, totalChannelCount, onResetSelected } = this.props;
    const { searchKey, focus } = this.state;

    return (
      <div className="row head">
        <div className="cell v-middle">
          <span className="text01">Channel list</span>
          <div className="right">
            <div className={classNames('ui h30 search input', { focus, write: searchKey })}>
              <input
                type="text"
                placeholder="Search"
                value={searchKey}
                onChange={this.onChangeSearchKey}
                onKeyPress={this.onKeyPressInput}
                onClick={this.onClickInput}
                onBlur={this.onBlurInput}
              />
              <Icon className="clear link" onClick={this.onClearSearchKey} />
              <Icon className="search link" onClick={this.onSearch} />
            </div>
          </div>
        </div>
        <div className="cell v-middle">
          <span className="text01">Selected</span>
          <span className="count">
            <span className="text01 add">{favoriteChannels.length}</span>
            <span className="text02"> / {totalChannelCount}</span>
          </span>
          <div className="right">
            <button className="clear" onClick={onResetSelected}>
              <i className="icon reset">
                <span className="blind">reset</span>
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderContainer;
