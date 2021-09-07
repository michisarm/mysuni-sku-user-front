import React, { useEffect, useRef } from 'react';
import { Segment, Sticky } from 'semantic-ui-react';

import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { useSearchUI, setSearchUI } from './search.services';
import { SearchContentsPage } from './SearchContentsPage';
import { SearchHeaderPage } from './SearchHeaderPage';

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

export function SearchPage() {
  const contextRef = useRef<HTMLDivElement>(null);

  const searchUI = useSearchUI();
  useEffect(() => {
    return setSearchUI;
  }, []);

  return (
    <>
      <section className="content searchTotal">
        <div ref={contextRef}>
          <Sticky context={contextRef} className="tab-menu offset0">
            <SearchHeaderPage />
          </Sticky>

          <Segment attached="bottom">
            <SearchContentsPage />
          </Segment>
        </div>

        {searchUI?.isLoading === true && <LoadingView />}
      </section>
    </>
  );
}
