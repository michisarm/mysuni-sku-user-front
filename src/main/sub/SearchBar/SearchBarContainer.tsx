
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { Segment, Icon } from 'semantic-ui-react';
import { InputWrapper } from 'shared';


@reactAutobind
class SearchBarContainer extends Component {
  //
  render() {
    //
    return (
      <div className="search-area">
        <Segment className="full">
          <InputWrapper>
            {({ value, focused, onChange, onClick, onBlur, onClear }) => (
              <div className={classNames('ui main search input', { focus: focused, write: value })}>
                <span className="placeholder">SUNI에서 다양한 컨텐츠를 탐색해 보세요.</span>
                <input type="text" placeholder="" value={value} onChange={onChange} onClick={onClick} onBlur={onBlur} />
                <Icon className="clear link" onClick={onClear} />
                <Icon className="search link" />
              </div>
            )}
          </InputWrapper>
        </Segment>
      </div>
    );
  }
}

export default SearchBarContainer;
