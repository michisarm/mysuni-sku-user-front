import MemberPage from 'community/ui/page/MemberPage';
import React from 'react';
import Tutorial from '../tutorial';
import './style.css';
import '../community/api/MemberApi'
// internal Components


const SearchComponent: React.FC = () => {
  return (
    <>
      <section className="content community">
        <MemberPage/>
      </section>
    </>
  );
};

export default SearchComponent;
