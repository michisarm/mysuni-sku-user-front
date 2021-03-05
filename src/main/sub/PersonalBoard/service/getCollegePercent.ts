import { getCollegePercent, getPopularCourse } from '../api/personalBoardApi';
import { setCollegeTopChartItem, setPopularCourseItem, } from '../store/PersonalBoardStore';

export async function requestCollegePercent() {
  getCollegePercent().then((result: any) => {
    const collegeArr: object[] = []

    let totalTime = 0
    result.map((item:any, index: number) => {
      totalTime += item.learningTime
    })

    result.map((item:any, index: number) => {
      if(index < 5) {
        collegeArr.push({
          'college': item.college,
          'percent': Math.floor((item.learningTime/totalTime)*100)
        })
      }
    })

    console.log('resultcollegeArr', collegeArr)
    console.log('resulttotalTime', totalTime)
    setCollegeTopChartItem([...collegeArr])
  })
}
