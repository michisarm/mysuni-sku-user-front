import { getPopularCourse } from '../api/personalBoardApi';
import { setPopularCourseItem } from '../store/PersonalBoardStore';
import { MyCompanyPopularCourseItem } from '../model/LectureMyCompanyPopularCourse';
import {
  getChannelName,
  getCollgeName,
} from '../../../../shared/service/useCollege/useRequestCollege';

export async function requestPopularCourse(companyCode: string, date: number) {
  getPopularCourse(companyCode, date).then(
    (result: MyCompanyPopularCourseItem[]) => {
      const channalArr: any = [];
      result.map((item: MyCompanyPopularCourseItem, index: number) => {
        channalArr.push({
          cardId: item.cardId,
          cardName: item.cardName,
        });
      });
      setPopularCourseItem([...channalArr]);
    }
  );
}
