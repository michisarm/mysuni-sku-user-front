import React from 'react';

import './style.css';
import {
  TitleArea,
  ContentsArea,
  ClassSeriesDetailModal,
} from './components';

const SiteMapModal = () => (
  <section className="content mylearning">
    {/*<TitleArea/>*/}
    <ClassSeriesDetailModal />
    {/*<ContentsArea/>*/}
  </section>
);

export default SiteMapModal;
