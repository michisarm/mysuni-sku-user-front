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

class ReplyForm extends Component<Props, States> {

  handleChange(e:any, { value }:any) {
    // this.setState({ value });
  }

  render() {
    return (
      <Form reply className="base">
        <div className="outline">
          <Form.TextArea placeholder="Writing..." />
          <div className="more">
            <div className="count"><span className="now">0</span>/<span className="max">500</span>
            </div>
            <Button submit>Submit</Button>
          </div>
        </div>
      </Form>
    );
  }
}

export default ReplyForm;
