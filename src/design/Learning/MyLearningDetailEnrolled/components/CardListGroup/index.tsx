import React, { Component } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueStamp from '../CardValueStamp';
import CardValueWebpage from '../CardValueWebpage';
import CardValueCommunity from '../CardValueCommunity';
import CardValueVideo from '../CardValueVideo';
import CardValueClassroom from '../CardValueClassroom';
import CardValueAudio from '../CardValueAudio';

interface Props{

}

class CardListGroup extends React.Component<Props> {
  render() {
    return (
      <Card.Group className="box-cards">

        {/*  상태값: Stamp  */}
        <CardValueStamp />

        <CardValueWebpage />

        <CardValueWebpage />

        <CardValueCommunity />

        <CardValueWebpage />

        <CardValueVideo />

        <CardValueAudio />

        <CardValueClassroom />

      </Card.Group>
    );
  }
}


export default CardListGroup;
