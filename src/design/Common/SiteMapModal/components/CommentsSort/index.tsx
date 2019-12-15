import React, {Component, createRef} from 'react';
import {
  List,
  Form,
  Radio,
  Image, Icon, Button, Label, Comment,
} from 'semantic-ui-react';
import CubeEnrollment from '../CubeRequired';
import CommentStarRating from '../CommentStarRating';
import ReplyForm from '../ReplyForm01';

interface Props {

}

interface States {
  value?: any
}

class CommentsSort extends React.Component<Props, States> {

  handleChange(e: any, {value}: any) {
    this.setState({ value });
  }

  render() {
    return (
      <div className="comments-sort">
        <Radio
          className="base"
          label="Newest"
          name="radioGroup"
          value="Newest"
          checked={this.state.value === 'Newest'}
          onChange={this.handleChange}
        />
        <Radio
          className="base"
          label="Oldest"
          name="radioGroup"
          value="Oldest"
          checked={this.state.value === 'Oldest'}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}


export default CommentsSort;
