import React, { Component, createRef } from 'react';
import {
  List,
  Form,
  Radio,
  Image, Icon, Button, Label, Comment,
} from 'semantic-ui-react';
import CubeEnrollment from '../CubeRequired';

interface Props {

}

interface States {
  value? : any
}

class CommentStarRating extends React.Component<Props, States> {
  handleChange(e:any, { value }:any) {
    // this.setState({ value });
  }

  render() {
    return (
      <div className="comment-star-rating">
        <div className="table-css">
          <div className="row">
            <div className="cell vtop">
              <div className="ws">
                <span className="t">Total</span>
                <span className="c">51,378</span>
                <span className="fixed-rating s4">
                  <span /><span /><span /><span /><span />
                </span>
              </div>
            </div>
            <div className="cell vtop">
              <div className="ws">
                <span className="dash" />
                <span className="t">The score I gave </span>
                <span className="fixed-rating line">
                  <span /><span /><span /><span /><span />
                </span>
                {/*<Button className='orange-arrow'>*/}
                {/*    <Icon className='post'/>Modify*/}
                {/*</Button>*/}
                <Button className="orange-arrow">
                  <Icon className="post" />Register
                </Button>
              </div>
              {/*
                                    <div class="update-date">2019. 01. 10</div>
                                    */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default CommentStarRating;
