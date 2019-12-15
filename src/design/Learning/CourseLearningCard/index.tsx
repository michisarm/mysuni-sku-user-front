import React from 'react';

import './style.css';
import {
  TitleArea,
  ContentsArea,
} from './components';

const CourseLearningCard = () => (
  <section className="content mylearning">
    <TitleArea />
    <ContentsArea />
  </section>
);

export default CourseLearningCard;
