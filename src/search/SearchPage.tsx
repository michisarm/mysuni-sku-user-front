import React, { useEffect, useRef } from 'react';
import { Segment, Sticky } from 'semantic-ui-react';
import { ContentLayout } from 'shared';

import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { CheckboxOptions } from './search.models';
import { useSearchUI, setSearchUI } from './search.services';
import { SearchHeaderPage } from './SearchHeaderPage';
import { SearchContentsPage } from './SearchContentsPage';
import SearchService from './service/SearchService';
import { search } from './search.events';

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

  const searchService = SearchService.instance;

  useEffect(() => {
    // model에서 생성시에는 다국어가 먹히지 않아서 여기서 다시 셋팅
    CheckboxOptions.difficulty_level_json_query = [
      {
        key: 0,
        text: getPolyglotText('Basic', '통검-필레팝-초급'),
        value: 'Basic',
      },
      {
        key: 1,
        text: getPolyglotText('Intermediate', '통검-필레팝-중급'),
        value: 'Intermediate',
      },
      {
        key: 2,
        text: getPolyglotText('Advanced', '통검-필레팝-고급'),
        value: 'Advanced',
      },
      {
        key: 3,
        text: getPolyglotText('Expert', '통검-필레팝-전문가'),
        value: 'Expert',
      },
    ];
    CheckboxOptions.learning_time_query = [
      {
        key: 0,
        text: getPolyglotText('30분 미만', '통검-필레팝-30분'),
        value: 'type1',
      },
      {
        key: 1,
        text: getPolyglotText('30분 이상~1시간 미만', '통검-필레팝-1시간'),
        value: 'type2',
      },
      {
        key: 2,
        text: getPolyglotText('1시간 이상~4시간 미만', '통검-필레팝-4시간'),
        value: 'type3',
      },
      {
        key: 3,
        text: getPolyglotText('4시간 이상~12시간 미만', '통검-필레팝-12시간'),
        value: 'type4',
      },
      {
        key: 4,
        text: getPolyglotText('12시간 이상', '통검-필레팝-12이상'),
        value: 'type5',
      },
    ];
    CheckboxOptions.support_lang_json_query = [
      {
        key: 0,
        text: getPolyglotText('한국어', '통검-필레팝-한국어'),
        value: 'Korean',
      },
      {
        key: 1,
        text: getPolyglotText('중국어', '통검-필레팝-중국어'),
        value: 'Chinese',
      },
      {
        key: 2,
        text: getPolyglotText('영어', '통검-필레팝-영어'),
        value: 'English',
      },
    ];

    return setSearchUI;
  }, []);

  const onSearch = async (value: string, withOriginal?: boolean) => {
    searchService.setSearchInfoValue('searchValue', value);
    if (!searchService.searchInfo.inAgain) {
      searchService.setSearchInfoValue('recentSearchValue', value);
    }
    if (withOriginal) {
      await search(value, '', true);
    } else {
      await search(value);
    }
    searchService.setFocusedValue(false);
  };

  return (
    <>
      <ContentLayout className="searchTotal" breadcrumb={[{ text: 'Search' }]}>
        <div ref={contextRef}>
          {/* <Sticky context={contextRef} className="tab-menu offset0"> */}
          <SearchHeaderPage />
          {/* </Sticky> */}

          <Segment attached="bottom">
            <SearchContentsPage
              onSearch={onSearch}
              searchInfo={searchService.searchInfo}
            />
          </Segment>
        </div>

        {searchUI?.isLoading === true && <LoadingView />}
      </ContentLayout>
    </>
  );
}
