import { findAttendEvent, getAttendCount, getCollegePercent, getPopularCourse } from '../api/personalBoardApi';
import { CollegePercentData } from '../model/CollegePercent';
import { setAttendEventItem } from '../store/EventStore';
import { setCollegeTopChartItem, setPopularCourseItem, } from '../store/PersonalBoardStore';
import AttendEvent from '../viewModel/AttendEvent';

export async function requestAttendCount(id: string) {
  getAttendCount(id).then((result: any) => {
    // const collegeArr: object[] = []

    // let totalTime = 0
    // result.map((item:CollegePercentData) => {
    //   totalTime += item.learningTime
    // })

    // result.map((item:CollegePercentData, index: number) => {
    //   if(index < 5) {
    //     collegeArr.push({
    //       'college': item.college,
    //       'percent': Math.floor((item.learningTime/totalTime)*100)
    //     })
    //   }
    // })
    console.log('get result', result)
    setAttendEventItem({...result})
  })
}
