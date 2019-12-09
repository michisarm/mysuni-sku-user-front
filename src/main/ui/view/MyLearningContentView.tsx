
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Segment } from 'semantic-ui-react';


@reactAutobind
class MyLearningContentView extends Component {
  //
  render() {
    //
    return (
      <div className="my-learning-area-tab">
        <Segment className="full">
          <div className="ui tab-menu">
            <div className="cont-inner">
              <div className="ui sku menu">
                <a className="active item" data-tab="first">
                  Required
                  <span className="count">+5</span>
                </a>
                <a className="item" data-tab="second">In My List</a>
                <a className="item" data-tab="third">In Progress</a>
                <a className="item" data-tab="fourth">
                  Enrolled
                  <span className="count">+3</span>
                </a>
              </div>
            </div>
          </div>
        </Segment>

        <hr className="dash" />

        <div className="ui full segment">
          {/*  Content */}
        </div>
      </div>
    );
  }
}

export default MyLearningContentView;
