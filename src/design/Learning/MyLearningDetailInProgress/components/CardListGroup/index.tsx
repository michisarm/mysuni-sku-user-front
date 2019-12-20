import React from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueRequired from '../CardValueRequired';
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
