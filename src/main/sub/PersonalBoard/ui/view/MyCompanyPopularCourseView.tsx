import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { usePopularCourseItem } from '../../store/PersonalBoardStore';

interface Props {
  onTabClick: (date: any) => void;
}

const MyCompanyPopularCourseView: React.FC<Props> = function MyCompanyPopularCourseView({
  onTabClick
}) {
  const popularCourseItem = usePopularCourseItem()

  const [searchPeriod, setSearchPeriod] = useState<string>('')

  useEffect(() => {
    const startDate = moment().subtract(8, 'day')
    const endDate = moment().subtract(1, 'day')
    setSearchPeriod(startDate.format('YYYY.MM.DD') + '~' + endDate.format('YYYY.MM.DD'))
  },[])

  const handleTabClick = (data: any) => {
    onTabClick(data)
    
    let startDate
    let endDate

    if(data.activeIndex === 0) {
      startDate = moment().subtract(8, 'day')
      endDate = moment().subtract(1, 'day')
    } else if(data.activeIndex === 1) {
      startDate = moment().subtract(1, 'months')
      endDate = moment().subtract(1, 'day')
    } else {
      startDate = moment().subtract(3, 'months')
      endDate = moment().subtract(1, 'day')
    }
    setSearchPeriod(startDate.format('YYYY.MM.DD') + '~' + endDate.format('YYYY.MM.DD'))
  }
  const panes = [
    {
      menuItem: "1주일",
      render: () => (
        <Tab.Pane>
          <ul className="personal_list">
            <li className="sv">
              <span className="personal_list_number">1</span>
              <p className="personal_list_txt">사회문제에 대한 이해 : 심화</p>
            </li>
            <li className="global">
              <span className="personal_list_number">2</span>
              <p className="personal_list_txt">
                국제정세의 현상과 본질 (Series 2)
              </p>
            </li>
            <li className="happy">
              <span className="personal_list_number">3</span>
              <p className="personal_list_txt">명상의 이해</p>
            </li>
            <li className="ai">
              <span className="personal_list_number">4</span>
              <p className="personal_list_txt">AI UX 기초 Essentials</p>
            </li>
            <li className="inno">
              <span className="personal_list_number">5</span>
              <p className="personal_list_txt">
                고객 이해에 도움되는 &quot; 디자인 방법 &quot; 맛보기
              </p>
            </li>
          </ul>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "1개월",
      render: () => (
        <Tab.Pane>
          <ul className="personal_list">
            <li className="sv">
              <span className="personal_list_number">1</span>
              <p className="personal_list_txt">AI UX 기초 Essentials</p>
            </li>
            <li className="global">
              <span className="personal_list_number">2</span>
              <p className="personal_list_txt">
                고객 이해에 도움되는 &quot; 디자인 방법 &quot; 맛보기
              </p>
            </li>
            <li className="happy">
              <span className="personal_list_number">3</span>
              <p className="personal_list_txt">명상의 이해</p>
            </li>
            <li className="ai">
              <span className="personal_list_number">4</span>
              <p className="personal_list_txt">국제정세의 현상과 본질 (Series 2)</p>
            </li>
            <li className="inno">
              <span className="personal_list_number">5</span>
              <p className="personal_list_txt">
                사회문제에 대한 이해 : 심화
              </p>
            </li>
          </ul>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "3개월",
      render: () => (
        <Tab.Pane>
          <ul className="personal_list">
            <li className="sv">
              <span className="personal_list_number">1</span>
              <p className="personal_list_txt">명상의 이해</p>
            </li>
            <li className="global">
              <span className="personal_list_number">2</span>
              <p className="personal_list_txt">
                국제정세의 현상과 본질 (Series 2)
              </p>
            </li>
            <li className="happy">
              <span className="personal_list_number">3</span>
              <p className="personal_list_txt">사회문제에 대한 이해 : 심화</p>
            </li>
            <li className="ai">
              <span className="personal_list_number">4</span>
              <p className="personal_list_txt">고객 이해에 도움되는 &quot; 디자인 방법 &quot; 맛보기</p>
            </li>
            <li className="inno">
              <span className="personal_list_number">5</span>
              <p className="personal_list_txt">
                AI UX 기초 Essentials
              </p>
            </li>
          </ul>
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
            <Tab panes={panes} onTabChange={(e, data) => handleTabClick(data)}/>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCompanyPopularCourseView;
