import React, { useLayoutEffect, useState } from 'react';
import { Segment, Radio, Button } from 'semantic-ui-react';
import classNames from 'classnames';
// import {SearchFilter} from '../../../../../components';
import ContentsHeader from './ContentsHeader';
import ContentsTab from './ContentsTab';

const HeaderArea: React.FC = () => {
  //

  return (
    <>
      <ContentsHeader />
      <ContentsTab />
    </>
  );
};

export default HeaderArea;
