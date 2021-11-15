import React, { useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import {
  useSearchPopular1MList,
  useSearchPopular1YList,
  useSearchPopular6MList,
} from 'search/search.services';
import { searchPopularList } from 'search/search.events';
import { useParams } from 'react-router-dom';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  onClickSearch: (searchValue: any) => void;
}

export function SearchHeaderFieldPopularView(props: Props) {
  //
  const param = useParams();

  // 인기검색어
  useEffect(() => {
    searchPopularList();
  }, [param]);

  const populars1M = useSearchPopular1MList();
  const populars6M = useSearchPopular6MList();
  const populars1Y = useSearchPopular1YList();

  const panes = [
    {
      menuItem: getPolyglotText('1주일', 'home-PersonalBoard-CompanyPopular1w'),
      render: () => (
        <Tab.Pane>
          <ol>
            {populars1M?.map((popular, index) => (
              <li key={`popular-1M-${index}`}>
                <span className="o_num">{index + 1}</span>
                <a
                  href="javascript:void(0);"
                  onClick={() => props.onClickSearch(popular)}
                >
                  <span className="p_word ellipsis">{popular}</span>
                </a>
              </li>
            ))}
          </ol>
        </Tab.Pane>
      ),
    },
    {
      menuItem: getPolyglotText('1개월', 'home-PersonalBoard-CompanyPopular1M'),
      render: () => (
        <Tab.Pane>
          <ol>
            {populars6M?.map((popular, index) => (
              <li key={`popular-6M-${index}`}>
                <span className="o_num">{index + 1}</span>
                <a
                  href="javascript:void(0);"
                  onClick={() => props.onClickSearch(popular)}
                >
                  <span className="p_word ellipsis">{popular}</span>
                </a>
              </li>
            ))}
          </ol>
        </Tab.Pane>
      ),
    },
    {
      menuItem: getPolyglotText('3개월', 'home-PersonalBoard-CompanyPopular3M'),
      render: () => (
        <Tab.Pane>
          <ol>
            {populars1Y?.map((popular, index) => (
              <li key={`popular-1Y-${index}`}>
                <span className="o_num">{index + 1}</span>
                <a
                  href="javascript:void(0);"
                  onClick={() => props.onClickSearch(popular)}
                >
                  <span className="p_word ellipsis">{popular}</span>
                </a>
              </li>
            ))}
          </ol>
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} />;
}
