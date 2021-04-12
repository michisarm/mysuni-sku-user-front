import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { toPath } from '../../../../../lecture/detail/viewModel/LectureParams';
import { usePopularCourseItem } from '../../store/PersonalBoardStore';

interface Props extends RouteComponentProps {
  onTabClick: (date: any) => void;
}

const MyCompanyPopularCourseView: React.FC<Props> = Props => {
  const { history, onTabClick } = Props;
  const popularCourseItem = usePopularCourseItem();
  const [searchPeriod, setSearchPeriod] = useState<string>('');

  useEffect(() => {
    const startDate = moment().subtract(8, 'day');
    const endDate = moment().subtract(1, 'day');
    setSearchPeriod(
      startDate.format('YYYY.MM.DD') + '~' + endDate.format('YYYY.MM.DD')
    );
  }, []);

  const handleTabClick = (data: any) => {
    onTabClick(data);
    let startDate;
    let endDate;
    if (data.activeIndex === 0) {
      startDate = moment().subtract(8, 'day');
      endDate = moment().subtract(1, 'day');
    } else if (data.activeIndex === 1) {
      startDate = moment().subtract(1, 'months');
      endDate = moment().subtract(1, 'day');
    } else {
      startDate = moment().subtract(3, 'months');
      endDate = moment().subtract(1, 'day');
    }
    setSearchPeriod(
      startDate.format('YYYY.MM.DD') + '~' + endDate.format('YYYY.MM.DD')
    );
  };

  const popularCourseClass = useCallback(index => {
    const className = ['sv', 'global', 'happy', 'ai', 'inno'];
    return className[index];
  }, []);

  const panes = [
    {
      menuItem: '1주일',
      render: () => (
        <Tab.Pane>
          {popularCourseItem && (
            <ul className="personal_list">
              {popularCourseItem.map(({ cardId, cardName }, index) => {
                return (
                  <li className={popularCourseClass(index)} key={cardId}>
                    <span className="personal_list_number">{index + 1}</span>
                    <p className="personal_list_txt">
                      <Link
                        to={toPath({
                          cardId,
                          viewType: 'view',
                          pathname: '',
                        })}
                      >
                        {cardName}
                      </Link>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: '1개월',
      render: () => (
        <Tab.Pane>
          {popularCourseItem && (
            <ul className="personal_list">
              {popularCourseItem.map(({ cardId, cardName }, index) => {
                return (
                  <li className={popularCourseClass(index)} key={index}>
                    <span className="personal_list_number">{index + 1}</span>
                    <p className="personal_list_txt">
                      <Link
                        to={toPath({
                          cardId,
                          viewType: 'view',
                          pathname: '',
                        })}
                      >
                        {cardName}
                      </Link>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: '3개월',
      render: () => (
        <Tab.Pane>
          {popularCourseItem && (
            <ul className="personal_list">
              {popularCourseItem.map(({ cardId, cardName }, index) => {
                return (
                  <li className={popularCourseClass(index)} key={index}>
                    <span className="personal_list_number">{index + 1}</span>
                    <p className="personal_list_txt">
                      <Link
                        to={toPath({
                          cardId,
                          viewType: 'view',
                          pathname: '',
                        })}
                      >
                        {cardName}
                      </Link>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {popularCourseItem && (
        <div className="personal-card-item right-card">
          <div className="card-item-tit">
            <h3>우리 회사 인기 코스</h3>
            <span>{searchPeriod}</span>
          </div>
          <div className="card-item-con">
            <Tab
              panes={panes}
              onTabChange={(e, data) => handleTabClick(data)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default inject()(withRouter(observer(MyCompanyPopularCourseView)));
