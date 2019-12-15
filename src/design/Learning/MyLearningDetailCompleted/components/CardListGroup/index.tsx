import React, { Component } from 'react';
import {
  Card,
} from 'semantic-ui-react';
import CardValueLearningStart from '../CardValueElearning';
import CardValueCourse from '../CardValueCourse';
import CardValueVideo from '../CardValueVideo';

interface Props{

}

class CardListGroup extends React.Component<Props> {
  render() {
    return (
      <Card.Group className="list-cards">
        <CardValueLearningStart />

        {/*  상태값: Stamp  */}
        <CardValueCourse />

        <CardValueVideo />

        <CardValueVideo />

      </Card.Group>
    );
  }
}


export default CardListGroup;
