import React from 'react';
import { Tab } from 'semantic-ui-react';
import {
  useSearchPopular1MList,
  useSearchPopular1YList,
  useSearchPopular6MList,
} from 'search/search.services';

interface Props {
  onClickSearch: (searchValue: string) => void;
}

export function SearchHeaderFieldPopularView(props: Props) {
  //
  const populars1M = useSearchPopular1MList();
  const populars6M = useSearchPopular6MList();
  const populars1Y = useSearchPopular1YList();

  const panes = [
    {
      menuItem: '1개월',
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
      menuItem: '6개월',
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
      menuItem: '1년',
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
