import { useParams } from "react-router-dom";
import { CreateCubeDetailPageParams } from "../model/CreateCubeDetailPageParams";
import { useEffect } from "react";
import CreateCubeService from "../../personalcube/present/logic/CreateCubeService";

export function useRequestCreateCubeDetail() {
  const params = useParams<CreateCubeDetailPageParams>();

  useEffect(() => {
    if (params.personalCubeId === undefined) {
      return;
    }

    CreateCubeService.instance.findCreateCubeDetail(params.personalCubeId);

    return () => {
      CreateCubeService.instance.clearCreateCubeDetail();
      CreateCubeService.instance.clearCompanyCineroomId();
    };

  }, [params.personalCubeId]);
}