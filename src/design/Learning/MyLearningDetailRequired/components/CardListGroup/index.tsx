import React, { Component } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueRequired from '../CardValueRequired';

interface Props {

}

class CardListGroup extends React.Component<Props> {
  render() {
    return (
      <Card.Group className="box-cards">

        <CardValueRequired />

        <CardValueRequired />

        <CardValueRequired />

        <CardValueRequired />

        <CardValueRequired />

        <CardValueRequired />

        <CardValueRequired />

        <CardValueRequired />

      </Card.Group>
    );
  }
}


export default CardListGroup;
