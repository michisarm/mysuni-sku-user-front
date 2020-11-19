import React from 'react';
import './style.css';

// internal Components
import HeaderArea from './HeaderArea';
import NoDataPage from './SectionArea/NoDataPage';
import AllView from './SectionArea/AllView';


const SearchComponent: React.FC = () => {
  
  return (
    <section className="content">
      <HeaderArea />
      {/* <AllView /> */}
    </section>
  )
};

export default SearchComponent;
