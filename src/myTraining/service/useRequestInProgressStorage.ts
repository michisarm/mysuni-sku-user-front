import { useEffect } from "react";
import MyTrainingService from "../present/logic/MyTrainingService";
import MyTrainingFilterRdoModel from "../model/MyTrainingFilterRdoModel";

export function useRequestInProgressStorage() {
  useEffect(() => {
    requestInProgressStorage();
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
}