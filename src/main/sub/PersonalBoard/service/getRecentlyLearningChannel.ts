import { getPopularCourse, getRecentlyLearningChannel } from '../api/personalBoardApi';
import { setPopularCourseItem, } from '../store/PersonalBoardStore';
import { MyCompanyPopularCourseItem } from '../model/LectureMyCompanyPopularCourse';

export async function requestRecentlyLearningChannel(companyCode: string, date: number) {
  getRecentlyLearningChannel().then((result: any) => {
    console.log('result', result)
    // const channalArr: string[] = []
    // result.map((item: any, index: number) => {
    //   channalArr.push(item.category.channel.name)
    // })
    // setPopularCourseItem([...channalArr])
  })
}
