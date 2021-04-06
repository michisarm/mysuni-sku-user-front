import { getPopularCourse } from '../api/personalBoardApi';
import { setPopularCourseItem, } from '../store/PersonalBoardStore';
import { MyCompanyPopularCourseItem } from '../model/LectureMyCompanyPopularCourse';

export async function requestPopularCourse(companyCode: string, date: number) {
  getPopularCourse(companyCode, date).then((result: MyCompanyPopularCourseItem[]) => {
    const channalArr: any = []
    result.map((item: any, index: number) => {
      channalArr.push({
        'collegeName': item.category.college.name,
        'collegeId': item.category.college.id,
        'coursePlanId': item.coursePlanId,
        'lectureUsid': item.lectureUsid,
        'lectureName': item.lectureName,
        'channelName': item.category.channel.name
      })
    })
    setPopularCourseItem([...channalArr])
  })
}
