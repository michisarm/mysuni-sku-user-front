import { useEffect } from "react";
import MyTrainingService from "../present/logic/MyTrainingService";

export function useRequestInProgressStorage() {

  useEffect(() => {
    requestInProgressStorage();
  }, []);

  const requestInProgressStorage = async () => {
    if (sessionStorage.getItem('inProgressTableViews') === null) {
      const inProgressTableViews = await MyTrainingService.instance.findAllInProgressTableViewsForStorage();
      if (
        inProgressTableViews &&
        inProgressTableViews.length > 0
      ) {
        sessionStorage.setItem('inProgressTableViews', JSON.stringify(inProgressTableViews));
      }
    }
  };
}