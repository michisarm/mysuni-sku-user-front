import { getCollegePercent, getPopularCourse } from '../api/personalBoardApi';
import { CollegePercentData } from '../model/CollegePercent';
import { setCollegeTopChartItem, setPopularCourseItem, } from '../store/PersonalBoardStore';

export async function requestCollegePercent() {
  getCollegePercent().then((result: CollegePercentData[]) => {
    const collegeArr: object[] = []

    let totalTime = 0
    result.map((item:CollegePercentData) => {
      totalTime += item.learningTime
    })

    result.map((item:CollegePercentData, index: number) => {
      if(index < 5) {
        collegeArr.push({
          'college': item.college,
          'percent': Math.floor((item.learningTime/totalTime)*100)
        })
      }
    })

    setCollegeTopChartItem([...collegeArr])
  })
}
