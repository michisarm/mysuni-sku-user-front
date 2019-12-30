import React, { Component, createRef } from 'react';
import {
  Form,
  Button,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  value? : any
}

class ReplyForm02 extends React.Component<Props, States> {

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
            <Button cancel>Cancel</Button>
            <Button submit>Submit</Button>
          </div>
        </div>
      </Form>
    );
  }
}


export default ReplyForm02;
