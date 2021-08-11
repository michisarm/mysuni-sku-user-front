import { getDashBoardSentence } from '../api/dashBoardSentenceApi';
import { setDashBoardSentenceItem } from '../store/DashBoardSentenceStore';
import { SkProfileService } from '../../../../../profile/stores';

export async function requestDashBoardSentence(count?: number) {
  getDashBoardSentence().then((item) => {
    if (item) {
      const userLanguage = SkProfileService.instance.skProfile.language;
      let dashboardSentence: string[] = [];
      if (userLanguage === 'Korean') {
        dashboardSentence = Array.isArray(item.koreanTexts)
          ? [...item.koreanTexts]
          : [];
      } else if (userLanguage === 'English') {
        dashboardSentence = Array.isArray(item.englishTexts)
          ? [...item.englishTexts]
          : [];
      } else if (userLanguage === 'Chinese') {
        dashboardSentence = Array.isArray(item.chineseTexts)
          ? [...item.chineseTexts]
          : [];
      }
      console.log(dashboardSentence);

      setDashBoardSentenceItem({
        dashboardSentence,
      });
    }
  });
}
