import { useEffect } from "react";
import MyTrainingService from "../present/logic/MyTrainingService";

export function useRequestLearningStorage() {
  useEffect(() => {
    requestInProgressStorage();
    requestCompletedStorage();
  }, []);
}

const requestInProgressStorage = async () => {
  const inProgressTableViews = await MyTrainingService.instance.findAllInProgressStorage();

  if (
    inProgressTableViews &&
    inProgressTableViews.length > 0
  ) {
    sessionStorage.setItem('inProgressTableViews', JSON.stringify(inProgressTableViews));
  }
};

const requestCompletedStorage = async () => {
  const completedTableViews = await MyTrainingService.instance.findAllCompletedStorage();

  if (
    completedTableViews &&
    completedTableViews.length > 0
  ) {
    sessionStorage.setItem('completedTableViews', JSON.stringify(completedTableViews));
  }
};