import { NotieService } from 'notie/stores';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import routePaths from 'myTraining/routePaths';
import { MyLearningContentType } from 'myTraining/ui/model';
import { TabItemModel } from 'shared';

export const onChangeTab = (tab: TabItemModel): string => {
  const notieService = NotieService.instance;
  const currentHistory = getCurrentHistory();
  switch (tab.name) {
    case MyLearningContentType.InProgress:
      notieService.readNotie('Learning_Progress');
      break;
    case MyLearningContentType.Completed:
      notieService.readNotie('Learning_Passed');
      break;
    case MyLearningContentType.Retry:
      notieService.readNotie('Learning_Missed');
      break;
    case MyLearningContentType.Enrolled:
      notieService.readNotie('Learning_Waiting');
      break;
  }
  currentHistory?.push(routePaths.learningTab(tab.name));
  return routePaths.learningTab(tab.name);
};
