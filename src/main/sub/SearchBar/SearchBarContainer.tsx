
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';

import classNames from 'classnames';
import { Segment, Icon } from 'semantic-ui-react';
import { InputWrapper } from 'shared';
import { ActionLogService } from 'shared/stores';


interface Props {
  actionLogService?: ActionLogService,
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
))
@reactAutobind
class SearchBarContainer extends Component<Props> {
  //
  onSearch(value: string) {
    //
    const { actionLogService } = this.props;

    if (value) {
      actionLogService?.registerClickActionLog({ subAction: 'search', subContext: value, isEmpty: true });

      window.location.href = encodeURI(`/search?query=${value}`);
    }
  }

  render() {
    //
    return (
      <div className="search-area">
        <Segment className="full">
          <InputWrapper>
            {({ value, focused, onChange, onClick, onBlur, onClear }) => (
              <div className={classNames('ui main search input', { focus: focused, write: value })}>
                <span className="placeholder">mySUNI에서 다양한 컨텐츠를 탐색해보세요.</span>
                <input type="text" placeholder="" value={value} onChange={onChange} onClick={onClick} onBlur={onBlur} onKeyPress={(e) => e.key === 'Enter' && this.onSearch(value)} />
                <Icon className="clear link" onClick={onClear} />
                <Icon className="search link" onClick={() => this.onSearch(value)} />
              </div>
            )}
          </InputWrapper>
        </Segment>
      </div>
    );
  }
}

export default SearchBarContainer;
