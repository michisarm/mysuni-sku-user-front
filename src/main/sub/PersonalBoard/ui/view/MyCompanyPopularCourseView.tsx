import React, { useEffect } from 'react';
import { getPopularCourseItem, usePopularCourseItem } from '../../store/PersonalBoardStore';
import BadgeLearningTime from '../../viewModel/BadgeLearningTime';
import LearningTimeDetail from '../../viewModel/LearningTimeDetail';
import MyCompanyPopularCourse from '../../viewModel/MyCompanyPopularCourse';

interface Props {
  // channalRank: string[]
  onTabClick: (date: number) => void;
}

const MyCompanyPopularCourseView: React.FC<Props> = function MyCompanyPopularCourseView({
  // channalRank
  onTabClick
}) {
  // console.log('channalRank', channalRank)
  const popularCourseItem = usePopularCourseItem()
  console.log('popularCourseItem', popularCourseItem)

  // useEffect(() => {
  //   if(test === undefined) {
  //     return
  //   } 
  //   console.log('test', test)
  //   // if(badgeLearningTimeItem!.mylearningTimeHour !== 0) {
  //   //   setAllLearningTime(badgeLearningTimeItem!.mylearningTimeHour + 'h ' +  badgeLearningTimeItem!.mylearningTimeMinute + 'm')
  //   // } else {
  //   //   setAllLearningTime(badgeLearningTimeItem!.mylearningTimeMinute + 'm')
  //   // }
  // }, [test])
  return (
    <>
      {popularCourseItem && ( 
        <div style={{border: '2px solid', borderColor: 'green'}}>
          <button onClick={() => onTabClick(7)}>7일</button>
          <button onClick={() => onTabClick(30)}>1개월</button>
          <button onClick={() => onTabClick(90)}>3개월</button>
          <span>우리회사 인기코스</span><br/>
          {popularCourseItem.map((item: any, key: number)=> {
            return (
              <div key={key}>
                <span>{item.collegeName} - {item.lectureName}</span>
                <br/>
              </div>
            )
          })
          }
        </div>
      )}
    </>
  );
};

export default MyCompanyPopularCourseView;
