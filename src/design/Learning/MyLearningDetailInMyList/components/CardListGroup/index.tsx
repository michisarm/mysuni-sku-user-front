import React, { Component, createRef } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueRequired from '../CardValueRequired';
import CardValueElearning from '../CardValueElearning';
import CardValueAudio from '../CardValueAudio';
import CardValueExperiential from '../CardValueExperiential';


interface Props {

}

class CardListGroup extends React.Component<Props> {
  render() {
    return (
      <Card.Group className="box-cards">

        <CardValueAudio />

        <CardValueAudio />

        {/*  상태값: Required  */}
        <CardValueRequired />

        <CardValueElearning />

        {/*  상태값: Stamp  */}
        {/*<CardValueStamp/>*/}

        <CardValueAudio />

        {/*  상태값: Required  */}
        <CardValueRequired />

        <CardValueExperiential />

        <CardValueExperiential />

      </Card.Group>
    );
  }
}


export default CardListGroup;
