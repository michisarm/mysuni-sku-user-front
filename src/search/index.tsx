import React, { useEffect } from 'react';
import Tutorial from '../tutorial';
import './style.css';

// internal Components
import HeaderArea from './HeaderArea';
import { setSearchUI, useSearchUI } from './model/SearchUI';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

function LoadingView() {
  return (
    <div className="loading">
      <div className="spin">
        <div className="path" />
      </div>
      <p>
        <PolyglotText
          id="통검-필레팝-로딩뷰"
          defaultString="mySUNI가 열심히 검색중입니다. 잠시만 기다려주세요."
        />
      </p>
    </div>
  );
}

const SearchComponent: React.FC = () => {
  const searchUI = useSearchUI();
  useEffect(() => {
    return setSearchUI;
  }, []);

  return (
    <>
      <section className="content">
        <HeaderArea />
        {/* <AllView /> */}
        {searchUI?.isLoading === true && <LoadingView />}
      </section>
    </>
  );
};

export default SearchComponent;
