import React, { Component, createRef } from 'react';
import {
  Button, Form,
} from 'semantic-ui-react';

class ActionButtons extends React.Component {
  render() {
    return (
      <>
        <div className="buttons">
          <Button className="fix line">Cancel</Button>
          <Button className="fix bg">Save</Button>
        </div>
      </>
    );
  }
}


export default ActionButtons;
