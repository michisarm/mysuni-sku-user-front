import { useEffect } from "react";
import MyTrainingService from "../present/logic/MyTrainingService";

export function useRequestCompletedStorage() {

  useEffect(() => {
    requestCompletedStorage();
  }, []);

  const requestCompletedStorage = async () => {
    if (sessionStorage.getItem('completedTableViews') === null) {
      const completedTableViews = await MyTrainingService.instance.findAllCompletedTableViewsForStorage();
      if (
        completedTableViews &&
        completedTableViews.length > 0
      ) {
        sessionStorage.setItem('completedTableViews', JSON.stringify(completedTableViews));
      }
    }
  };
}
