import { getDashBoardSentence } from '../api/dashBoardSentenceApi';
import { setDashBoardSentenceItem } from '../store/DashBoardSentenceStore';
import { SkProfileService } from '../../../../../profile/stores';

export async function requestDashBoardSentence(count?: number) {
  getDashBoardSentence().then((item) => {
    if (item) {
      const userLanguage = SkProfileService.instance.skProfile.language;
      let dashboardSentence: string[] = [];
      if(userLanguage === 'Korean'){
        dashboardSentence = [...item.koreanTexts];
      } else if(userLanguage === 'English') {
        dashboardSentence = [...item.englishTexts];
      } else if(userLanguage === 'Chinese') {
        dashboardSentence = [...item.chineseTexts];
      }
      console.log(dashboardSentence);

      setDashBoardSentenceItem({
        dashboardSentence,
      });
    }
  });
}
