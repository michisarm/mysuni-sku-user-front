
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Segment,
  Icon,
} from 'semantic-ui-react';


@reactAutobind
class SearchBarContainer extends Component {
  //
  render() {
    //
    return (
      <div className="search-area">
        <Segment className="full">
          <div className="ui main search input">
            <span className="placeholder">
              SK University의 다양한 학습 및 포럼에 참여하세요.&nbsp;
              <span className="orange">AI</span>를 검색해보시는건 어떨까요?
            </span>
            <input type="text" placeholder="" />
            <Icon className="clear link" />
            <Icon className="search link" />
          </div>
        </Segment>
      </div>
    );
  }
}

export default SearchBarContainer;
