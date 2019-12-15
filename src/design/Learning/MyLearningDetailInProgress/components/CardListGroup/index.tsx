import React, { Component, createRef } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueRequired from '../CardValueRequired';
import CardValueStamp from '../CardValueStamp';
import CardValueDefault from '../CardValueDefault';
import CardValueExperiential from '../CardValueExperiential';
import CardValueDocuments from '../CardValueDocuments';
import CardValueAudio from '../CardValueAudio';

interface Props{

}

class CardListGroup extends React.Component<Props> {
  render() {
    return (
      <Card.Group className="box-cards">

        {/*  상태값: Required  */}
        <CardValueRequired />

        {/*  상태값: Stamp  */}
        {/*<CardValueStamp />*/}

        <CardValueExperiential />

        <CardValueDocuments />

        <CardValueExperiential />

        <CardValueAudio />

        <CardValueExperiential />

        <CardValueDocuments />

        <CardValueExperiential />
      </Card.Group>
    );
  }
}


export default CardListGroup;
