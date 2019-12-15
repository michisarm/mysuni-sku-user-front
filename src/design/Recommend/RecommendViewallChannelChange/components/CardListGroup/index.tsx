import React, { Component, createRef } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueRequired from '../CardValueRequired';
import CardValueRequired01 from '../CardValueRequired01';
import CardValueStamp from '../CardValueStamp';

class CardListGroup extends React.Component {
  render() {
    return (
      <Card.Group className="box-cards">

        {/*  상태값: Required  */}
        <CardValueRequired />

        {/*  상태값: Stamp  */}
        <CardValueStamp />

        {/*  상태값: Required  */}
        <CardValueRequired01 />

        {/*  상태값: Stamp  */}
        <CardValueStamp />

        {/*  상태값: Required  */}
        <CardValueRequired />

        {/*  상태값: Stamp  */}
        <CardValueStamp />

        {/*  상태값: Required  */}
        <CardValueRequired01 />

        {/*  상태값: Stamp  */}
        <CardValueStamp />

      </Card.Group>
    );
  }
}


export default CardListGroup;
