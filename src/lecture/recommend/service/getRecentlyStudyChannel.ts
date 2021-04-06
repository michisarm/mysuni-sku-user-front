import { getRecentlyStudyChannel } from "../api/recommendApi"
import { setRecentlyStudyChannelItem } from "../store/recommendStore"

export async function requestRecentlyStudyChannel() {
  getRecentlyStudyChannel().then((result) => {
    setRecentlyStudyChannelItem([...result])
    // if(item) {
    //   setDashBoardSentenceI`tem({
    //     dashboardSentence: [...item.texts],
    //     // dashboardSentence: [],
    //   })
    // }
  })
}
