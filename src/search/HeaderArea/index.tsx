import React, { useLayoutEffect, useState } from 'react';
import { Segment, Radio, Button } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
// import {SearchFilter} from '../../../../../components';
import ContentsHeader from './ContentsHeader';
import ContentsTab from './ContentsTab';

const HeaderArea: React.FC = () => {
  //
  const [isOnFilter, setIsOnFilter] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');

  // onClickFilter = () =>  this.setState((prevState) => ({isOnFilter: !prevState.isOnFilter}));

  useLayoutEffect(() => {
    const queryId: string = window.location.search.slice(
      window.location.search.indexOf('=') + 1,
      window.location.search.length
    );
    setSearchValue(queryId);
  }, []);

  return (
    <>
      <ContentsHeader />
      <ContentsTab />
    </>
  );
};

export default HeaderArea;
