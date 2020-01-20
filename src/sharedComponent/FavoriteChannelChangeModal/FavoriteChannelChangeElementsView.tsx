
import React, { FunctionComponent } from 'react';

import { Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college';


export const ContentWrapper: FunctionComponent = ({ children }) => (
  <div className="channel-change">
    <div className="table-css">
      {children}
    </div>
  </div>
);


interface Props {
  favoriteChannels: ChannelModel []
  onChangeSearchKey: (e: any) => void
  onSearch: (e: any) => void
  onResetSelected: () => void
}

export const Header: FunctionComponent<Props> = ({ favoriteChannels, onChangeSearchKey, onSearch, onResetSelected }) => (
  <div className="row head">
    <div className="cell v-middle">
      <span className="text01">Channel list</span>
      <div className="right">
        <div className="ui h30 search input">
          <input type="text" placeholder="Search" onChange={onChangeSearchKey}  />
          <Icon className="clear link" />
          <Icon className="search link" onClick={onSearch} />
        </div>
      </div>
    </div>
    <div className="cell v-middle">
      <span className="text01">Selected</span>
      <span className="count">
        <span className="text01 add">{favoriteChannels.length}</span>
        <span className="text02" />
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
