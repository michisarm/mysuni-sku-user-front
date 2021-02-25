import { getDashBoardSentence } from '../api/dashBoardSentenceApi';
import { setDashBoardSentenceItem } from '../store/DashBoardSentenceStore';

export async function requestDashBoardSentence(count?: number) {
  getDashBoardSentence().then((item) => {
    console.log('item', item)
    if(item) {
      setDashBoardSentenceItem({
        dashboardSentence: [...item.texts],
        // dashboardSentence: [],
      })
    }
  })
}
