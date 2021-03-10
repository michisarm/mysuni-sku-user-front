import { getRecentlyStudyChannel } from "../api/recommendApi"

export async function requestRecentlyStudyChannel() {
  getRecentlyStudyChannel().then((result) => {
    console.log('result', result)
    // if(item) {
    //   setDashBoardSentenceI`tem({
    //     dashboardSentence: [...item.texts],
    //     // dashboardSentence: [],
    //   })
    // }
  })
}
