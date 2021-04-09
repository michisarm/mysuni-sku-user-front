import { useEffect } from "react";
import MyTrainingService from "../present/logic/MyTrainingService";
import MyTrainingFilterRdoModel from "../model/MyTrainingFilterRdoModel";

export function useRequestLearningStorage() {
  useEffect(() => {
    requestInProgressStorage();
    requestCompletedStorage();
  }, []);

  const requestInProgressStorage = async () => {
    if (sessionStorage.getItem('inProgressTableViews') === null) {
      const inProgressTableViews = await MyTrainingService.instance.findAllInProgressStorage();

      if (
        inProgressTableViews &&
        inProgressTableViews.length > 0
      ) {
        sessionStorage.setItem('inProgressTableViews', JSON.stringify(inProgressTableViews));
      }
    }
  };

  const requestCompletedStorage = async () => {
    if (sessionStorage.getItem('completedTableViews') === null) {
      const completedTableViews = await MyTrainingService.instance.findAllCompletedStorage();

      if (
        completedTableViews &&
        completedTableViews.length > 0
      ) {
        sessionStorage.setItem('completedTableViews', JSON.stringify(completedTableViews));
      }
    }
  };
}