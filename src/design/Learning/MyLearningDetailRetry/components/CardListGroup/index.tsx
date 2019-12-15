import React, { Component } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueAudio from '../CardValueAudio';
import CardValueRequired from '../CardValueRequired';
import CardValueElearning from '../CardValueElearning';
import CardValueVideo from '../CardValueVideo';
import CardValueCommunity from '../CardValueCommunity';

interface Props{

}

class CardListGroup extends React.Component<Props> {
  render() {
    return (
      <Card.Group className="box-cards">
        {/*  상태값: Required  */}
        <CardValueRequired />

        <CardValueAudio />

        <CardValueElearning />

        <CardValueCommunity />

        <CardValueCommunity />

        <CardValueVideo />

        <CardValueVideo />

        <CardValueVideo />
      </Card.Group>
    );
  }
}


export default CardListGroup;
