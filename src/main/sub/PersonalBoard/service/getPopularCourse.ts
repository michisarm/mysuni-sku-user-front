import { getPopularCourse } from '../api/personalBoardApi';
import { setPopularCourseItem, } from '../store/PersonalBoardStore';
import { MyCompanyPopularCourseItem } from '../model/LectureMyCompanyPopularCourse';

export async function requestPopularCourse(companyCode: string, date: number) {
  getPopularCourse(companyCode, date).then((result: MyCompanyPopularCourseItem[]) => {
    const channalArr: object[] = []
    result.map((item: any, index: number) => {
      channalArr.push({
        'collegeName' : item.category.college.name,
        'lectureName' : item.lectureName
      })
    })
    setPopularCourseItem([...channalArr])
  })
}
