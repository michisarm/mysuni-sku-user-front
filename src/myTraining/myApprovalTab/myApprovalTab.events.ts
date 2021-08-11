import { TabItemModel } from 'shared';
import routePaths from 'myTraining/routePaths';
import { getCurrentHistory } from 'shared/store/HistoryStore';

export const onChangeTab = (tab: TabItemModel): string => {
  const currentHistory = getCurrentHistory();
  currentHistory?.push(routePaths.approvalTab(tab.name));
  return routePaths.approvalTab(tab.name);
};
